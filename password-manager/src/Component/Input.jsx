import React, { useContext, useEffect, useRef,useState } from "react";
import "./Input.css";
import { DataContext } from "../Manager/Context";
import { v4 as uuidv4 } from 'uuid';
import { savePassword,getPasswords } from "../api/apihandler";
import { updatePassword } from "../api/apihandler";


function Input() {
  
  const { setForm, form, setPasswordArray, passwordArray,show,handleEye,eyeOpen,eyeCross } =
    useContext(DataContext);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (form._id) {
        // 🛠️ Update existing password
        await updatePassword(form._id, form);
      } else {
        // ➕ Add new password
        await savePassword(form);
      }
  
      const allPasswords = await getPasswords(); // ✅ Refresh list
      setPasswordArray(allPasswords);            // 🔄 Update state
      setForm({ platform: "", username: "", password: "" }); // 🧹 Clear form
    } catch (error) {
      console.error("Error saving password:", error);
    }
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
          value={form.platform}
          type="text"
          className=" inp w-[90%] md:w-[65%] py-1 sm:py-2  px-3 text-lg"
          placeholder="Enter your Site Name or Other"
          name="platform"
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
