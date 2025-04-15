import React,{useState,useEffect,useContext} from 'react'
import Input from '../Component/Input'
import Data from '../Component/Data'
import API from "../api/Api"; // Axios instance with base URL & token logic
import { useNavigate } from "react-router-dom";
import { DataContext } from '../Manager/Context';
import { getPasswords } from '../api/apihandler';

function Dashboard() {

  const{setUser,setPasswordArray,PasswordArray}=useContext(DataContext)

  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user)
    } catch (err) {
      console.error("Fetch error:", err);
    
      // Safe check for status
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        navigate('/login')
      } else {
        console.log("Unexpected error:", err.message);
      }// or res.data.passwords
  }
}
  useEffect(() => {
    fetchData();
  }, []);

    useEffect(() => {
      const fetchPasswords = async () => {
        try {
          const data = await getPasswords();
           setPasswordArray(data);
          console.log("Your saved password:", data);
        } catch (err) {
          console.error("Error fetching:", err);
        }
      };
    
      fetchPasswords();
    }, []);

  return (
    <div>
     <Input/>
     <Data/>
    </div>
  )
}

export default Dashboard
