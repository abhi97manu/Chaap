const  express = require('express')
const app = express();
const env = require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(express.json())
 

app.use(("/api/dashboard"), require("./Routes/Router"))


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})