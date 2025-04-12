import React, { useContext, useEffect, useRef,useState } from "react";
import "./Input.css";
import { DataContext } from "../Manager/Context";
import { v4 as uuidv4 } from 'uuid';


function Input() {
  
  const { setForm, form, setPasswordArray, passwordArray,show,handleEye,eyeOpen,eyeCross } =
    useContext(DataContext);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // console.log(form);
    // console.log(passwordArray);


    if (form.id) {
      // Edit mode: update the existing item
      const updatedArray = passwordArray.map((item) =>
        item.id === form.id ? form : item
      );
      console.log("up",updatedArray);
      setPasswordArray(updatedArray);
      localStorage.setItem("passwords", JSON.stringify(updatedArray));
    } else {
      // Add mode: new item
      const newItem = { ...form, id: uuidv4() };
      const updatedArray = [...passwordArray, newItem];
      setPasswordArray(updatedArray);
      localStorage.setItem("passwords", JSON.stringify(updatedArray));
    }
  
    setForm({ url: "", username: "", password: "" });
  };
  

  return (
    <div className="flex flex-col  w-full  items-center mt-5 md:mt-10">
      <h1 className="text-xl  md:text-2xl md:tracking-wider">
        {" "}
        Welcome to <span className="text-blue-600"> PassLocker</span>
      </h1>
      <p className="mt-2 text-sm font-extralight text-gray-600">
        Store and Manage Password
      </p>
      <div className="w-full text-center mt-5">
        <input
          onChange={handleChange}
          value={form.url}
          type="text"
          className=" inp w-[90%] md:w-[65%] py-1 sm:py-2  px-3 text-lg"
          placeholder="Enter your Site Name or Other"
          name="url"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-5 md:gap-8 mt-5">
        <input
          onChange={handleChange}
          value={form.username}
          type="text"
          className=" inp border py-1.5 px-2 text-[16px]"
          placeholder="Username or gmail"
          name="username"
        />
        <div className="relative">
        <input
          onChange={handleChange}
          value={form.password}
          type={show?"text":"password"}
          id=""
          className=" relative inp border py-1 px-3 text-lg"
          placeholder="Password"
          name="password"
        />
        <img src={show ? eyeOpen : eyeCross}  onClick={handleEye} alt="" className="absolute w-5 right-1.5 top-2.5 cursor-pointer"/>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-[#28CDD0] text-white py-2 px-6 rounded-lg mt-5 mr-8 cursor-pointer font-semibold tracking-wide"
      >
        Save Now
      </button>
    </div>
  );
}

export default Input;
