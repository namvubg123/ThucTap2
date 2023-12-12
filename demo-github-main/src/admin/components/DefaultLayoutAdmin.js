import {
  BellOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Layout,
  Menu,
  Space,
  Tooltip,
  Typography,
} from "antd";
import Cookies from "js-cookie";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function DefaultLayoutAdmin() {
  const { Title } = Typography;
  const navigate = useNavigate();
  const { Header, Sider, Content } = Layout;
  const { pathname } = useLocation();
  const check = (pathname) => {
    if (pathname.includes("/admin/products")) {
      return "1";
    } else if (pathname.includes("/admin/users")) {
      return "2";
      // } else if (pathname.includes("/admin/category")) {
      //   return "3";
    }
  };
  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
  };
  const items = [
    {
      key: "1",
      label: "Quản lí sản phẩm",
      onClick: () => {
        navigate(`/admin/products`);
      },
    },
    {
      key: "2",
      label: "Quản lí người dùng",
      onClick: () => {
        navigate(`/admin/users`);
      },
    },
    // {
    //   key: '3',
    //   label: 'Quản lí danh mục',
    //   onClick: () => {
    //     navigate(`/admin/category`);
    //   },
    // },
  ];
  return (
    <Layout
      className="min-h-full"
      style={{
        minHeight: 700,
        maxHeight: 1700,
      }}
    >
      <Sider width={230}>
        <div className="py-3 px-6 flex justify-center items-center border-b-2 border-stone-50">
          <Title
            style={{ color: "#fff", marginBottom: 0, width: 150 }}
            level={4}
          >
            Xin chào admin
          </Title>
        </div>
        <Menu
          className="min-h-full rounded-md mt-1"
          theme="dark"
          mode="inline"
          items={items}
          defaultSelectedKeys={[check(pathname)]}
        />
      </Sider>
      <Layout className="site-layout ml-2">
        <Header
          theme="dark"
          className="rounded-md flex justify-between items-center p-8 "
        >
          <Title
            style={{
              color: "#fff",
              marginBottom: 0,
              textTransform: "uppercase",
            }}
            level={2}
          >
            Quản lý nhà trọ
          </Title>
          <Space size={24}>
            <Badge count={10} size="small">
              <Button
                shape="circle"
                className="flex justify-center items-center text-white border-none text-[15px]"
                icon={<BellOutlined />}
              ></Button>
            </Badge>
            <Avatar
              className="flex justify-center items-center bg-white cursor-pointer"
              shape="circle"
              size={40}
              icon={<UserOutlined className="text-[20px] text-black" />}
            />
            <Tooltip title="Đăng xuất">
              <Button
                className="flex justify-center items-center text-white text-xl border-none"
                shape="circle"
                icon={<PoweroffOutlined className="text-[15px]" />}
                href="/login"
                onClick={handleLogout}
              ></Button>
            </Tooltip>
          </Space>
        </Header>
        <Content className="mt-2 p-6 pb-0 h-[280px] bg-slate-200 rounded-md overflow-y-auto ">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default DefaultLayoutAdmin;
