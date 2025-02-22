import {io} from "socket.io-client";


let socket = null;
const connectSocket = () =>{

    if(!socket){
        socket = io(`http://localhost:5001`);
        socket.on('connect', () => {
            console.log('Connected to the server');
        });
       // console.log(socket);
    }
    return socket;
    
 }
 const disconnectSocket = () =>{
    if(socket){
        socket.disconnect();
        socket = null;
    }
    return;
 }

 export {connectSocket, disconnectSocket}