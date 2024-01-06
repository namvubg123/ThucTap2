import {
  CheckOutlined,
  CloseOutlined,
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

import {
  getProducts,
  removeProduct,
  updateProduct,
} from "../../../api/product";
import dayjs from "dayjs";

function AdminProducts(props) {
  const [openForm, setOpenForm] = useState(false);
  const [dataProduct, setDataProduct] = useState({});
  const [valueSearchProduct, setValueSearchProduct] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [statusFilters, setStatusFilters] = useState([]);
  const [dateFilters, setDateFilters] = useState([]);

  useEffect(() => {
    getProducts()
      .then((response) => {
        const sortedData = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setDataSource(sortedData);
        setFilteredDataSource(sortedData);

        const uniqueStatus = [
          ...new Set(sortedData.map((item) => item.status)),
        ];
        setStatusFilters(
          uniqueStatus.map((status) => ({
            text: status,
            value: status,
          }))
        );

        const uniqueDates = [
          ...new Set(
            sortedData.map((item) => dayjs(item.createdAt).format("DD/MM/YYYY"))
          ),
        ];
        setDateFilters(
          uniqueDates.map((date) => ({
            text: date,
            value: date,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleConfirmChangeStatus = (record, newStatus) => {
    const updatedData = { status: newStatus };
    updateProduct(record._id, updatedData)
      .then((response) => {
        console.log("Cập nhật trạng thái thành công:", response.data);
        getProducts()
          .then((response) => {
            const sortedData = response.data.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setDataSource(sortedData);
            setFilteredDataSource(sortedData);

            const uniqueStatus = [
              ...new Set(sortedData.map((item) => item.status)),
            ];
            setStatusFilters(
              uniqueStatus.map((status) => ({
                text: status,
                value: status,
              }))
            );
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log("Lỗi khi cập nhật trạng thái:", error);
      });
  };

  const handleConfirmDeleteProduct = (id) => {
    console.log("id cua san pham la : " + id);
    removeProduct(id)
      .then((res) => {
        console.log("Xóa thành công", res.data);
        getProducts()
          .then((response) => {
            const sortedData = response.data.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setDataSource(sortedData);
            setFilteredDataSource(sortedData);

            const uniqueStatus = [
              ...new Set(sortedData.map((item) => item.status)),
            ];
            setStatusFilters(
              uniqueStatus.map((status) => ({
                text: status,
                value: status,
              }))
            );
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log("Lỗi khi cập nhật trạng thái:", error);
      });
  };

  const handleDateFilter = (selectedDate) => {
    if (selectedDate) {
      const filteredData = dataSource.filter((item) => {
        const itemDate = dayjs(item.createdAt).startOf("day");
        const selectedDateStart = dayjs(selectedDate).startOf("day");
        const selectedDateEnd = dayjs(selectedDate).endOf("day");

        return itemDate.isBetween(
          selectedDateStart,
          selectedDateEnd,
          null,
          "[]"
        );
      });

      setFilteredDataSource(filteredData);
    } else {
      setFilteredDataSource(dataSource);
    }
  };

  const handleStatusFilter = (selectedStatus) => {
    if (selectedStatus) {
      const filteredData = dataSource.filter(
        (item) => item.status === selectedStatus
      );
      setFilteredDataSource(filteredData);
    } else {
      setFilteredDataSource(dataSource);
    }
  };

  const renderOptions = (record) => (
    <Space size={10}>
      {record.status === "pending" && (
        <Tooltip title="Duyệt">
          <Button
            icon={<CheckOutlined />}
            onClick={() => handleConfirmChangeStatus(record, "accepted")}
          />
        </Tooltip>
      )}
      {record.status === "pending" && (
        <Tooltip title="Từ chối">
          <Button
            icon={<CloseOutlined />}
            onClick={() => handleConfirmChangeStatus(record, "rejected")}
          />
        </Tooltip>
      )}
      <Tooltip title="Xóa">
        <Button
          icon={<DeleteOutlined />}
          onClick={() => handleConfirmDeleteProduct(record._id)}
        />
      </Tooltip>
    </Space>
  );

  const columns = [
    {
      title: "Tiêu đề",
      align: "center",
      dataIndex: "title",
    },
    {
      title: "Ngày đăng",
      dataIndex: "createdAt",
      key: "createdAt",
      filters: [...dateFilters, { text: "Không có ngày", value: "null" }],
      onFilter: (value, record) => {
        if (value === "null") {
          return !record.createdAt;
        } else {
          return dayjs(record.createdAt).format("DD/MM/YYYY") === value;
        }
      },
      render: (text, record) => {
        return (
          <span>
            {record.createdAt
              ? dayjs(record.createdAt).format("DD/MM/YYYY")
              : "Không có ngày"}
          </span>
        );
      },
    },
    {
      title: "Trạng thái",
      align: "center",
      render: (text, record) => {
        let statusLabel = "";
        let statusColor = "";

        switch (record.status) {
          case "pending":
            statusLabel = "Chờ duyệt";
            statusColor = "black";
            break;
          case "accepted":
            statusLabel = "Đã duyệt";
            statusColor = "limegreen";
            break;
          case "rejected":
            statusLabel = "Từ chối";
            statusColor = "Orange";
            break;
          case "expired":
            statusLabel = "Hết hạn";
            statusColor = "red";
            break;
          default:
            statusLabel = "Không xác định";
            break;
        }

        return <span style={{ color: statusColor }}>{statusLabel}</span>;
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
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
      title: "Diện tích",
      dataIndex: "area",
      align: "center",
    },
    {
      title: "Người đăng",
      dataIndex: "owner",
      align: "center",
    },
    {
      title: "Tùy chọn",
      align: "center",
      render: (text, record) => renderOptions(record),
    },
  ];

  const handleSearchProduct = () => {
    const filteredData = dataSource.filter((item) => {
      const productName = item.title.toLowerCase();
      const searchValue = valueSearchProduct.toLowerCase();

      return productName.includes(searchValue);
    });

    setFilteredDataSource(filteredData);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3 relative ">
        <Space className="ml-5">
          {/* <Tooltip title="Tìm kiếm sản phẩm">
            <Input
              prefix={<SearchOutlined className="opacity-60 mr-1" />}
              placeholder="Nhập tiêu đề"
              className="shadow-sm w-[250px]"
              onChange={(e) => setValueSearchProduct(e.target.value)}
              value={valueSearchProduct}
            />
            <Button
              type="primary"
              onClick={handleSearchProduct}
              disabled={!valueSearchProduct}
            >
              Tìm kiếm
            </Button>
          </Tooltip> */}
        </Space>
        <Title
          level={3}
          style={{ textTransform: "uppercase", marginBottom: 0 }}
        >
          Danh sách sản phẩm
        </Title>
        {/* <Space size={8}>
          <Button
            icon={<UserAddOutlined />}
            onClick={() => setOpenForm(true)}
            className="flex justify-center items-center text-md font-medium shadow-md bg-slate-100"
          >
            Thêm sản phẩm
          </Button>
        </Space> */}
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
