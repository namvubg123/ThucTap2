import React from "react";
import { Input, Checkbox } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Register.css";
import { useState } from "react";
import { registerUser } from "../../api/auth";
import { notification } from "antd";

function Register() {
  const [username, setUsername] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const valueRegister = {
    username,
    password,
    lastName,
  };
  const handleRegister = (values) => {
    console.log(values);
    registerUser(values).then(
      (res) => {
        console.log(res);
        notification.success({ message: " Đăng kí thành công " });
      },
      (err) => {
        console.log(err);
        if (err) {
          notification.error({ message: " Đăng kí thất bại" });
        }
      }
    );
  };

  return (
    <div className="login-box">
      <form onSubmit={handleRegister}>
        <div className="user-box">
          <label className="title">
            Tên của bạn
            <span style={{ color: "red" }}> *</span>
          </label>
          <Input
            className="input"
            placeholder="Tên của bạn"
            prefix={<FontAwesomeIcon icon={faUser} />}
            onChange={(e) => setLastname(e.target.value)}
            value={lastName}
          />
        </div>
        <div className="user-box">
          <label className="title">
            Tài khoản
            <span style={{ color: "red" }}> *</span>
          </label>
          <Input
            className="input"
            placeholder="Tài khoản "
            prefix={<FontAwesomeIcon icon={faEnvelope} />}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="user-box">
          <label className="title">
            Mật khẩu
            <span style={{ color: "red" }}> *</span>
          </label>
          <Input.Password
            className="input"
            placeholder="Mật khẩu"
            prefix={<FontAwesomeIcon icon={faLock} />}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="remember-forgot">
          {/* <Checkbox>
            I agree to the Privacy Policy and Terms and Conditions
          </Checkbox> */}
        </div>
        <button
          className="btn-login"
          type="submit"
          onClick={() => handleRegister(valueRegister)}
        >
          Register
        </button>
        {error && (
          <span style={{ color: "red", marginTop: "10px" }}>
            Something went wrong!
          </span>
        )}
      </form>
    </div>
  );
}

export default Register;
