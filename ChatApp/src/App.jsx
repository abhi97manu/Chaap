import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navbar } from './Components/Navbar'
import { FriendsList } from './Components/FriendsList'
import { Avatar } from './Components/Avatar';
import { ChatArea } from './Components/ChatArea'
import {BrowserRouter, Route,Routes, Link} from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <div className='m-4'>
      <Navbar/>
      <Routes>
        <Route path='/' element = {
      <div className='flex w-full h-screen'>
          <FriendsList/>
          <ChatArea/>
      </div>
        } />
         <Route path='/avatar' element={<Avatar />} />
        </Routes>
      </div>
     </BrowserRouter>
    </>
  )
}

export default App
