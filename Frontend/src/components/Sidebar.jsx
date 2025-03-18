import React from 'react'
import OtherUsers from './OtherUsers'

function Sidebar() {
  return (
    <div>
      <form action="" className='flex items-center gap-2'>
        <input type="search" placeholder="Search.." className="w-full input input-bordered rounded-md  p-2 border-b-2 border-gray-400 focus:outline-none " />
      </form>
      <div className='divider px-3'></div>
      <OtherUsers/>
      <div className='divider px-3'></div>
      <div className='flex justify-end mt-2'>
        <button className='btn btn-small float-right bg-red-500 hover:bg-red-700 text-white'>Logout</button>
      </div>
    </div>
  )
}

export default Sidebar
