import './App.css';
import React, { useEffect, useState } from 'react';
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import RoutersConfig from "./routes/RoutersConfig";
import { useLocation } from 'react-router-dom'
function App() {
  const [show, setshow] = useState(true);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/addlisting") {
      setshow(false);
    } else {
      setshow(true);
    }
  })

  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <RoutersConfig />
      <div>
        {show == true && <Footer />}
      </div>
    </div>
  );



}


export default App;

