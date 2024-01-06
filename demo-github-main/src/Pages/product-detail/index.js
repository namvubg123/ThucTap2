import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faLocationDot,
  faUsers,
  faBed,
  faBath,
  faHome,
  faUserCheck,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { Rate } from "antd";
import {
  PhoneTwoTone,
  MailTwoTone,
  CreditCardTwoTone,
} from "@ant-design/icons";
import MapLocation from "../../components/Map";
import { Col, Row, Card } from "antd";
import Banner from "../../components/banner";
import "./ProductDetail.css";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { Context } from "../../context/Context";
const avatar = require("../../asset/img/Profile/Avatar.jpg");

export default function ProductDetail() {
  const { user } = useContext(Context);
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [location, setLocation] = useState({});

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get("/post/get/" + id);
        setPost(res.data);
        // console.log(res.data);
        setLocation({
          center: {
            lat: Number.parseFloat(res.data?.locationX),
            lng: Number.parseFloat(res.data?.locationY),
          },
          zoom: 18,
          address: res.data?.address,
        });
      } catch (error) {
        throw new Error(error);
      }
    };
    getPost();
  }, [id]);

  return (
    <div>
      <Banner />
      <div className="detail-container">
        <div className="content-detail">
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            <Col className="gutter-row" span={16}>
              <Card className="card content-left">
                <div className="img-list">
                  <Row gutter={16}>
                    <Col className="gutter-row" span={8}>
                      {post?.images && post.images.length > 0 ? (
                        <img
                          className="img-item-top"
                          src={post.images[3]}
                          alt=""
                        />
                      ) : (
                        <div>No image available</div>
                      )}
                    </Col>
                    <Col className="gutter-row" span={8}>
                      {post?.images && post.images.length > 0 ? (
                        <img
                          className="img-item-top"
                          src={post.images[2]}
                          alt=""
                        />
                      ) : (
                        <div>No image available</div>
                      )}
                    </Col>
                    <Col className="gutter-row" span={8}>
                      {post?.images && post.images.length > 0 ? (
                        <img
                          className="img-item-top"
                          src={post.images[1]}
                          alt=""
                        />
                      ) : (
                        <div>No image available</div>
                      )}
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col className="gutter-row" span={16}>
                      {post?.images && post.images.length > 0 ? (
                        <img
                          className="img-item-top"
                          src={post.images[0]}
                          alt=""
                        />
                      ) : (
                        <div>No image available</div>
                      )}
                    </Col>
                    <Col className="gutter-row" span={8}>
                      {post?.images && post.images.length > 0 ? (
                        <img
                          className="img-item-top"
                          src={post.images[4]}
                          alt=""
                        />
                      ) : (
                        <div>No image available</div>
                      )}
                      {post?.images && post.images.length > 0 ? (
                        <img
                          className="img-item-top"
                          src={post.images[5]}
                          alt=""
                        />
                      ) : (
                        <div>No image available</div>
                      )}
                    </Col>
                  </Row>
                </div>

                <div className="properties">
                  <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                      <div className="item-properties">
                        <FontAwesomeIcon className="icon-pro" icon={faHome} />
                        <h4 className="title-item-pro">Loại</h4>
                        <span className="des-item-pro">
                          {post.type === "NhaTro" && "Nhà Trọ"}
                          {post.type === "NhaNguyenCan" && "Nhà nguyên căn"}
                          {post.type === "CanHo" && "Căn Hộ"}
                          {post.type === "OGhep" && "Ở Ghép"}
                        </span>
                      </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <div className="item-properties">
                        <FontAwesomeIcon className="icon-pro" icon={faBed} />
                        <h4 className="title-item-pro">Phòng ngủ</h4>
                        <span className="des-item-pro">{post.bedrooms}</span>
                      </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <div className="item-properties">
                        <FontAwesomeIcon className="icon-pro" icon={faBath} />
                        <h4 className="title-item-pro">Phòng tắm</h4>
                        <span className="des-item-pro">{post.bathrooms}</span>
                      </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <div className="item-properties">
                        <FontAwesomeIcon className="icon-pro" icon={faUsers} />
                        <h4 className="title-item-pro">Chỗ để xe</h4>
                        <span className="des-item-pro">{post.gara}</span>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="about">
                  <h2 className="about-title">Mô tả</h2>
                  <span className="about-des">{post.description}</span>
                </div>
                <div className="detail">
                  <h3 className="detail-title">Chi tiết</h3>
                  <Row gutter={16}>
                    <Col className="gutter-row" span={8}>
                      <div className="detail-item">
                        <span className="detail-item-type">
                          Ngày đăng:
                          <strong>
                            {dayjs(post.createdAt).format("DD/MM/YYYY")}
                          </strong>
                        </span>
                        <span className="detail-item-type">
                          Liên hệ:
                          <strong>0{post.phone}</strong>
                        </span>
                        <span className="detail-item-type">
                          Tình trạng:
                          <strong>Còn phòng</strong>
                        </span>
                      </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                      <div className="detail-item">
                        <span className="detail-item-type">
                          Diện tích:
                          <strong>{post.area}m2</strong>
                        </span>
                        <span className="detail-item-type">
                          Phòng ngủ:
                          <strong>{post.bedrooms}</strong>
                        </span>
                        <span className="detail-item-type">
                          Giá:
                          <strong>
                            {post.price?.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </strong>
                        </span>
                      </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                      <div className="detail-item">
                        <span className="detail-item-type">
                          Phòng tắm:
                          <strong>{post.bathrooms}</strong>
                        </span>
                        <span className="detail-item-type">
                          Để xe:
                          <strong>{post.gara}</strong>
                        </span>
                        <span className="detail-item-type">
                          Loại:
                          <strong>
                            {post.type === "NhaTro" && "Nhà Trọ"}
                            {post.type === "NhaNguyenCan" && "Nhà nguyên căn"}
                            {post.type === "CanHo" && "Căn Hộ"}
                            {post.type === "OGhep" && "Ở Ghép"}
                          </strong>
                        </span>
                      </div>
                    </Col>
                  </Row>
                </div>

                <MapLocation location={location} zoomLevel={18} />
              </Card>
            </Col>
            <Col className="gutter-row" span={8}>
              <div className="box-widget">
                <div className="box-widget-header">
                  <div className="profile">
                    <div className="profile-img">
                      <img alt="Avatar" src={avatar} />
                    </div>
                    <div className="profile-info">
                      <Link to={`/?user=${post.owner}`} className="link">
                        <h4 className="profile-name">{post.owner}</h4>
                      </Link>
                      <span className="profile-des">
                        <span>22</span>Property Listings
                      </span>
                    </div>
                    <div className="profile-add">
                      <FontAwesomeIcon icon={faUserCheck} />
                    </div>
                  </div>
                </div>
                <Card className="box-widget-container">
                  <div className="box-widget-content">
                    <div className="contats-list">
                      <div className="contats-item">
                        <span className="contats-item-name">
                          <PhoneTwoTone className="contats-icon" />
                          Số điện thoại:
                        </span>
                        <span className="contats-item-content">
                          +84 {post.phone}
                        </span>
                      </div>
                      <div className="contats-item">
                        <span className="contats-item-name">
                          <MailTwoTone className="contats-icon" />
                          Email:
                        </span>
                        <span className="contats-item-content">
                          {user?.email}
                        </span>
                      </div>
                      <div className="contats-item">
                        <span className="contats-item-name">
                          <CreditCardTwoTone className="contats-icon" />
                          Website:
                        </span>
                        <span className="contats-item-content">
                          themeforest.net
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="profile-widget-footer">
                    <FontAwesomeIcon
                      className="widget-footer-send"
                      icon={faPaperPlane}
                    />
                  </div>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
