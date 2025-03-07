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

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
    setErrors({ ...errors, gender: "" });
  }

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
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Submitting user data:", user);
    try {
      const res = await axios.post(`http://localhost:4000/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log("Server response:", res);
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error during registration:", error.response ? error.response.data : error.message);
    }
    setUser({
      fullname: "",
      username: "",
      password: "",
      confirm_password: "",
      gender: "",
    });
  }

  return (
    <div className="min-w-96 mx-auto p-4 sm:p-6 lg:p-8">
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center mb-4'>Signup</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div className='mb-4'>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              value={user.fullname}
              onChange={(e) => {
                setUser({ ...user, fullname: e.target.value });
                setErrors({ ...errors, fullname: "" });
              }}
              className='w-full input input-bordered h-10'
              type="text"
              placeholder='Full Name' />
            {errors.fullname && <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>}
          </div>
          <div className='mb-4'>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
                setErrors({ ...errors, username: "" });
              }}
              className='w-full input input-bordered h-10'
              type="text"
              placeholder='Username' />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>
          <div className='mb-4'>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
                setErrors({ ...errors, password: "" });
              }}
              className='w-full input input-bordered h-10'
              type="password"
              placeholder='Password' />
            {errors.password && <p className="text-red-500 text-xs mt-1 break-words">{errors.password}</p>}
          </div>
          <div className='mb-4'>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              value={user.confirm_password}
              onChange={(e) => {
                setUser({ ...user, confirm_password: e.target.value });
                setErrors({ ...errors, confirm_password: "" });
              }}
              className='w-full input input-bordered h-10'
              type="password"
              placeholder='Confirm Password' />
            {errors.confirm_password && <p className="text-red-500 text-xs mt-1">{errors.confirm_password}</p>}
          </div>
          <div className='flex items-center my-4'>
            <div className='flex items-center mx-2'>
              <p>Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                className="checkbox mx-2" />
            </div>
            <div className='flex items-center mx-2'>
              <p>Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                className="checkbox mx-2" />
            </div>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>
          <p className='text-center my-2'>Already have an account? <Link to="/login" className='text-blue-500 underline'> login </Link></p>
          <div>
            <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'>Signup</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup;