import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:4000/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res.data.success) {
        navigate('/');
        toast.success('Login successfully');
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
         style={{ backgroundImage: "url('/assets/patrick-tomasso-QMDap1TAu0g-unsplash.jpg')" }}>
      
      <div className="w-full max-w-md p-6 rounded-xl shadow-2xl shadow-gray-900 bg-gray-900 bg-opacity-50 backdrop-blur-lg border border-gray-700">
        <h1 className="text-3xl font-bold text-white text-center mb-4">Login</h1>
        
        <form onSubmit={handlesubmit} className="flex flex-col">
          <div className="mb-4">
            <label className="text-white font-semibold">Username:</label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full p-3 bg-transparent border border-gray-400 text-white rounded-md focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="text-white font-semibold">Password:</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full p-3 bg-transparent border border-gray-400 text-white rounded-md focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition duration-300">Login</button>
        </form>

        <p className="text-gray-300 text-center mt-3">
          Don't have an account? <Link to="/signup" className="text-blue-400 underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
