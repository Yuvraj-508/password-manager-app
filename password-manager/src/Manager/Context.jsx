import React, { useState, useEffect, createContext } from "react";
import eyeOpen from "../assets/view.png";
import eyeCross from "../assets/hide.png";
import { useNavigate } from "react-router-dom";
import API from "../api/Api"; // adjust path
import { getPasswords } from "../api/apihandler";

export const DataContext = createContext();


const DataProvider = (props) => {
  
  const navigate = useNavigate();

  const [form, setForm] = useState({ platform: "", username: "", password: "" });
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
  // useEffect(() => {
  //   const fetchPasswords = async () => {
  //     const allPasswords = await getPasswords();
  //     setPasswordArray(allPasswords);
  //   };
  
    // Empty dependency array: runs only once when component mounts
  


  

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
