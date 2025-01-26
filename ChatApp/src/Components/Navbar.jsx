import React, { useState } from 'react'
import { Avatar } from './Avatar.jsx';
import {Link} from 'react-router-dom';

export const Navbar = () => {

   
  return (
      <div className='flex items-center  justify-between m-4'>
    
        <Link to='/' className="text-4xl font-bold flex-shrink-0">ChatApp</Link>
       
        <div className=" md:flex items-center space-x-20 ">
            <a href='#'>Home</a>
            <a href='#'>Contacts</a>
            <a href='#'>Settings</a>
            <a href='#'>FAQs</a>
            <Link to="/avatar">Avatar</Link>
            
         </div>
         
      
     
    </div>
  )
}
