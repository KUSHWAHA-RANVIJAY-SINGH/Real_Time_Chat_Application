import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirm_password: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!user.fullname) errors.fullname = "Full Name is required";
    if (!user.username) errors.username = "Username is required";
    if (!user.password) errors.password = "Password is required";
    else if (!passwordRegex.test(user.password)) errors.password = "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character";
    if (user.password !== user.confirm_password) errors.confirm_password = "Passwords do not match";
    if (!user.gender) errors.gender = "Gender is required";

    return errors;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post(`http://localhost:4000/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      console.error("Error during registration:", error);
    }

    setUser({
      fullname: "",
      username: "",
      password: "",
      confirm_password: "",
      gender: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
         style={{ backgroundImage: "url('/assets/patrick-tomasso-QMDap1TAu0g-unsplash.jpg')" }}>
      
      <div className="w-full max-w-md p-6 rounded-xl shadow-2xl shadow-gray-900 bg-gray-900 bg-opacity-50 backdrop-blur-lg border border-gray-700">
        <h1 className="text-3xl font-bold text-white text-center mb-4">Signup</h1>

        <form onSubmit={onSubmitHandler} className="flex flex-col">
          <div className="mb-4">
            <label className="text-white font-semibold">Full Name</label>
            <input
              type="text"
              placeholder="Enter Full Name"
              value={user.fullname}
              onChange={(e) => {
                setUser({ ...user, fullname: e.target.value });
                setErrors({ ...errors, fullname: "" });
              }}
              className="w-full p-3 bg-transparent border border-gray-400 text-white rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.fullname && <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>}
          </div>

          <div className="mb-4">
            <label className="text-white font-semibold">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              value={user.username}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
                setErrors({ ...errors, username: "" });
              }}
              className="w-full p-3 bg-transparent border border-gray-400 text-white rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>

          <div className="mb-4">
            <label className="text-white font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
                setErrors({ ...errors, password: "" });
              }}
              className="w-full p-3 bg-transparent border border-gray-400 text-white rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 break-words">{errors.password}</p>}
          </div>

          <div className="mb-4">
            <label className="text-white font-semibold">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={user.confirm_password}
              onChange={(e) => {
                setUser({ ...user, confirm_password: e.target.value });
                setErrors({ ...errors, confirm_password: "" });
              }}
              className="w-full p-3 bg-transparent border border-gray-400 text-white rounded-md focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirm_password && <p className="text-red-500 text-xs mt-1">{errors.confirm_password}</p>}
          </div>

          <div className="mb-4">
            <label className="text-white font-semibold">Gender</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={user.gender === "male"}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={user.gender === "female"}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  className="mr-2"
                />
                Female
              </label>
            </div>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>

          <p className="text-gray-300 text-center my-2">
            Already have an account? <Link to="/login" className="text-blue-400 underline">Login</Link>
          </p>

          <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition duration-300">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
