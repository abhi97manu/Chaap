import { events } from '@react-three/fiber';
import React, { useState } from 'react'

export const ChatArea = () => {

  const [text, setText] = useState("");
  const [isSent, setIsSent] = useState(false);


 const typeMessage = (e) => {
      e.preventDefault();
      setText(e.target.value);
  }

  const sendMessage = () => {
    setIsSent(true);
  }


  return (
    <div className='w-2/3  '>

        <div className='flex gap-4 justify-end p-10'>
            <button className='border-2 rounded-xl px-2'>Clear Chat</button>
            <button className='border-2 rounded-xl px-2'> More</button >
        </div>
        
        <div className=' content-end relative border-4 h-5/6 rounded-3xl overflow-auto '>
         {isSent &&
            <>
            <div className='  m-3 w-fit p-2 bg-green-300 rounded-lg'>
              <p>{text}</p>
            </div>
            <div className='  m-3 w-fit p-2 bg-green-300 rounded-lg'>
              <p>{text} 2</p>
            </div>
            <div className='  m-3 w-fit p-2 bg-green-300 rounded-lg'>
              <p>{text} 3</p>
            </div>
            
          </>}

            
            <div className='w-11/12   flex gap-2 justify-between'>
                <input type='text' onChange={typeMessage} placeholder='Type Message' className='w-full h-12 border-2 rounded-xl p-2 border-red-200 m-2'></input>
                <button onClick={sendMessage}>send</button>
            </div>
        </div>

       
      
    </div>
  )
}
