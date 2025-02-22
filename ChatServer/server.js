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



io.on('connection', (socket) => {
    console.log("user is connected " + socket.id);
    socket.on("message", (message) =>{
        console.log("Received message: " + message);
        io.emit('message', message);
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