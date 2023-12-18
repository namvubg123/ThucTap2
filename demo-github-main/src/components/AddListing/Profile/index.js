import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faKey } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, message } from "antd";

import {
  faUser,
  faPhoneFlip,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./profile.css";
import Cookies from "js-cookie";
import { Context } from "../../../context/Context";
import { updateUser } from "./../../../api/users";

// const custom1 = require("../../../asset/img/custom/custom1.jpg");

// const props = {
//   action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
//   listType: "picture",
//   beforeUpload(file) {
//     return new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         const img = document.createElement("img");
//         img.src = reader.result;
//         img.onload = () => {
//           const canvas = document.createElement("canvas");
//           canvas.width = img.naturalWidth;
//           canvas.height = img.naturalHeight;
//           const ctx = canvas.getContext("2d");
//           ctx.drawImage(img, 0, 0);
//           ctx.fillStyle = "red";
//           ctx.textBaseline = "middle";
//           ctx.font = "33px Arial";
//           ctx.fillText("Ant Design", 20, 20);
//           canvas.toBlob((result) => resolve(result));
//         };
//       };
//     });
//   },
// };
export default function Profile() {
  const { user, dispatch } = useContext(Context);
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleUpdate = async () => {
    message.success(
      "Thay đổi thông tin thành công, đăng nhập lại để thấy sự thay đổi"
    );
    const userInfo = {
      lastName,
      phone,
      email,
    };
    const response = await updateUser(user?._id, userInfo);
    console.log(response);
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
            <h3 className="font-semibold text-xl">THÔNG TIN CÁ NHÂN</h3>
            <div className="header-container-right">
              {/* <img src={custom1} className="w-10 h-10 rounded-full ml-2 "></img> */}
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
        <div className="form-profile">
          <Row gutter={16}>
            {/* <Col className=" gutter-row custom-form-avt" span={11}>
              <div className="widget-header-profile">
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="pt-1 text-blue-500 mr-1"
                />
                <h4 className="text-sm">Avatar</h4>
              </div>
              <div className="upload-avt">
                <div className="img-avt">
                  <Avatar
                    shape="square"
                    size={64}
                    src={<img src={custom1} alt="avatar" />}
                  />
                </div>
                <div className="btn-upload-avt">
                  <Upload {...props}>
                    <button className="btn-avt">
                      <CameraOutlined />
                      <span>Changes Avatar</span>
                    </button>
                  </Upload>
                </div>
              </div>
            </Col> */}
            <Col className="gutter-row" span={1}></Col>
            <Col className="gutter-row custom-form-profile text-xs" span={12}>
              <div className="widget-header-profile">
                <FontAwesomeIcon
                  icon={faKey}
                  className="pt-1 text-blue-500 mr-1"
                />
                <h4 className="text-sm">Thông tin</h4>
              </div>
              <div className="content-list-form">
                <div className="pb-10">
                  <h5 className="pb-2">Họ và tên</h5>
                  <ul className="input-item">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="p-3 text-blue-500"
                    />
                    <input
                      type="text "
                      className="input-style"
                      placeholder={user ? user.lastName : ""}
                      onClick={(e) => setLastName(e.target.value)}
                    ></input>
                  </ul>
                </div>
                <div className="pb-10">
                  <h5 className="pb-2">Email</h5>
                  <ul className="input-item">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="p-3 text-blue-500"
                    />
                    <input
                      type="text "
                      className="input-style"
                      placeholder={user ? user.email : ""}
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </ul>
                </div>
                <div className="pb-10">
                  <h5 className="pb-2">Số điện thoại</h5>
                  <ul className="input-item">
                    <FontAwesomeIcon
                      icon={faPhoneFlip}
                      className="p-3 text-blue-500"
                    />
                    <input
                      type="text "
                      className="input-style"
                      placeholder={user ? user.phone : ""}
                      onChange={(e) => setPhone(e.target.value)}
                    ></input>
                  </ul>
                </div>
              </div>
              <button className="btn-changes" onClick={handleUpdate}>
                <Link to="#" className="mt-0 flex items-center">
                  <span className=" text-sm font-semibold">Cập nhật</span>
                </Link>
              </button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
