const  express = require('express');
const app = express();
const env = require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const {Server} = require('socket.io');


app.use(express.json())
 app.use(cors());
 app.use(cookieParser());


 //weSocketServer
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: "*",
      
    }
});

const users = new Map();

io.on('connection', (socket) => {
    console.log("user is connected " + socket.id);
    socket.on("register", (user) => {
        users.set(user,socket.id);
        console.log("User registered: " + user +  " " + socket.id);
    })
    socket.on("message", (message) =>{
        console.log("send message: " + message.message +" to : " + message.sendTo);

        const sendToSocketId = users.get(message.sendTo);
        if(sendToSocketId){
        io.to(sendToSocketId).emit('sendMsg', message.message);
        console.log("sent to : " + sendToSocketId)
        }
    })

    socket.on("disconnect", () => {
        console.log("user disconnected " + socket);
    })
 

})


app.use('/api/', require('./Routes/Router'))
app.use('/friends/', require('./Routes/FriendsRoute'))
app.use('/msg/', require('./Routes/MessageRoute'))


server.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})