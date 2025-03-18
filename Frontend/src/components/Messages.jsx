import React from 'react'
import Message from './Message'

function Messages() {
  return (
    <div className='flex-1 overflow-auto px-4'>
      <Message/>
      <Message/>
      <Message/>
    </div>
  )
}

export default Messages