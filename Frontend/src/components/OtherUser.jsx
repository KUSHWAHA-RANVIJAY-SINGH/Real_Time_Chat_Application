import React from 'react'

function OtherUser() {
  return (
    <div>
    <div className='flex gap2 items-center hover:bg-zinc-200 rounded-2xl'>
      <div className='avatar  online'>
      <div className='w-12 rounded-full'>
        <img src="https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?rs=1&pid=ImgDetMain" alt="profile photo" />
      </div>
      </div>
     <div className='flex flex-col flex-1'>
         <div className='flex justify-between  flex-1 ml-2'>
         <p>Ranvijay</p>
      </div>
      </div>
    </div>
    <div className='divider'></div>

  </div>
  )
}

export default OtherUser