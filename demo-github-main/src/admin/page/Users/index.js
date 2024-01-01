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
import ModalUser from "./components/ModalUser";
import { deleteUser, getAllUsers } from "../../../api/users";

function AdminUsers(props) {
  const [openForm, setOpenForm] = useState(false);
  const [dataUser, setDataUser] = useState({});
  const [valueSearchProduct, setValueSearchProduct] = useState("");
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        setDataSource(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderOptions = (record) => (
    <Space size={10}>
      {/* {record.status === "pending" && (
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
      )} */}
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
      title: "Tên tài khoản",
      align: "center",
      dataIndex: "username",
    },
    {
      title: "Tên người dùng",
      dataIndex: "lastName",
      align: "center",
    },
    {
      title: "Mã người dùng",
      dataIndex: "_id",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
    },

    {
      title: "Địa chỉ",
      dataIndex: "address",
      align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      align: "center",
    },
    {
      title: "Tùy chọn",
      align: "center",
      render: (text, record) => renderOptions(record),
    },
  ];
  const handleConfirmDeleteProduct = (id) => {
    console.log(id);
    deleteUser(id).then((res) => {
      console.log("thanh cong ");
      getAllUsers()
        .then((response) => {
          setDataSource(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      notification.success({ message: "Xóa thành công" });
    });
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-3 relative">
        <Space className="ml-5">
          {/* <Tooltip title="Tìm kiếm người dùng">
            <Input
              prefix={<SearchOutlined className="opacity-60 mr-1" />}
              placeholder="Nhập mã mã người dùng"
              className="shadow-sm w-[250px]"
              onChange={(e) => {
                setValueSearchProduct(e.target.value);
              }}
              value={valueSearchProduct}
            />
          </Tooltip> */}
          {/* <Popover trigger={'click'} content={<FormFilter />}>
            <Button icon={<FilterOutlined />} className="flex justify-center items-center">
              Lọc
            </Button>
          </Popover> */}
        </Space>
        <Title
          level={3}
          style={{ textTransform: "uppercase", marginBottom: 0 }}
        >
          Danh sách người dùng
        </Title>
        <Space size={8}>
          <Button
            icon={<UserAddOutlined />}
            onClick={() => setOpenForm(true)}
            className="flex justify-center items-center text-md font-medium shadow-md bg-slate-100"
          >
            Thêm người dùng
          </Button>
        </Space>
      </div>
      {dataSource && (
        <div className="relative">
          <Table
            rowKey="id"
            bordered={true}
            dataSource={dataSource}
            columns={columns}
          />
        </div>
      )}
      <ModalUser
        onSuccess={() => {
          setOpenForm(false);
        }}
        dataUser={dataUser}
        openForm={openForm}
        onChangeClickOpen={(open) => {
          if (!open) {
            setDataUser({});
            setOpenForm(false);
          }
        }}
      />
    </div>
  );
}

export default AdminUsers;
