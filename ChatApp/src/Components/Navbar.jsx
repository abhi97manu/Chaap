import React, { useContext, useEffect, useState } from 'react'
import { Avatar } from './Avatar.jsx';
import {Link, useParams} from 'react-router-dom';
import { Context } from './Context.jsx';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {

 const navigate = useNavigate();


  const [userName, setuserName] = useState("");
  
 const {email} = useParams();
 const {setIsLoggedIn, isLoggedIn} = useContext(Context)
//console.log(email);


useEffect(() => {

    let browserToken = localStorage.getItem('token');
    if(!browserToken){
        console.error("No token found")
        setIsLoggedIn(false);
        navigate(`/`);
        return;
    }
    const fetchUsers = async () => {
      try{
        const resp = await fetch(`http://localhost:5001/api/user/${email}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
        },
        
        
        }); 
        
        const data = await resp.json();
        if(resp.ok) {
           setuserName(data.username);
        //   console.log(data.friends);
       }
        else{
          //  setMessage('Invalid Credentials', 'red', data.error)
    }

      }
      catch(err){
        console.error(err.message);
      }
      
    }
    fetchUsers();
  },[isLoggedIn]);
 
 
 


  const Logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate(`/`)
    //window.location.href = '/';
  }
 
   
  return (
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
  )
}
