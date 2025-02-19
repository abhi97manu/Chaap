import React, { useEffect, useState,useContext } from 'react'
import {Context} from "./Context"
import { useNavigate } from 'react-router-dom';
import { userData } from 'three/tsl';

export const Login = () => {

    const [userName, setUserName] = useState("");
    const [passwrd, setPasswrd] = useState("");
    const [email, setEmail] = useState("");
    const [userEmail, setUserEmail] = useState("");
   
    const navigate = useNavigate();
    const {isLoggedIn, setIsLoggedIn} = useContext(Context);
    

    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log(userName, passwrd, email);
        try{
            const loginData = await fetch('http://localhost:5001/api/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: userName,
                    password: passwrd,
                    email: email,
                  
                })
            })
          
            // if(loginData.ok) {
            //     setMessage(data.username, data.password)
            // }
            // else{
            //     setMessage('Invalid Credentials', 'red', data.error)
            // }
        }
       
        catch( e){
            console.error('Error has occured', e);
        }

        setEmail("");
        setPasswrd("");
        setUserName("");
        // call the API to register the user
        // redirect to the chat app page
    }




    const handleLogin = async (e) => {
        e.preventDefault();
        
        try{
            const loginData = await fetch(`http://localhost:5001/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                 
                },
                    body: JSON.stringify({
                    username: userName,
                    password: passwrd,
                    email: email,
                  
                })
            })
          
             if(loginData.ok) {
                const data = await loginData.json();
                const token = data.token;
                setUserEmail(email);
               
                localStorage.setItem('token', token);
               
                navigate(`/user/${email}`);
            }
             else{
              console.error("Login Data is not fetched correctly")
         }
        }
       
        catch( e){
            console.error('Error has occured while fetching', e);
        }

    
       
    }

// useEffect( () => {
//      async function getUser() {
       
//     try{
//         console.log(isLoggedIn);
//         if(isLoggedIn){
//             const userData = await fetch(`http://localhost:5001/api/user/${email}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
                
//             })
//         if(userData.ok){
//         const data = await userData.json();
//      console.log("fetching")
//         navigate(`/user/${email}`)
//         }
//     else{
//         navigate('/')
//         setIsLoggedIn(false);
//         }
      
    
        
//         }
//         else{
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//     }
//     catch(e){
//         console.error('Error has occured');
//     }
// }
// getUser();
// },[isLoggedIn])
   



  return (
    <div className='bg-gray-300 h-screen flex items-center justify-center ' >
     <div className=' max-w-md p-6 bg-white rounded-2xl shadow-lg'>
        
        <div className='m-2 text-center font-bold'>
            <label>LOGIN TO CHAAP</label>
        </div>
        
         <form  >
            <div>
             <input type="text" value = {userName} onChange={(e) => setUserName(e.target.value)} placeholder='UserName' className=' m-2 border border-gray-400 rounded-lg px-4 py-2 shadow-sm focus:ring-red-500 focus:border-red-700'></input>
            </div>

            <div>
             <input type="password" value={passwrd} onChange={(e) => setPasswrd(e.target.value)} placeholder='Password' className='m-2 border border-gray-400 rounded-lg px-4 py-2 shadow-sm focus:ring-red-500 focus:border-red-700'></input>
            </div>

            <div>
             <input type="email" value= {email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Id' className='m-2 border border-gray-400 rounded-lg px-4 py-2 shadow-sm focus:ring-red-500 focus:border-red-700'></input>
            </div>

            <div>
              <button type='submit' onClick={handleSignUp} className='m-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg shadow-md'>SignUp</button>
            </div>
            
            <div>
              <button type='submit' onClick={ handleLogin}  className='m-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg shadow-md'>Login</button>
            </div>

            
            
         </form>
            
        
     </div> 
           
    </div>
  )
}
