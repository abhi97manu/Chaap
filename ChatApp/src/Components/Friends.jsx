import React, { useState,useEffect } from 'react'

import { useParams } from 'react-router-dom'
import { ChatArea } from './ChatArea';

export const Friends = ({setOpenChat, openChat}) => {
const [friendName,setfriendName] = useState([])
    const {email} = useParams();
   // const[friendName, setfriendName] = useState([])
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
           
          //console.log(friendName[0].username);
         }
          else{
            //  setMessage('Invalid Credentials', 'red', data.error)
          }
  
      }
      fetchFriends();
    },[])


    const handleOpenChat = (friend) => {
      setOpenChat(friend._id);
      console.log(friend);
    }  
  return (
    <>
    <div className='w-1/3'>


        <div className=' border-4 h-5/6 rounded-3xl p-2'>
    
    { friendName.map((friend,inbex)=>(
      
    <div key = {inbex}  className='m-2 flex items-center justify-between gap-5 border-2 rounded-2xl p-2'>
        <div onClick = {()=>handleOpenChat(friend) } className='flex items-center gap-5'>
            <img src={friend.prPic} className='w-[2rem] border-2 rounded-3xl'></img>
            <div>
                <h4 className='font-bold'>{friend.username}</h4>
                <h6 className='font-light'>Lorem ipsum dolor sit amet.</h6>
             </div>
        </div>
     <span className=''>not</span>
    </div>
    ))
  }
</div>

</div>

 
    </>
  )
}
