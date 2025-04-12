import React, { useContext, useEffect } from 'react'
import Hero from '../Component/Hero'
import { useNavigate } from "react-router-dom";
import API from '../../api/Api';
import { DataContext } from '../Manager/Context';

function Home() {
  const {setUser} =useContext(DataContext)
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user)
    } catch (err) {
      console.error("Fetch error:", err);
    
      // Safe check for status
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
      } else {
        console.log("Unexpected error:", err.message);
      }// or res.data.passwords
  }
}
  useEffect(()=>{

    fetchData()
    
  },[])
  return (
    <div>
    <Hero/>
    </div>
  )
}

export default Home
