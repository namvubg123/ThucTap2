import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import ProductDetail from "../Pages/product-detail";
import AddListing from "../components/AddListing";
import AdminProducts from "./../admin/page/Products/index";
import AdminUsers from "./../admin/page/Users/index";
import DefaultLayoutAdmin from "../admin/components/DefaultLayoutAdmin";
import { Context } from "../context/Context";

function RoutersConfig() {
  const { user } = useContext(Context);

  return (
    <Routes>
      <Route path="/post/:id" element={<ProductDetail />} />
      <Route
        path="/addlisting"
        element={
          user ? (
            <AddListing />
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <div
                  style={{
                    background: "#3270fc",
                    padding: "20px",
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      color: "white",
                    }}
                  >
                    Bạn phải đăng nhập mới có thể đăng bài
                  </p>
                </div>
              </div>
            </>
          )
        }
      />
      <Route exact path="/" element={<Home />} />
      <Route path="/admin" element={<DefaultLayoutAdmin />}>
        <Route path="users" element={<AdminUsers />} />
        <Route path="products" element={<AdminProducts />} />
      </Route>
    </Routes>
  );
}

export default RoutersConfig;
