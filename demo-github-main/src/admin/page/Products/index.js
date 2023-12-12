import {
  DeleteOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Popconfirm,
  Space,
  Table,
  Tooltip,
  notification,
} from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import ModalProduct from "./components/ModalProduct";

import { getProducts, removeProduct } from "../../../api/product";
import dayjs from "dayjs";

function AdminProducts(props) {
  const [openForm, setOpenForm] = useState(false);
  const [dataProduct, setDataProduct] = useState({});
  const [valueSearchProduct, setValueSearchProduct] = useState("");
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getProducts()
      .then((response) => {
        // console.log(response);
        setDataSource(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = [
    {
      title: "Tiêu đề",
      align: "center",
      dataIndex: "title",
    },
    {
      title: "Ngày đăng",
      // dataIndex: "createdAt",
      align: "center",
      render: (data, res, index) => (
        <>
          <p>{dayjs(res?.createdAt).format("DD/MM/YYYY")}</p>
        </>
      ),
    },
    // {
    //   title: "Danh mục",
    //   align: "center",
    //   dataIndex: ["category", "name"],
    // },
    {
      title: "Giá",
      dataIndex: "price",
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "location",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      align: "center",
      render: (record) => {
        return (
          <>
            <h2 className="text-left text-base ">{record}</h2>
          </>
        );
      },
    },
    {
      title: "Phân loại",
      dataIndex: "type",
      align: "center",
    },
    {
      title: "Tùy chọn",
      align: "center",
      render: (e, record, index) => (
        <Space size={10} key={index}>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa sản phẩm này ?"
              icon={<DeleteOutlined />}
              okText="Xóa"
              okType="danger"
              onConfirm={() => handleConfirmDeleteProduct(record._id)}
            >
              <Button
                className="flex justify-center items-center text-md shadow-md"
                icon={<DeleteOutlined />}
              ></Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];
  const handleConfirmDeleteProduct = (id) => {
    console.log("id cua san pham la : " + id);
    removeProduct(id).then((res) => {
      console.log(res.data);
      if (res.data.status === true) {
        getProducts()
          .then((response) => {
            // console.log(response);
            setDataSource(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
        notification.success({ message: " Xóa thành công " });
      }
    });
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-3 relative ">
        <Space className="ml-5">
          <Tooltip title="Tìm kiếm sản phẩm">
            <Input
              prefix={<SearchOutlined className="opacity-60 mr-1" />}
              placeholder="Nhập tên sản phẩm"
              className="shadow-sm w-[250px]"
              onChange={(e) => {
                setValueSearchProduct(e.target.value);
              }}
              value={valueSearchProduct}
            />
          </Tooltip>
        </Space>
        <Title
          level={3}
          style={{ textTransform: "uppercase", marginBottom: 0 }}
        >
          Danh sách sản phẩm
        </Title>
        <Space size={8}>
          <Button
            icon={<UserAddOutlined />}
            onClick={() => setOpenForm(true)}
            className="flex justify-center items-center text-md font-medium shadow-md bg-slate-100"
          >
            Thêm sản phẩm
          </Button>
        </Space>
      </div>
      {dataSource && (
        <div className="relative  ">
          <Table
            rowKey="id"
            bordered={true}
            dataSource={dataSource}
            columns={columns}
          />
        </div>
      )}
      <ModalProduct
        onSuccess={() => {
          setOpenForm(false);
        }}
        dataProduct={dataProduct}
        openForm={openForm}
        onChangeClickOpen={(open) => {
          if (!open) {
            setDataProduct({});
            setOpenForm(false);
          }
        }}
      />
    </div>
  );
}

export default AdminProducts;
