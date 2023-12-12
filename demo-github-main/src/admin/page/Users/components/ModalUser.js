import React from "react";
import { ModalForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { registerUser } from "../../../../api/auth";
import { notification } from "antd";

function ModalUser({ dataUser, openForm, onChangeClickOpen }) {
  return (
    <div>
      <ModalForm
        width={750}
        title={dataUser?._id ? "Sửa thông tin người dùng" : "Thêm người dùng"}
        initialValues={dataUser}
        modalProps={{
          destroyOnClose: true,
          okText: dataUser?._id ? "Cập nhật" : "Tạo mới",
          okType: "primary",
          cancelText: "Hủy",
        }}
        open={openForm}
        onFinish={(values) => {
          registerUser(values).then(
            (res) => {
              console.log(res);
              notification.success({ message: " Tạo thành công " });
            },
            (err) => {
              console.log(err);
              if (err) {
                notification.error({ message: " Tạo thất bại" });
              }
            }
          );

          console.log("this is onfinish");
        }}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="username"
            label="Tên đăng nhập"
            placeholder="Nhập tên đăng nhập"
          />
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="password"
            label="Mật khẩu"
            type="password"
            placeholder="Nhập mật khẩu"
          />
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="email"
            label="Email"
            placeholder="Nhâp email"
          />
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="lastName"
            label="Tên người dùng"
            placeholder="Nhâp tên người dùng"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            label="Địa chỉ"
            width="md"
            name="address"
            placeholder="Nhập địa chỉ"
          />

          <ProFormText
            width="md"
            name="phone"
            label="Số điện thoại"
            placeholder="Nhâp sdt"
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}

export default ModalUser;
