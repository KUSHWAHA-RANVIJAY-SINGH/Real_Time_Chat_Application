import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '../main';

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res.data.success) {
        navigate("/");
        toast.success('Login successfully');
        dispatch(setAuthUser(res.data));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
    setUser({
      username: "",
      password: ""
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
         style={{ backgroundImage: "url('/assets/patrick-tomasso-QMDap1TAu0g-unsplash.jpg')" }}>
      
      <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
        
        <form onSubmit={onSubmitHandler} className="flex flex-col">
          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Username"
            />
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Password"
            />
          </div>

          <p className="text-center my-2">
            Don't have an account? <Link to="/signup" className="text-blue-400 underline">Sign up</Link>
          </p>

          <div>
            <button type="submit" className="btn btn-block btn-sm mt-2 border border-slate-700">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;