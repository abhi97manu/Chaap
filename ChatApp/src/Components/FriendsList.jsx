import React, { useState,useEffect } from 'react'
import { Friends } from './Friends'
import { useParams } from 'react-router-dom'

export const FriendsList = () => {

  


  return (
    <div className='w-1/3'>


        <div className=' border-4 h-5/6 rounded-3xl p-2'>
        
        <Friends/>
       

        </div>
    </div>
  )
}
