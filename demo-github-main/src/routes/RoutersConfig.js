import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import ProductDetail from "../Pages/product-detail";
import AddListing from "../components/AddListing";

function RoutersConfig() {
  return (
    <Routes>
      <Route path="/post/:id" element={<ProductDetail />} />
      <Route path="/addlisting" element={<AddListing />} />
      <Route exact path="/" element={<Home />} />
    </Routes>
  );
}

export default RoutersConfig;
