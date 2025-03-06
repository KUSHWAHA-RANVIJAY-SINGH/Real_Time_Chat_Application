import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
function Login() {
  const [user,setUser] = useState({
    username:"",
    password:""
  })
  const navigate = useNavigate();

  const handlesubmit =async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:4000/api/v1/user/login`,user,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      });
      console.log(res);
      if (res.data.success) {
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
     toast.error(error.response.data.message);
      console.log(error);
      
    }
    console.log(user);

  }

  return (
    <div className='min-w-96 mx-auto'>
     <div className='h-full w-full bg-green-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-100'>
      <h1 className='text-3xl text-center font-bold'>Login Page</h1>
     <div>
        <form onSubmit={handlesubmit} className='flex flex-col p-2'>
           
            <div>
                <label className='label p-2 text-center'>
                    <span className='label-text text-base font-semibold'>UserName:</span>
                </label>
                <input type="text" placeholder='UserName' className='input input-bordered h-10  w-full ' onChange={(e)=>setUser({...user,username:e.target.value})}/>
            </div>
            <div>
                <label className='label p-2 text-center'>
                    <span className='label-text text-base font-semibold'>Password:</span>
                </label>
                <input type="password" onChange={(e)=>setUser({...user,password:e.target.value})} placeholder='Password' className='input input-bordered h-10  w-full ' />
            </div>
            <button type='submit' className='btn btn-primary w-full'>Login</button>           
        </form>
        <p className='p-2 text-center '>Don't have an account ?
        <Link to={'/signup'}>
          Signup
        </Link>
        </p>
        <div className='p-2 '>
        </div>
     </div>
     </div>
    </div>
  )
}

export default Login