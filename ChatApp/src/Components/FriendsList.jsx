import React from 'react'
import { Friends } from './Friends'

export const FriendsList = () => {
  return (
    <div className='w-1/3'>
        <div className='p-10'>
            <input type = "search" placeholder = "search" className='border-2 rounded-xl  px-2 border-zinc-600'></input>
            <input type = "submit" ></input>
        </div>

        <div className=' border-4 h-5/6 rounded-3xl '>
        <Friends/>
        <Friends/>
        <Friends/>
        <Friends/>

        </div>
    </div>
  )
}
