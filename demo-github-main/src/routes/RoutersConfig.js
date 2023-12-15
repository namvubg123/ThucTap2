import React, { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import ProductDetail from "../Pages/product-detail";
import AddListing from "../components/AddListing";
import AdminProducts from "./../admin/page/Products/index";
import AdminUsers from "./../admin/page/Users/index";
import DefaultLayoutAdmin from "../admin/components/DefaultLayoutAdmin";
import { Context } from "../context/Context";
import Apartment from "../Pages/Apartment";

function RoutersConfig() {
  const { user } = useContext(Context);

  return (
    <Routes>
      <Route path="/post/:id" element={<ProductDetail />} />
      <Route path="/addlisting" element={user ? <AddListing /> : <Home />} />
      <Route exact path="/" element={<Home />} />
      <Route path="apartment" element={<Apartment />} />
      <Route path="nhatro" element={<Apartment />} />
      <Route path="nhanguyencan" element={<Apartment />} />
      <Route path="oghep" element={<Apartment />} />
      <Route path="/admin" element={<DefaultLayoutAdmin />}>
        <Route path="users" element={<AdminUsers />} />
        <Route path="products" element={<AdminProducts />} />
      </Route>
    </Routes>
  );
}

export default RoutersConfig;
