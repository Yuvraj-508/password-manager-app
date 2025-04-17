import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Navbar from "./Component/Navbar";
import Logout from "./Pages/Logout";
import Dashboard from "./Pages/Dashboard";
import Tools from "./Pages/Tools";

function App() {
  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tools" element={<Tools />}>
            <Route path="password-genrator" element={<Logout />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
