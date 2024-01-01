import React, { useContext, useEffect, useState } from "react";
import { Modal, Tabs, Input, Dropdown, Menu } from "antd";
import {
  UserOutlined,
  BellOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Login from "../../Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import Register from "../../Register";
import "./Heade.css";
import Cookies from "js-cookie";
import { Context } from "../../../context/Context";
import { getProducts } from "./../../../api/product";
import { useNavigate } from "react-router-dom";

const items = [
  {
    key: "1",
    label: (
      <span>
        <FontAwesomeIcon
          icon={faRightToBracket}
          style={{ marginRight: "8px" }}
        />
        Đăng nhập
      </span>
    ),
    children: <Login />,
  },
  {
    key: "2",
    label: (
      <span>
        <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: "8px" }} />
        Đăng ký
      </span>
    ),
    children: <Register />,
  },
];
const logo = require("../../../asset/img/Logo.png");
const { Search } = Input;

export default function Header() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { user } = useContext(Context);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const lastName = user ? user.lastName : null;
  const [post, setPost] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredProducts = post.filter((post) =>
      post.title.toLowerCase().includes(searchTerm)
    );
    setSearchResults(filteredProducts);
    setIsDropdownVisible(searchTerm !== "");
  };

  useEffect(() => {
    getProducts()
      .then((response) => {
        const sortedPosts = response.data.sort((a, b) => {
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
        setPost(filteredPosts);
      })
      .catch((error) => {
        console.error("Error getting products:", error);
      });
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
      setIsModalOpen(false);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  const renderDropdownMenu = () => {
    return (
      <Menu>
        {searchResults.slice(0, 7).map((post) => (
          <Menu.Item key={post._id}>
            <Link to={`/post/${post._id}`}>{post.title}</Link>
          </Menu.Item>
        ))}
      </Menu>
    );
  };
  return (
    <nav className="scroll bg-white  border-gray-200 dark:bg-gray-900 ">
      <div className="">
        <div className=" flex flex-wrap items-center justify-between mx-auto">
          <Link to="/" className="flex items-center">
            <img src={logo} className="h-12 mr-3" />
          </Link>
          <div>
            <Dropdown
              getPopupContainer={(trigger) => trigger.parentNode}
              overlay={renderDropdownMenu()}
              placement="bottomLeft"
            >
              <Search
                placeholder="Search..."
                style={{ width: 400 }}
                onChange={handleSearchChange}
                onFocus={() => setIsDropdownVisible(true)}
                onBlur={() => setIsDropdownVisible(false)}
              />
            </Dropdown>
          </div>
          <div
            className="hidden w-full md:block md:w-auto mr-5  "
            id="navbar-default"
          >
            <ul className=" font-medium flex flex-col p-4 md:p-0 border items-center border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link to="/">
                  <span className="ml-3 block text-xs py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
                    Trang chủ
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/apartment?type=CanHo"
                  className="block text-xs py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Căn hộ
                </Link>
              </li>
              <li>
                <Link
                  to="/nhatro?type=NhaTro"
                  className="block text-xs py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Nhà trọ
                </Link>
              </li>
              <li>
                <Link
                  to="/nhanguyencan?type=NhaNguyenCan"
                  className="block text-xs py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Nhà nguyên căn
                </Link>
              </li>
              <li>
                <Link
                  to="/oghep?type=OGhep"
                  className="block text-xs py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Ở ghép
                </Link>
              </li>
              <li className="border-x" style={{ padding: "20px" }}>
                <button
                  onClick={showModal}
                  className="mt-0 text-xs flex items-center pl-3 pr-4 shadow-none text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <UserOutlined />
                  <span className="ml-3">
                    {isLoggedIn && lastName ? lastName : "Đăng nhập"}
                  </span>
                </button>
                <Modal
                  open={isModalOpen}
                  centered
                  onCancel={handleCancel}
                  width={500}
                  footer={null}
                >
                  <div className="logo-form">
                    <img src={logo} className="h-20" />
                  </div>
                  <div className="title-logo" style={{ marginBottom: "10px" }}>
                    <h3>Welcome back 👋</h3>
                  </div>
                  <div className="content-body">
                    <Tabs defaultActiveKey="1" items={items} />
                  </div>
                </Modal>
              </li>
              <li
                className="pl-0 pr-7 flex p-7 border-r items-center relative"
                id="boder"
              >
                <BellOutlined />
                {/* <span className="count">5</span> */}
              </li>
              <button
                className="px-4 btn-add"
                onClick={() => {
                  if (!user) {
                    setIsModalOpen(true);
                  } else {
                    // Navigate to add listing page
                    navigate("/addlisting");
                  }
                }}
              >
                <Link className="mt-0 flex items-center">
                  <PlusCircleOutlined className="icon-add" />
                  <span className="ml-3 text-xs">Đăng bài</span>
                </Link>
              </button>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
