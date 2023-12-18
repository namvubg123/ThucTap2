import React, { useState, useEffect } from "react";
import "./Slider.css";
import { Col, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ShareAltOutlined } from "@ant-design/icons";
import Product from "../Product";
import axios from "axios";
import { useLocation } from "react-router";

export default function Home() {
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
          post.status === "accepted"
        );
      });

      setPosts(filteredPosts);
    };
    fetchPosts();
  }, [search]);

  return (
    <div>
      <div className="content-home">
        <div className="overlay1"></div>
        <div className="content-banner">
          <p className="text-home"></p>
          <h2>Tìm kiếm một ngôi nhà bạn mơ ước</h2>

          <div className="flex mt-6">
            <form>
              <input
                className="p-5 px-8 text-xs rounded-l-md border border-r-0"
                placeholder="Phân loại"
              />
              <input
                className="p-5 px-8 text-xs border border-r-0"
                placeholder="Giá tiền"
              />
              <input
                className="p-5 px-8 text-xs border"
                placeholder="Khu vực"
              />
            </form>
            <button className="btn-search-home">
              Search
              <SearchOutlined className="btn-search-i" />
            </button>
          </div>
          <p className="text-home"></p>
        </div>
      </div>
      <div className="fw-bread">
        <Row className="ml-32 py-5 items-center font-medium text-xs conten-fw">
          <Col span={8}>
            <div className="container-slider">
              <a href="#" className="mr-4">
                Home
              </a>
              <span className="text-blue-500 title-router">Home Image</span>
            </div>
          </Col>
          <Col span={8} offset={8} className="flex justify-end">
            <button className="share-btn">
              <ShareAltOutlined className="mr-3 mt-1 text-blue-500" />
              Share
            </button>
          </Col>
        </Row>
      </div>
      <Product posts={posts} />
    </div>
  );
}
