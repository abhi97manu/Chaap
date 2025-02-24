const express = require('express');
const Friends = require('../Model/Friends');
const User = require('../Model/User');
const router = express.Router();

router.route('/friend-list').post( async (req, res) => {
    try {
        const newFriend = new Friends({
            name : req.body.name,
            prPic : "/src/assets/profilePic.jpg",
        })
        await newFriend.save().then(() => console.log("created user sucessfully")).catch(err => console.error("creation failed",err.message));
      

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Friend List no reachable');
    }

})


router.route("/user/:email/friends").get(async (req, res) =>{
    try{
        const user = await User.findOne({email : req.params.email}).populate("friends","name prPic").exec();
     //console.log(user);
            if(!user){
            // console.log(user);
                res.status(404).send('Friends details not found');
            }
            const friends = await User.findOne({email : req.params.email}).populate("friends", "username");
            console.log(friends.friends);
            res.send(friends.friends);
        }
    catch(err){
        res.status(500).send('Server Error');
    }
})


module.exports = router;