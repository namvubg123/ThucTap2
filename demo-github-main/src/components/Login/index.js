import React, { useState, useContext } from "react";
import { Input, Checkbox, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import { loginUser } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Context } from "./../../context/Context";

export default function Login() {
  const navigate = useNavigate();
  const { dispatch, isFetching } = useContext(Context);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const valueLogin = {
    username,
    password,
  };
  const onFinish = (e) => {
    dispatch({ type: "LOGIN_START" });
    try {
      loginUser(e).then((res) => {
        if (res.status === 400) {
          notification.error({ message: "Đăng nhập thất bại" });
        } else if (res.status === 200) {
          Cookies.set("token", res.data.token);
          if (res.data.isAdmin === true) {
            notification.success({ message: "Đăng nhập thành công" });
            navigate("/admin");
          } else {
            notification.success({ message: "Đăng nhập thành công" });
          }
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        } else if (res.status === 404) {
          notification.error({ message: "Tài khoản không tồn tại" });
        } else if (res.status === 401) {
          notification.error({ message: "Sai mật khẩu" });
        }
      });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login-box">
      <form onSubmit={onFinish}>
        <div className="user-box">
          <label className="title">
            Tài khoản
            <span style={{ color: "red" }}> *</span>
          </label>
          <Input
            className="input"
            placeholder="Tài khoản"
            prefix={<FontAwesomeIcon icon={faUser} />}
            value={username}
            onChange={(e) => setUserName(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* <div className="remember-forgot">
          <Checkbox>Remember me</Checkbox>
          <span>
            <span>Lost Your Password?</span>
          </span>
        </div> */}
        <button
          className="btn-login"
          type="submit"
          onClick={() => onFinish(valueLogin)}
          disabled={isFetching}
        >
          Login
        </button>
      </form>
    </div>
  );
}
