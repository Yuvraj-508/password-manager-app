import React, { useState, useEffect, createContext } from "react";
import eyeOpen from "../assets/view.png";
import eyeCross from "../assets/hide.png";
import { useNavigate } from "react-router-dom";
import API from "../api/Api"; // adjust path

export const DataContext = createContext();


const DataProvider = (props) => {
  
  const navigate = useNavigate();

  const [form, setForm] = useState({ url: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [show, setShow] = useState(false); // for form field
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const[user,setUser] = useState(null);

  
   
 
  // for table/list fields

  const handleEye = () => {
    setShow(!show);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear JWT
    setUser(null); // clear user from context
    navigate("/"); // redirect to login page
  };

  const togglePasswordVisibility = (index) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  useEffect(() => {
    console.log("Password array updated:", passwordArray);
  }, [passwordArray]);

  

  const value = {
    setForm,
    form,
    passwordArray,
    setPasswordArray,
    show,
    handleEye,
    eyeOpen,
    eyeCross,
    visiblePasswords,
    togglePasswordVisibility,
    setUser,
    user,
    handleLogout,
  };

  return (
    <DataContext.Provider value={value}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
