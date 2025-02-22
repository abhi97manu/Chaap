import React, { useState,useEffect } from 'react'

import { useParams } from 'react-router-dom'

export const Friends = () => {

    const {email} = useParams();
    const[friendName, setfriendName] = useState([])
    //retrieve friend Lists
  
  useEffect(() =>{
    const fetchFriends = async () => {
     
        const resp = await fetch(`http://localhost:5001/friends/user/${email}/friends`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
        },
     
        }); 
          
        const data = await resp.json();
        if(resp.ok) {
           setfriendName(data);
           
          console.log(data[0].prPic);
         }
          else{
            //  setMessage('Invalid Credentials', 'red', data.error)
          }
  
      }
      fetchFriends();
    },[])
  
  return (
    
    <>
    { friendName.map((friend,inbex)=>(
      
    <div key = {inbex} className='m-2 flex items-center justify-between gap-5 border-2 rounded-2xl p-2'>
        <div className='flex items-center gap-5'>
            <img src={friend.prPic} className='w-[2rem] border-2 rounded-3xl'></img>
            <div>
                <h4 className='font-bold'>{friend.name}</h4>
                <h6 className='font-light'>Lorem ipsum dolor sit amet.</h6>
             </div>
        </div>
     <span className=''>not</span>
    </div>
    ))
  }
    </>
  )
}
