import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Select } from "antd";
import {
  faPowerOff,
  faMagnifyingGlass,
  faCircle,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useLocation } from "react-router-dom";
import "./listwrite.css";
import Cookies from "js-cookie";
import { Context } from "../../../context/Context";
import ItemProduct from "../../../Pages/Item-product";
import axios from "axios";

export default function ListWrite() {
  const { user, dispatch } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [filterStatus, setFilterStatus] = useState("");
  const { Option } = Select;

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/post/getPost" + search);
      const sortedPosts = res.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      const filteredPosts = sortedPosts.filter((post) => {
        return (
          post.owner === user.lastName &&
          (filterStatus === "" || post.status === filterStatus)
        );
      });

      setPosts(filteredPosts);
    };
    fetchPosts();
  }, [search, user.lastName, filterStatus]);

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
            <h3 className="font-semibold text-xl">DANH SÁCH BÀI VIẾT</h3>
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
          <div className="dashboard-opt">
            <div className="dashboard-list-container">
              <div className="header-list">
                <Select
                  value={filterStatus}
                  onChange={(value) => setFilterStatus(value)}
                  placeholder="Lọc theo trạng thái"
                  style={{ width: 150 }}
                >
                  <Option value="">Tất cả</Option>
                  <Option value="pending">Chờ duyệt</Option>
                  <Option value="accepted">Đã duyệt</Option>
                  <Option value="rejected">Từ chối</Option>
                  <Option value="expired">Hết hạn</Option>
                </Select>
                <button type="submit">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="text-blue-500 ml-5"
                  />
                </button>
              </div>
            </div>
            <div>
              <div className="list-items pt-10">
                <div>
                  <div className="product">
                    <div className="product-content-apartment">
                      <Row gutter={16}>
                        {posts.map((p) => (
                          <Col
                            span={10}
                            key={p.id}
                            style={{ marginBottom: 16 }}
                          >
                            <ItemProduct post={p} />
                            <div className="status-icon">
                              {p.status === "pending" && (
                                <span className="status-pending">
                                  <FontAwesomeIcon
                                    icon={faCircle}
                                    className="pending-icon"
                                  />
                                  Chờ duyệt
                                </span>
                              )}
                              {p.status === "accepted" && (
                                <span className="status-accepted">
                                  <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className="accepted-icon"
                                  />
                                  Đã duyệt
                                </span>
                              )}
                              {p.status === "rejected" && (
                                <span className="status-rejected">
                                  <FontAwesomeIcon
                                    icon={faTimesCircle}
                                    className="rejected-icon"
                                  />
                                  Từ chối
                                </span>
                              )}
                              {p.status === "expired" && (
                                <span className="status-expired">
                                  <FontAwesomeIcon
                                    icon={faCircle}
                                    className="expired-icon"
                                  />
                                  Hết hạn
                                </span>
                              )}
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
