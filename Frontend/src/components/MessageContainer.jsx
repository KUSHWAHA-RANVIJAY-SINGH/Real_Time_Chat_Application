import React from 'react';
import SendInput from './SendInput';
import Messages from './Messages';

function MessageContainer() {
  return (
     <>
      <div className='md:min-w-[550px] flex flex-col'>
                        <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
                            <div className={`avatar online`}>
                                <div className='w-12 rounded-full'>
                                    <img src="https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?rs=1&pid=ImgDetMain" alt="user-profile" />
                                </div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-between gap-2'>
                                    <p>Ranvijay</p>
                                </div>
                            </div>
                        </div>
                        <Messages/>
                        <SendInput/>
      </div>
     </>
  );
}

export default MessageContainer;
