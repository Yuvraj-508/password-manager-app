import React from 'react'
import { useNavigate } from "react-router-dom";
import API from "./Api"; // Axios instance with base URL & token logic

// const navigate = useNavigate();
export const loginUser = async (loginData) => {
  const res = await API.post("/user/login", loginData); // adjust route if needed
  return res.data;
}

 export const registerUser = async (registerData) => {
      const res = await API.post("/user/register", registerData);
      return res.data;
     
  };

  export const savePassword = async (entryData) => {
    const res = await API.post("/passwords", entryData);
    return res.data;
  };

  export const getPasswords = async () => {
    const res = await API.get("/passwords");
    return res.data;
  };

  export const updatePassword = async (id, updatedData) => {
    const res = await API.put(`/passwords/${id}`, updatedData);
    return res.data;
  };

  export const deletePassword = async (id) => {
    const res = await API.delete(`/passwords/${id}`);
    return res.data;
  };
  


 
