import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navbar } from './Components/Navbar'

import { Avatar } from './Components/Avatar';
import { ChatArea } from './Components/ChatArea'
import {BrowserRouter, Route,Routes, Link} from 'react-router-dom';
import { Login } from './Components/Login';
import { ContextProvider } from './Components/Context'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <div className=''>
      <ContextProvider>
        <Routes>
      
          <Route path='/' element = {<Login/>}></Route>
          <Route path='/user/:email' element = {
            <div>
            
              <Navbar/>
               
            
            </div>
            
          } />
            <Route path='/user/avatar' element={<Avatar />} />
          
          </Routes> 
        </ContextProvider>
        


        
      </div>
     </BrowserRouter>
    </>
  )
}

export default App
