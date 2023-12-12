import React, { useCallback, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Upload, Input } from "antd";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import {
  faStreetView,
  faCloudArrowUp,
  faList,
  faRightLong,
  faDownLong,
  faLocationPin,
  faMoneyBillWave,
  faPhoneFlip,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./addNew.css";
import {
  faBed,
  faBath,
  faWarehouse,
  faPeopleRoof,
  faMaximize,
} from "@fortawesome/free-solid-svg-icons";
import MapLocation from "../../Map";
import { Select, Checkbox, Divider } from "antd";
import Cookies from "js-cookie";
import { Context } from "../../../context/Context";
import axios from "axios";
import { storage } from "../../../firebase";

const CheckboxGroup = Checkbox.Group;
const plainOptions = ["Wifi", "Nóng lạnh", "Điều hòa"];
const custom1 = require("../../../asset/img/custom/custom1.jpg");
const { Dragger } = Upload;

function AddNew() {
  const [checkedList, setCheckedList] = useState();
  const [location, setLocation] = useState({
    center: {
      lat: 25,
      lng: 105,
    },
    zoom: 18,
    address: ".",
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    locationX: "",
    locationY: "",
    address: "",
    gara: "",
    type: "",
    area: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    feature: "",
    phone: "",
  });

  const handleChangeLocation = useCallback(() => {
    setLocation({
      center: {
        lat: parseFloat(formData.locationX) || 0,
        lng: parseFloat(formData.locationY) || 0,
      },
      zoom: 14,
      address: formData.address || ".",
    });
  }, [formData.address, formData.locationX, formData.locationY]);

  const checkAll = plainOptions?.length === checkedList?.length;
  const indeterminate =
    checkedList?.length > 0 && checkedList?.length < plainOptions?.length;

  const onChange = (list) => {
    setCheckedList(list);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  const { user, dispatch } = useContext(Context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const props = {
    name: "file",
    multiple: true,
    onChange(info) {
      const { status } = info.file;

      if (status === "done") {
        const file = info.file.originFileObj;

        // Upload the file to Firebase Storage
        const storageRef = storage.ref();
        const fileRef = storageRef.child(`images/${file.name}`);

        fileRef.put(file).then((snapshot) => {
          console.log("File uploaded successfully:", snapshot);

          // Get the download URL for the file
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File download URL:", downloadURL);

            // Now you can save the downloadURL in your state or use it as needed
          });
        });
      } else if (status === "error") {
        console.error("Error uploading file:", info.file.error);
      }
    },
    onDrop(e) {},
    // ... (other props)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      owner: user.lastName,
      ...formData,
      feature: checkedList,
    };
    handleChangeLocation();
    try {
      // console.log(newPost);
      const res = await axios.post("/post/create", newPost);

      // console.log(res);
      window.location.replace("/post/get/" + res._id);
    } catch (err) {}
  };

  useEffect(() => {
    handleChangeLocation();
  }, [handleChangeLocation]);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div>
      <div className="dashboard-container">
        <div className="dashboard-title">
          <div className="header-container">
            <h3 className="font-semibold text-xl">ĐĂNG BÀI</h3>
            <div className="header-container-right">
              <img src={custom1} className="w-10 h-10 rounded-full ml-2 "></img>
              <strong className="ml-2 mr-2">
                Xin Chào, <span className="text-blue-500">{user.lastName}</span>
              </strong>
              <Link to="/" className="border-l">
                <FontAwesomeIcon
                  icon={faPowerOff}
                  className="p-5 text-blue-400 "
                  onClick={handleLogout}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="container-widget">
          <div className="widget-header">
            <FontAwesomeIcon
              icon={faStreetView}
              className="pt-1 text-blue-500 mr-1"
            />
            <h4 className="text-sm">Thông tin vị trí</h4>
          </div>
          <div className="custom-form">
            <Row gutter={16}>
              <Col className="gutter-row text-xs" span={8}>
                <div>
                  <h5 className="pb-2 ">Địa chỉ</h5>
                  <ul className="input-item ">
                    <FontAwesomeIcon
                      icon={faLocationPin}
                      className="p-4 text-blue-500"
                    />
                    <Input
                      value={formData.address}
                      name="address"
                      onChange={handleChange}
                      type="text"
                      className="input-style"
                      placeholder="Địa Chỉ của bạn"
                    ></Input>
                  </ul>
                </div>
              </Col>
              <Col className="gutter-row text-xs" span={8}>
                <div>
                  <h5 className="pb-2 ">Kinh độ</h5>
                  <ul className="input-item">
                    <FontAwesomeIcon
                      icon={faRightLong}
                      className="p-4 text-blue-500"
                    />
                    <Input
                      type="text"
                      className="input-style"
                      placeholder="Kinh độ trên Map"
                      value={formData.locationX}
                      name="locationX"
                      onChange={handleChange}
                    ></Input>
                  </ul>
                </div>
              </Col>
              <Col className="gutter-row text-xs" span={8}>
                <div>
                  <h5 className="pb-2">Vĩ độ</h5>
                  <ul className="input-item">
                    <FontAwesomeIcon
                      icon={faDownLong}
                      className="p-4 text-blue-500"
                    />
                    <Input
                      type="text"
                      // onChange={(e) => conChangeViDo(e)}
                      className="input-style"
                      placeholder="Vĩ độ trên Map "
                      value={formData.locationY}
                      name="locationY"
                      onChange={handleChange}
                    ></Input>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>

          {<MapLocation location={location} zoomLevel={18} />}
          <div className="custom-form">
            <Row gutter={16} className="mt-8">
              <Col className="gutter-row text-xs" span={8}>
                <div>
                  <h5 className="pb-2">Giá tiền</h5>
                  <ul className="input-item">
                    <FontAwesomeIcon
                      icon={faMoneyBillWave}
                      className="p-4 text-blue-500"
                    />
                    <Input
                      type="text"
                      className="input-style"
                      placeholder="Giá cho thuê"
                      value={formData.price}
                      name="price"
                      onChange={handleChange}
                    ></Input>
                  </ul>
                </div>
              </Col>
              <Col className="gutter-row text-xs" span={8}>
                <div>
                  <h5 className="pb-2">Số điện Thoại</h5>
                  <ul className="input-item">
                    <FontAwesomeIcon
                      icon={faPhoneFlip}
                      className="p-4 text-blue-500"
                    />
                    <Input
                      type="text"
                      className="input-style"
                      placeholder="Số điện thoại của bạn"
                      value={formData.phone}
                      name="phone"
                      onChange={handleChange}
                    ></Input>
                  </ul>
                </div>
              </Col>
              <Col className="gutter-row text-xs" span={8}>
                <div>
                  <h5 className="pb-2">Email</h5>
                  <ul className="input-item">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="p-4 text-blue-500"
                    />
                    <Input
                      type="text"
                      className="input-style"
                      placeholder="Email của bạn"
                    ></Input>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="container-widget">
          <div className="widget-header">
            <FontAwesomeIcon
              icon={faList}
              className="pt-1 text-blue-500 mr-1"
            />
            <h4 className="text-sm">Chi tiết căn phòng</h4>
          </div>
          <div className="custom-form">
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                <div>
                  <div className="pb-5">
                    <h5 className="pb-2">Tiêu đề</h5>
                    <ul className="input-item">
                      <Input
                        type="text "
                        className="input-style"
                        placeholder="Nhập từ khóa"
                        value={formData.title}
                        name="title"
                        onChange={handleChange}
                      ></Input>
                    </ul>
                  </div>
                </div>
                <Row gutter={16}>
                  <Col className="gutter-row text-xs" span={11}>
                    <div>
                      <div className="pb-10">
                        <h5 className="pb-2">Số người ở</h5>
                        <ul className="input-item">
                          <FontAwesomeIcon
                            icon={faPeopleRoof}
                            className="p-3 text-blue-500"
                          />
                          <Input
                            type="text "
                            className="input-style"
                            placeholder="Số người ở "
                          ></Input>
                        </ul>
                      </div>

                      <div className="pb-10">
                        <h5 className="pb-2">Diện tích</h5>
                        <ul className="input-item">
                          <FontAwesomeIcon
                            icon={faMaximize}
                            className="p-3 text-blue-500"
                          />
                          <Input
                            type="text "
                            className="input-style"
                            placeholder="Diện tích"
                            value={formData.area}
                            onChange={handleChange}
                            name="area"
                          ></Input>
                        </ul>
                      </div>

                      <div className=" ">
                        <h5 className="pb-2">Phân loại</h5>
                        <Select
                          defaultValue="Chung cư"
                          style={{
                            width: 213,
                          }}
                          options={[
                            {
                              value: "Chung cư",
                              label: "Chung cư",
                            },
                            {
                              value: "Phòng trọ",
                              label: "Phòng trọ",
                            },
                            {
                              value: "Nhà nguyên căn",
                              label: "Nhà nguyên căn",
                            },
                            {
                              value: "Ở ghép",
                              label: "Ở ghép",
                            },
                          ]}
                          name="type"
                          value={formData.type}
                          onChange={(value) =>
                            handleChange({ target: { name: "type", value } })
                          }
                        />
                      </div>
                    </div>
                  </Col>
                  <Col className="gutter-row" span={2}></Col>
                  <Col className="gutter-row text-xs" span={11}>
                    <div>
                      <div className="pb-10">
                        <h5 className="pb-2">Phòng ngủ</h5>
                        <ul className="input-item">
                          <FontAwesomeIcon
                            icon={faBed}
                            className="p-3 text-blue-500"
                          />
                          <Input
                            type="text "
                            className="input-style"
                            placeholder="Số phòng ngủ"
                            value={formData.bedrooms}
                            name="bedrooms"
                            onChange={handleChange}
                          ></Input>
                        </ul>
                      </div>

                      <div className="pb-10">
                        <h5 className="pb-2">Phòng tắm</h5>
                        <ul className="input-item">
                          <FontAwesomeIcon
                            icon={faBath}
                            className="p-3 text-blue-500"
                          />
                          <Input
                            type="text "
                            className="input-style"
                            placeholder="   Số phòng tắm"
                            value={formData.bathrooms}
                            onChange={handleChange}
                            name="bathrooms"
                          ></Input>
                        </ul>
                      </div>

                      <div className="pb-10">
                        <h5 className="pb-2">Chỗ để xe</h5>
                        <ul className="input-item">
                          <FontAwesomeIcon
                            icon={faWarehouse}
                            className="p-3 text-blue-500"
                          />
                          <Input
                            type="text "
                            className="input-style"
                            placeholder="Chỗ để xe"
                            value={formData.gara}
                            name="gara"
                            onChange={handleChange}
                          ></Input>
                        </ul>
                      </div>
                    </div>
                  </Col>
                  <Col className="gutter-row" span={24}>
                    <Checkbox
                      indeterminate={indeterminate}
                      onChange={onCheckAllChange}
                      checked={checkAll}
                    >
                      Check all
                    </Checkbox>
                    <Divider />
                    <CheckboxGroup
                      options={plainOptions}
                      value={checkedList}
                      onChange={onChange}
                    />
                  </Col>
                </Row>
              </Col>
              <Col className="gutter-row mt-7" span={12}>
                <div>
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <FontAwesomeIcon
                        icon={faCloudArrowUp}
                        className="text-blue-500 text-4xl"
                      />
                    </p>
                    <p className="ant-upload-text">
                      Click here or drop files to upload
                    </p>
                  </Dragger>
                </div>
                <div>
                  <div className="pb-2 pt-6">
                    <h5 className="pb-2">Chi tết căn phòng</h5>
                    <ul className="input-item">
                      <Input
                        type="text "
                        className="input-text"
                        placeholder="Mô tả của bạn"
                        value={formData.description}
                        onChange={handleChange}
                        name="description"
                      ></Input>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <button className="btn-save" onClick={handleSubmit}>
          <Link to="/" className="mt-0 flex items-center">
            <span className=" text-sm font-semibold">Đăng bài</span>
          </Link>
        </button>
      </div>
    </div>
  );
}

export default AddNew;
