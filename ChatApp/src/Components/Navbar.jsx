import React, { useContext, useEffect, useState } from 'react'

import { ChatArea } from './ChatArea.jsx';
import { Avatar } from './Avatar.jsx';

import {io} from "socket.io-client";
import {connectSocket, disconnectSocket} from "./Socket.jsx"
import {Link, useParams} from 'react-router-dom';
import { Context } from './Context.jsx';
import { useNavigate } from 'react-router-dom';
import {Friends} from './Friends';


export const Navbar = () => {

 const [socketInstance,setSocketInstace] = useState(null);
  const navigate = useNavigate();
  const [userName, setuserName] = useState("");
  const {email} = useParams();
  const {setIsLoggedIn, isLoggedIn} = useContext(Context)
   const[openChat, setOpenChat] = useState()
   const [userId, setUserId] = useState();
//console.log(email);

//setSocketInstace(connectSocket);

useEffect(() => {

 
 
    let browserToken = sessionStorage.getItem('token');
    if(!browserToken){
        console.error("No token found")
        setIsLoggedIn(false);
        navigate(`/`);
        return;
    }
    const fetchUsers = async () => {
      let data = "";
      try{
        const resp = await fetch(`http://localhost:5001/api/user/${email}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
        },
        
        
        }); 
        
         data = await resp.json();
        if(resp.ok) {
           setuserName(data.username);
           setSocketInstace(connectSocket());
        //   console.log(data.friends);
       }
        else{
          //  setMessage('Invalid Credentials', 'red', data.error)
    }

      }
      catch(err){
        console.error(err.message);
      }
      if(socketInstance){
            console.log("socket connected")
            socketInstance.emit("register", data._id)
            setUserId(data._id);
      }
  
  else{
    console.log("socket not connected")
  }
     
      
      
    }
    fetchUsers();
  },[isLoggedIn,socketInstance]);
 
 
 


  const Logout = () => {
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
   disconnectSocket();
  // setSocketInstace(null);
      console.log("User Disconnected");
    
    navigate(`/`)
    //window.location.href = '/';
  }
 
   
  return (
    <>
      <div className='flex items-center  justify-between m-4'>
    
        <Link to='/user' className="text-4xl font-bold flex-shrink-0">{userName}</Link>
       
        <div className=" md:flex items-center space-x-20 ">
            <a href='#'>Home</a>
            <a href='#'>Contacts</a>
            <a href='#'>Settings</a>
            <Link to="/" onClick = {Logout}>logOut</Link>
            <Link to="/avatar">Avatar</Link>
            
         </div>
         
       
     
    </div>


      <div className='flex w-full h-screen'>
    
     
      <Friends setOpenChat = {setOpenChat} openChat = {openChat}/>
      <ChatArea  socket = {socketInstance} openChat = {openChat} userId = {userId}/>
      </div>

      </>
  )
}
