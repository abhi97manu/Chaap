import { events } from '@react-three/fiber';
import React, { useEffect, useState } from 'react'

export const ChatArea = ({socket,openChat, userId}) => {

  const [text, setText] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [sentMsg, setSentMsg] = useState([]);
  const [recievedMsg, setRecievedMsg] = useState([]);
  const [allMsg, setAllMsg] = useState([]);
  

 const typeMessage = (e) => {
      e.preventDefault();
      setText(e.target.value);
  }

  const sendMessage = () => {
    setIsSent(true);
   // setSentMsg([...sentMsg,text]);

    setAllMsg((prev) => [...allMsg, {messageSet: text, sender: "me"}]);
    
    socket.emit("message",{sendTo: openChat, message: text})
    //allMsg.map((msg)=> {console.log(msg.messageSet)})
    console.log(allMsg)
    storeMessages();
    setText("");
    
  }



 

    
 const storeMessages = async () =>{
  //console.log("userId " + userId );
   try {
    const data = await fetch(`http://localhost:5001/msg/send-message`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        senderID: userId,
        recieverID: openChat,
       messageSet: allMsg,
      })

    })
    if(!data){
      console.log("Error fetching data");
      return;
    }
   }
   catch(err){
    console.log(err);
   }
 }

 
 if(!socket) {
  console.log(openChat)
  storeMessages();
    return}
 socket.on("sendMsg",  (msg) => {
 
 // setRecievedMsg([...recievedMsg,msg]);
  setAllMsg((prev) =>[...allMsg, {messageSet: msg, sender: msg.sender}]);
 

})


  // useEffect(() =>{
  //   const fetchMessage = (async () =>{
     
  //     try{
  //       const response = await fetch(`http://localhost:5001/msg/fetch-message/${userId}/${openChat}`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //       });
  //       if(response.ok){
  //         const data = await response.json();
  //         console.log(data.message[0]);
  //        // setRecievedMsg(data.message);
  //         //console.log(recievedMsg)
  //       }
  //     }
  //     catch(err){
  //       console.log(err);
  //     }
    
  //   })
  //   fetchMessage()
  //  // storeMessages()
  // },[]);


  return (
    <div className='w-2/3  '>
         
        <div className=' content-end relative border-4 h-5/6 rounded-3xl overflow-auto '>
      
                 {(openChat!==undefined) && (<div className='flex flex-col'>{
                   allMsg.map((msg, index) => ( 
                  
                     <div key={index} className={`m-3 w-fit p-2 ${msg.sender === "me" ? "bg-green-300 self-end" : "bg-blue-300 self-start"}  rounded-lg`}>
                      <p>{msg.messageSet}</p>
                    </div>
                )  ) }
                
               
                   
                </div> 
               
              )}
            <div className='w-11/12 flex gap-2 justify-between'>
                <input type='text' value = {text} onChange={typeMessage} placeholder='Type Message' className='w-full h-12 border-2 rounded-xl p-2 border-red-200 m-2'></input>
                <button onClick={sendMessage}>send</button>
            </div>
        </div>

    </div>
  )
}
