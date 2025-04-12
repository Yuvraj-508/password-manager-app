import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router";
import Menu from "../assets/menu.png";
import Next from "../assets/next.png";
import User from "../assets/user.png";
import { DataContext } from "../Manager/Context";

function Navbar() {
  const { user,handleLogout } = useContext(DataContext);
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center justify-between py-1.5 font-light navbar px-[10vw]">
      <Link to="/" className="text-[36px] mb-1 ">
        Logo
      </Link>
      <ul className="md:flex gap-8 text-lg text-gray-700 hidden ml-15">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About Us</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact Us</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="md:flex items-center gap-1 hidden">
        {user && (
          <Link to="/dashboard">
            <button className="bg-[#009b8f] hover:bg-[#6ED4D4] text-white px-5 py-2 rounded-xl font-light cursor-pointer text-xl">
              Dashboard
            </button>
          </Link>
        )}
        {!user && (
          <Link to="/login">
            <button className="bg-[#009b8f] hover:bg-[#6ED4D4] text-white px-5 py-2 rounded-xl font-light cursor-pointer text-xl">
              Sign Up
            </button>
          </Link>
        )}
      {user&& (  <div className="group relative ">
          <p className="bg-red-400 text-white px-3 py-2 rounded-[100%] text-xl text-center cursor-pointer tracking-wider">
            {user?.name?.slice(0, 2).toUpperCase()}
          </p>
          <div className="group-hover:block hidden absolute right-0 pt-3">
            <Link to="/logout">
              <button className="text-lg bg-slate-200 hover:bg-slate-100 px-5 py-2 text-gray-500 rounded hover:text-black cursor-pointer" onClick={handleLogout}>
                Logout
              </button>
            </Link>
          </div>
        </div>
)}
      </div>

      {/* {modle-menuicon} */}
      <img
        src={Menu}
        alt=""
        className="w-12 cursor-pointer md:hidden"
        onClick={() => setVisible(true)}
      />

      <div
        className={`absolute top-0 right-0 bottom-0 bg-white overflow-hidden transition-all duration-300 ease-in-out z-50  ${
          visible ? "w-full" : "w-0"
        } text-xl`}
      >
        <div className="flex flex-col text-gray-600 ">
          <div className="flex items-center gap-2  p-3 pl-5">
            <img
              src={Next}
              alt=""
              className="w-8 rotate-180 opacity-15 cursor-pointer"
              onClick={() => setVisible(false)}
            />
            <p>Back</p>
          </div>
          {/* [mob profir] */}
          <div className="mb-2 py-2 pl-7 hidden ">
            <div className="flex items-center gap-2 ">
              <p className="bg-red-400 text-white px-[16px] py-2 rounded-[100%] text-2xl text-center cursor-pointer font-semibold"></p>
              <div className="text-sm">
                <p className="font-semibold tracking-wider">Abhi</p>
                <p className="font-light tracking-wide">abhi020507@gamil.com</p>
                <Link className="text-[#009b8f]">View Profile</Link>
              </div>
            </div>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-7 border border-[#e5e7eb] cursor-pointer"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-7 border border-[#e5e7eb]  cursor-pointer"
            to="/about"
          >
            About Us
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-7 border border-[#e5e7eb] cursor-pointer"
            to="/contact"
          >
            Contact Us
          </NavLink>
          <div className="flex gap-25 absolute bottom-4 font-semibold items-center text-lg w-full justify-center text-white border-t border-gray-200 pt-3 md:px-0 ">
            <Link onClick={() => setVisible(false)} to="/dashboard">
              <button className=" px-3 py-2  rounded text-[#009b8f] cursor-pointer tracking-wider">
                Login
              </button>
            </Link>
            <Link onClick={() => setVisible(false)} to="/login">
              <button className="bg-[#009b8f] w-35  py-1.5 rounded-xl cursor-pointer tracking-wider">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
