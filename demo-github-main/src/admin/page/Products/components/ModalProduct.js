import React from "react";
import { ModalForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { createProduct } from "../../../../api/product";
import { notification } from "antd";

function ModalProduct({ onSuccess, dataProduct, openForm, onChangeClickOpen }) {
  // const handleCreateProduct = (values) => {
  //   onSuccess();
  // };

  // const handleUpdateProduct = (dataProduct, values) => {
  //   onSuccess();
  // };

  return (
    <div>
      <ModalForm
        width={750}
        title={dataProduct?._id ? "Sửa thông tin sản phẩm" : "Thêm sản phẩm"}
        initialValues={dataProduct}
        modalProps={{
          destroyOnClose: true,
          okText: dataProduct?._id ? "Cập nhật" : "Tạo mới",
          okType: "primary",
          cancelText: "Hủy",
        }}
        open={openForm}
        onFinish={(values) => {
          createProduct(values).then(
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
        }}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="name"
            label="Tên sản phẩm"
            placeholder="Nhâp tên sản phẩm"
          />
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="category"
            label="Danh mục"
            placeholder="Nhập danh mục sản phẩm"
          />
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="description"
            label="Miêu tả sản phẩm"
            placeholder="Nhập description"
          />
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="type"
            label="Phân loại"
            placeholder="Nhập phân loại"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="price"
            label="Giá bản sản phẩm"
            placeholder="Nhâp giá sản phẩm"
          />
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="salePrice"
            label="Giá sale"
            placeholder="Nhập giá sale"
          />
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="offer"
            label="Phần trăm khuyến mãi "
            placeholder="Nhập phần trăm khuyến mãi"
          />
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="productIMG"
            label="Ảnh sản phẩm"
            placeholder="Nhập link ảnh sản phẩm"
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}

export default ModalProduct;
