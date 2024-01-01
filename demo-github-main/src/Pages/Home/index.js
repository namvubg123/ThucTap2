import React, { useState, useEffect } from "react";
import "./Slider.css";
import { Col, Row, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ShareAltOutlined } from "@ant-design/icons";
import Product from "../Product";
import axios from "axios";
import { useLocation } from "react-router";
import { getProvinces, getDistricts } from "vietnam-provinces";

const { Option } = Select;

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [typeFilter, setTypeFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cityDistricts, setCityDistricts] = useState({});

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
          post.status === "accepted" &&
          (typeFilter === "" || post.type === typeFilter) &&
          (priceFilter === "" || checkPriceRange(post.price)) &&
          (cityFilter === "" || post.city === cityFilter)
        );
      });

      setPosts(filteredPosts);
    };
    fetchPosts();
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

    fetchProvinces();
    fetchDistricts();
  }, [search, typeFilter, priceFilter, cityFilter]);

  const checkPriceRange = (price) => {
    if (priceFilter === "below1") return price < 1000000;
    if (priceFilter === "1to3") return price >= 1000000 && price < 3000000;
    if (priceFilter === "3to5") return price >= 3000000 && price < 5000000;
    if (priceFilter === "above5") return price >= 5000000;
    return true;
  };

  const handleCityChange = (value) => {
    setCityFilter(value);

    const filteredDistricts = cityDistricts[value] || [];

    if (
      !filteredDistricts.some((district) => district.code === districtFilter)
    ) {
      setDistrictFilter("");
    }

    setDistricts(filteredDistricts);
  };

  return (
    <div>
      <div className="content-home">
        <div className="overlay1"></div>
        <div className="content-banner">
          <p className="text-home"></p>
          <h2>Tìm kiếm một ngôi nhà bạn mơ ước</h2>

          <div className="flex mt-6">
            <Select
              className=" h-16 text-xs border-2 rounded-l-lg bg-white"
              value={typeFilter}
              onChange={(value) => setTypeFilter(value)}
              bordered={false}
            >
              <Option value="">Chọn Phân loại</Option>
              <Option value="NhaTro">Nhà trọ</Option>
              <Option value="Oghep">Ở ghép</Option>
              <Option value="CanHo">Căn hộ</Option>
              <Option value="NhaNguyenCan">Nhà nguyên căn</Option>
            </Select>
            <Select
              className="h-16 text-xs border-y-2 bg-white"
              value={priceFilter}
              onChange={(value) => setPriceFilter(value)}
              bordered={false}
            >
              <Option value="">Chọn giá tiền </Option>
              <Option value="below1">Dưới 1 triệu</Option>
              <Option value="1to3">1 đến 3 triệu</Option>
              <Option value="3to5">3 đến 5 triệu</Option>
              <Option value="above5">Trên 5 triệu</Option>
            </Select>
            <Select
              className="h-16 text-xs border-2 bg-white "
              value={cityFilter}
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
            <Select
              className="h-16 text-xs border-2 bg-white "
              value={districtFilter}
              onChange={(value) => setDistrictFilter(value)}
              bordered={false}
            >
              <Option value="">Chọn huyện/quận</Option>
              {districts.map((district) => (
                <Option key={district.code} value={district.name}>
                  {district.name}
                </Option>
              ))}
            </Select>
            <Button className="btn-search-home" type="primary">
              Search
              <SearchOutlined className="btn-search-i" />
            </Button>
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
