const express = require('express');
const User = require('../Model/User');
const router = express.Router();


router.route("/").get(async (req, res) =>{
    try{
        const users =  await User.find();
        res.json(users);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }


    res.json({message:"on the dashboard page"});
});
router.route("/").post( async (req, res) =>{

    try{
        const user = new User({
            username : req.body.username,
            password : req.body.password,
            email : req.body.email,
            
        })
        await user.save().then(() => console.log("created user sucessfully")).catch(err => console.error("creation failed",err.message));
        //res.json({message:"User created successfully"});
        res.status(201).json(user);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
   // res.json({message:"on the dashboard page POST"});
   // console.log(req.body)
});

router.route("/:id").put((req, res) =>{
    res.json({message:`on the dashboard page of user ${req.params.id}`});
});
 
module.exports = router;