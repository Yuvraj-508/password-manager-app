import React from 'react'
import { useNavigate } from "react-router-dom";
import API from "./Api"; // Axios instance with base URL & token logic

// const navigate = useNavigate();
export const loginUser = async (loginData) => {
  const res = await API.post("/login", loginData); // adjust route if needed
  return res.data;
}

 export const registarUser = async (registerData) => {
      const res = await API.post("/register", registerData);
      return res.data;
     
  };



 
