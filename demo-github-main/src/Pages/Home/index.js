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
      setPosts(res.data);
      //   console.log(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <div>
      <div className="content-home">
        <div className="overlay1"></div>
        <div className="content-banner">
          <p className="text-home">Real Estate Searching Platform</p>
          <h2>Tìm kiếm một ngôi nhà bạn mơ ước</h2>

          <div className="flex mt-6">
            <form>
              <input
                className="p-5 px-8 text-xs rounded-l-md border border-r-0"
                placeholder="chosse"
              />
              <input
                className="p-5 px-8 text-xs border border-r-0"
                placeholder="chosse"
              />
              <input className="p-5 px-8 text-xs border" placeholder="chosse" />
            </form>
            <button className="btn-search-home">
              search
              <SearchOutlined className="btn-search-i" />
            </button>
          </div>
          <p className="text-home">Need more search options</p>
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
