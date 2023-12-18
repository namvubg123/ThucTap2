import React, { useEffect, useState } from "react";
import "./apartment.css";
import Banner from "../../components/banner";
import { useLocation } from "react-router-dom";
import ItemProduct from "../Item-product";
import { Col, Row } from "antd";
import { getProducts } from "./../../api/product";

export default function Apartment() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [type, setType] = useState("CanHo");

  useEffect(() => {
    const params = new URLSearchParams(search);
    const newType = params.get("type");
    setType(newType);

    if (newType) {
      getProducts()
        .then((response) => {
          const currentDate = new Date();
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(currentDate.getDate() - 30);

          const filteredPosts = response.data.filter((post) => {
            const postCreatedAt = new Date(post.createdAt);
            return (
              postCreatedAt >= thirtyDaysAgo &&
              postCreatedAt <= currentDate &&
              post.type === newType &&
              post.status === "accepted"
            );
          });

          setPosts(filteredPosts);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [search]);

  return (
    <div>
      <Banner />
      <div className="product">
        <div className="product-content-apartment">
          <Row gutter={16}>
            {posts.map((p) => (
              <Col span={8} key={p.id} style={{ marginBottom: 16 }}>
                <ItemProduct post={p} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
