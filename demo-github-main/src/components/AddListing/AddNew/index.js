import React, { useCallback, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Upload, Input, message, Modal } from "antd";
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

import { storage, db } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Pay from "../../../Pages/Pay";
import { getProvinces, getDistricts, getWards } from "vietnam-provinces";

const CheckboxGroup = Checkbox.Group;
const plainOptions = ["Wifi", "Nóng lạnh", "Điều hòa"];
const custom1 = require("../../../asset/img/custom/custom1.jpg");
const { Dragger } = Upload;
const { Option } = Select;

function AddNew() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [checkedList, setCheckedList] = useState();
  const checkAll = plainOptions?.length === checkedList?.length;
  const indeterminate =
    checkedList?.length > 0 && checkedList?.length < plainOptions?.length;

  const onChange = (list) => {
    setCheckedList(list);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  const [location, setLocation] = useState({
    center: {
      lat: 25,
      lng: 105,
    },
    zoom: 18,
    address: ".",
  });

  const { user, dispatch } = useContext(Context);

  const [title, setTitle] = useState();
  const [gara, setGara] = useState();
  const [bedrooms, setBedrooms] = useState();
  const [bathrooms, setBathrooms] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [locationX, setLocationX] = useState();
  const [locationY, setLocationY] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [area, setArea] = useState();
  const [images, setImages] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [cityDistricts, setCityDistricts] = useState({});
  const [wardDistricts, setWardDistricts] = useState({});
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [type, setType] = useState("Phòng trọ");

  const handleTypeChange = (value) => {
    setType(value);
  };
  const handleCityChange = (value) => {
    setCity(value);

    const filteredDistricts = cityDistricts[value] || [];
    const filteredWards = wardDistricts[value] || [];

    if (!filteredDistricts.some((district) => district.code === district)) {
      setDistrict("");
    }
    if (!filteredWards.some((ward) => ward.code === ward)) {
      setWard("");
    }

    setDistricts(filteredDistricts);
    setWards(filteredWards);
  };
  const handleDistrictChange = (value) => {
    setDistrict(value);

    const filteredWards = wardDistricts[city] || [];

    if (!filteredWards.some((ward) => ward.name === ward)) {
      setWard("");
    }

    setWards(filteredWards);
  };

  const handleWardChange = (value) => {
    setWard(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadPromises = images.map((image) => {
        return new Promise((resolve, reject) => {
          const storageRef = ref(storage, image.name);
          const uploadTask = uploadBytesResumable(storageRef, image);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload progress: ${progress}%`);
            },
            (error) => {
              console.error("Upload error:", error);
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  resolve(downloadURL);
                })
                .catch((error) => {
                  console.error("Error getting download URL:", error);
                  reject(error);
                });
            }
          );
        });
      });

      const downloadURLs = await Promise.all(uploadPromises);
      const newPost = {
        owner: user.lastName,
        title,
        gara,
        bedrooms,
        bathrooms,
        phone,
        address,
        locationX,
        locationY,
        description,
        price,
        area,
        type,
        city,
        district,
        ward,
        images: downloadURLs,
        feature: checkedList,
      };
      const res = await axios.post("/post/create", newPost);
      // console.log(res);
    } catch (err) {}
  };

  const handleChangeLocation = useCallback(() => {
    setLocation({
      center: {
        lat: parseFloat(locationX) || 21.008306692839064,
        lng: parseFloat(locationY) || 105.9383073064679,
      },
      zoom: 14,
      address: address || ".",
    });
  }, [address, locationX, locationY]);

  useEffect(() => {
    handleChangeLocation();
    const fetchProvinces = () => {
      const provinces = getProvinces();
      setProvinces(provinces);
    };

    const fetchDistricts = () => {
      const provinces = getProvinces();
      setProvinces(provinces);

      const districtsByCity = {};
      provinces.forEach((province) => {
        const districts = getDistricts(province.code);
        districtsByCity[province.name] = districts;
      });

      setCityDistricts(districtsByCity);
    };

    const fetchWards = () => {
      const provinces = getProvinces();
      setProvinces(provinces);

      const districtsByCity = {};
      const wardsByDistricts = {};

      provinces.forEach((province) => {
        const districts = getDistricts(province.code);
        districtsByCity[province.name] = districts;

        districts.forEach((district) => {
          const wards = getWards(district.code);
          wardsByDistricts[district.name] = wards;
        });
      });

      setCityDistricts(districtsByCity);
      setWardDistricts(wardsByDistricts);

      const filteredWards = wardsByDistricts[district] || [];
      setWards(filteredWards);
    };

    fetchProvinces();
    fetchDistricts();
    fetchWards();
  }, [handleChangeLocation, district]);

  const props = {
    name: "file",
    multiple: true,
    action: "",
    customRequest: ({ file, onSuccess, onError }) => {
      setImages((prevImages) => [...prevImages, file]);
      onSuccess();
    },
  };

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
                  <h5 className="pb-2 ">Thành phố </h5>
                  <ul className="input-item ">
                    <FontAwesomeIcon
                      icon={faLocationPin}
                      className="p-4 text-blue-500"
                    />
                    <Select
                      className=""
                      value={city}
                      onChange={handleCityChange}
                      bordered={false}
                    >
                      <Option value="">Chọn thành phố</Option>
                      {provinces.map((province) => (
                        <Option key={province.code} value={province.name}>
                          {province.name}
                        </Option>
                      ))}
                    </Select>
                  </ul>
                </div>
              </Col>
              <Col className="gutter-row text-xs" span={8}>
                <div>
                  <h5 className="pb-2 ">Huyện/QUận </h5>
                  <ul className="input-item ">
                    <FontAwesomeIcon
                      icon={faLocationPin}
                      className="p-4 text-blue-500"
                    />
                    <Select
                      className=""
                      value={district}
                      onChange={handleDistrictChange}
                      bordered={false}
                    >
                      <Option value="">Chọn huyện/quận</Option>
                      {districts.map((district) => (
                        <Option key={district.code} value={district.name}>
                          {district.name}
                        </Option>
                      ))}
                    </Select>
                  </ul>
                </div>
              </Col>
              <Col className="gutter-row text-xs" span={8}>
                <div>
                  <h5 className="pb-2 ">Phường/Xã</h5>
                  <ul className="input-item ">
                    <FontAwesomeIcon
                      icon={faLocationPin}
                      className="p-4 text-blue-500"
                    />
                    <Select
                      className=""
                      value={ward}
                      onChange={handleWardChange}
                      bordered={false}
                    >
                      <Option value="">Chọn phường/xã</Option>
                      {wards.map((ward) => (
                        <Option key={ward.code} value={ward.name}>
                          {ward.name}
                        </Option>
                      ))}
                    </Select>
                  </ul>
                </div>
              </Col>
              <Col className="gutter-row text-xs" span={8}>
                <div>
                  <h5 className="pb-2 ">Địa chỉ cụ thể </h5>
                  <ul className="input-item ">
                    <FontAwesomeIcon
                      icon={faLocationPin}
                      className="p-4 text-blue-500"
                    />

                    <Input
                      name="address"
                      type="text"
                      className="input-style"
                      placeholder="Địa chỉ cụ thể"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    ></Input>
                  </ul>
                </div>
              </Col>
              <Col className=" gutter-row text-xs" span={8}>
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
                      name="locationX"
                      value={locationX}
                      onChange={(e) => setLocationX(e.target.value)}
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
                      name="locationY"
                      value={locationY}
                      onChange={(e) => setLocationY(e.target.value)}
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
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
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
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
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
                            name="area"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                          ></Input>
                        </ul>
                      </div>

                      <div className=" ">
                        <h5 className="pb-2">Phân loại</h5>
                        <Select
                          defaultValue="Phòng trọ"
                          style={{
                            width: 213,
                          }}
                          options={[
                            {
                              value: "CanHo",
                              label: "Căn hộ",
                            },
                            {
                              value: "NhaTro",
                              label: "Phòng trọ",
                            },
                            {
                              value: "NhaNguyenCan",
                              label: "Nhà nguyên căn",
                            },
                            {
                              value: "OGhep",
                              label: "Ở ghép",
                            },
                          ]}
                          name="type"
                          value={type}
                          onChange={handleTypeChange}
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
                            name="bedrooms"
                            value={bedrooms}
                            onChange={(e) => setBedrooms(e.target.value)}
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
                            name="bathrooms"
                            value={bathrooms}
                            onChange={(e) => setBathrooms(e.target.value)}
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
                            name="gara"
                            value={gara}
                            onChange={(e) => setGara(e.target.value)}
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
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></Input>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <button className="btn-save" onClick={handleSubmit}>
          <Link onClick={showModal} to="#" className="mt-0 flex items-center">
            <span className=" text-sm font-semibold">Đăng bài</span>
          </Link>
        </button>
        <Modal
          title=""
          open={isModalOpen}
          footer={null}
          onCancel={handleCancel}
          width={700}
        >
          <Pay />
        </Modal>
      </div>
    </div>
  );
}

export default AddNew;
