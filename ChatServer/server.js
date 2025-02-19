const  express = require('express');
const app = express();
const env = require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json())
 app.use(cors());
 app.use(cookieParser());

app.use('/api/', require('./Routes/Router'))
app.use('/friends/', require('./Routes/FriendsRoute'))


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})