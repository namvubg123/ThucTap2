import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";
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

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/post/getPost" + search);
      const sortedPosts = res.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      const currentDate = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(currentDate.getDate() - 30);

      const filteredPosts = sortedPosts.filter((post) => {
        const postCreatedAt = new Date(post.createdAt);
        return (
          postCreatedAt >= thirtyDaysAgo &&
          postCreatedAt <= currentDate &&
          post.owner === user.lastName
        );
      });

      setPosts(filteredPosts);
    };
    fetchPosts();
  }, [search, user.lastName]);

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
                <input
                  tyle="text"
                  onclick="this.select()"
                  placeholder="Search"
                ></input>
                <button tyle="submit">
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
