import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import RoutersConfig from "./routes/RoutersConfig";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import DefaultLayoutAdmin from "./admin/components/DefaultLayoutAdmin";
import AdminProducts from "./admin/page/Products";
import AdminUsers from "./admin/page/Users";

function App() {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/addlisting") {
      setShowHeader(true);
      setShowFooter(false);
    } else if (location.pathname.startsWith("/admin")) {
      setShowHeader(false);
      setShowFooter(false);
    } else {
      setShowHeader(true);
      setShowFooter(true);
    }
  }, [location]);

  return (
    <div className="App">
      {showHeader && <Header />}
      <Routes>
        <Route path="admin" element={<DefaultLayoutAdmin />} />
        <Route path="/products" element={<AdminProducts />} />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/*" element={<RoutersConfig />} />
      </Routes>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
