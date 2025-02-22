import { events } from '@react-three/fiber';
import React, { useEffect, useState } from 'react'

export const ChatArea = ({socket}) => {

  const [text, setText] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [sentMsg, setSentMsg] = useState([]);
  const [recievedMsg, setRecievedMsg] = useState([]);

 const typeMessage = (e) => {
      e.preventDefault();
      setText(e.target.value);
  }

  const sendMessage = () => {
   setIsSent(true);
    console.log(text);
    setSentMsg(text);
    socket.emit("message",text)
    setText("");
  }

  useEffect(() =>{
    if(!socket) return
    socket.on("message", (msg) => {
     // console.log("revieved" + msg);
      //setRecievedMsg(msg);
    })
    
  },[recievedMsg])



  useEffect(() =>{

    const fetchMessage = (async (req,res) =>{

      let recId = "234"
      let sendId = "1234"
      try{
        const response = await fetch(`http://localhost:5001/msg/fetch-message/${sendId}/${recId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if(response.ok){
          const data = await response.json();
        //  console.log(data.message[0]);
          setRecievedMsg(data.message);
          console.log(recievedMsg)
        }
      }
      catch(err){
        console.log(err);
      }

    }) 
    fetchMessage()
  },[]);


  return (
    <div className='w-2/3  '>

              
        <div className=' content-end relative border-4 h-5/6 rounded-3xl overflow-auto '>
         {isSent &&
            <>
            <div>
                <div className='  m-3 w-fit p-2 bg-green-300 rounded-lg'>
                  <p>{sentMsg}</p>
                </div>
            </div>
            <hr></hr>
            {
              recievedMsg.map((msg, index) => (
            
                <div key ={index}  className='flex justify-end'>
                <div className='  m-3 w-fit p-2 bg-green-300 rounded-lg'>
                  <p>{msg.messageSet}</p>
                </div>
            </div>
              ))  // end of map
            }
          
           
            
          </>}

            
            <div className='w-11/12   flex gap-2 justify-between'>
                <input type='text' value = {text} onChange={typeMessage} placeholder='Type Message' className='w-full h-12 border-2 rounded-xl p-2 border-red-200 m-2'></input>
                <button onClick={sendMessage}>send</button>
            </div>
        </div>

       
      
    </div>
  )
}
