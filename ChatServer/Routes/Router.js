const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Model/User');
const bcrypt = require('bcrypt');
const Messages = require('../Model/Messagesdb');
const router = express.Router();


router.route("/login").post(async (req, res) =>{
    try{
     
        const users =  await User.findOne({ email: req.body.email})
     
        if (!users) {
            return res.status(500).json({ error: "User not found" });
        }
    
         bcrypt.compare(req.body.password, users.password, (err, result) =>{
             if(result){
                let token = jwt.sign({email:users.email, userId: users._id}, "sarkar")
               // res.cookie("token",token);
                 console.log(token)    
                 res.status(201).send({ success: true, token });
             }else{
                res.status(500).json({ msg: "Auth notdone" });
             console.log("User authentication failed");
             }
         })
      
        
    }
           
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});
router.route("/signUp").post( async (req, res) =>{

    try{
        bcrypt.genSalt(10, (err, salt) =>{
            bcrypt.hash(req.body.password, salt, async (err, hash) => {
                const user = new User({
                    username : req.body.username,
                    password : hash,
                    email : req.body.email,
                    
                })
              
                await user.save().then(() => console.log("created user sucessfully")).catch(err => console.error("creation failed",err.message));
      
                res.status(201).json(user);

              });
             
          })
    
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  
   // console.log(req.body)
});


router.route("/user/:email").get( async(req, res) =>{
   
    try{
        const user = await User.findOne({email : req.params.email})
       //console.log(user);
        if(!user){
            res.status(404).send('User details not found');
        }
      
        res.send(user);
    }
    catch(err){
        res.status(500).send('Server Error');
    }
})

router.route("/user/:email").patch(async (req, res) =>{
    try{
    const updatedUser = await User.findOneAndUpdate(
         {email:req.params.email},
        {$push: {friends: req.body.friends}},
        {new: true})
        res.json(updatedUser);
    }catch (error) {
        res.status(500).json({ error: error });
    }
});
 


module.exports = router;