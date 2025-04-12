import React, { useState, useContext } from "react";
import { Link } from "react-router";
import "./Form.css";
import goggle from "../assets/google.png";
import facebook from "../assets/facebook.png";
import API from "../../api/Api"; // Axios instance with base URL & token logic
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Manager/Context";
import { loginUser,registarUser } from "../../api/apihandler";

function Form() {
  const { show, handleEye, eyeOpen, eyeCross,setUser} = useContext(DataContext);

  const [isActive, setIsActive] = useState(false);
  const [loginData, setLoginData] = useState({ email:"", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(loginData);
      localStorage.setItem("token", res.token);
      // console.log(res.user);
      // setUser(res.user);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registarUser(registerData);
      localStorage.setItem("token", res.token);
      navigate("/dashboard");
    } catch (err) {
      alert("registration failed");
      console.error(err);
    }
  };


  return (
    <div className="">
      <div className={`container ${isActive ? "active" : ""}`}>
        {/* <!-- login form --> */}
        <div class="form-box login">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <div class="input-box">
              <input
                type="text"
                placeholder="Username"
                required
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
            </div>
            <div class="input-box">
              <input
                type={show?"text":"password"}
                placeholder="password"
                required
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
              <img
                src={show ? eyeOpen : eyeCross}
                onClick={handleEye}
                alt=""
                className="absolute w-6 right-2 top-3.5 cursor-pointer"
              />
            </div>
            <div class="forgot-link">
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit" class="btn">
              login
            </button>
            <p>or login with social platforms</p>
            <div class="social-icons flex justify-center items-center gap-8">
              <Link className=" shadow border border-gray-200 px-10 py-2">
                <img src={goggle} alt="" className="w-10" />
              </Link>
              <Link className=" shadow border border-gray-200 px-10 py-2">
                <img src={facebook} alt="" className="w-10" />
              </Link>
            </div>
          </form>
        </div>
        {/* <!--Registration--> */}
        <div class="form-box register">
          <form onSubmit={handleRegister}>
            <h1>Registration</h1>
            <div class="input-box">
              <input
                type="text"
                placeholder="Username"
                required
                onChange={(e) =>
                  setRegisterData({ ...registerData, username: e.target.value })
                }
              />
            </div>
            <div class="input-box">
              <input
                type="gmail"
                placeholder="Email"
                required
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
              />
            </div>
            <div className="input-box relative">
              <input
                type={show ? "text" : "password"}
                placeholder="password"
                required
                className="relative"
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
              />
              <img
                src={show ? eyeOpen : eyeCross}
                onClick={handleEye}
                alt=""
                className="absolute w-6 right-2 top-3.5 cursor-pointer"
              />
            </div>
            <button type="submit" class="btn">
              Register
            </button>
            <p>or Register with social platforms</p>
            <div class="social-icons flex justify-center items-center gap-10">
              <Link className=" shadow border border-gray-200 px-10 py-2">
                <img src={goggle} alt="" className="w-10" />
              </Link>
              <Link className=" shadow border border-gray-200 px-10 py-2">
                <img src={facebook} alt="" className="w-10" />
              </Link>
            </div>
          </form>
        </div>

        {/* <!--toggle--> */}
        <div class="toggle-box">
          <div class="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button class="btn register-btn" onClick={() => setIsActive(true)}>
              Register
            </button>
          </div>
          <div class="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button
              class="btn login-btn text-2xl"
              onClick={() => setIsActive(false)}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
