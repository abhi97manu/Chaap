const express = require('express');
const messdb = require('../Model/Messagesdb');
const router = express.Router();


router.route('/send-message').post(async (req, res) => {

    try{
        const {senderID, recieverID,messageSet} = req.body;

      let messageCollection = await messdb.findOne({senderID,recieverID})

      if(!messageCollection){
         messageCollection = new messdb ({
            senderID ,
            recieverID ,
            message : [],
            timestamp : Date.now()
        })
             }
      
        messageCollection.message.push({
                messageSet,
                timestamp : new Date()
            })
            console.log("Sent message")
       await messageCollection.save();
        

    }catch(err){
        console.error(err);
        res.status(500).send('Error in sending message');
    }
})


router.route('/fetch-message/:sendId/:recId').get(async (req, res) => {
    try{
            const reciever = await messdb.findOne({senderID:req.params.sendId,recieverID : req.params.recId})

            if(!reciever){
                return res.status(404).send('No messages found');
            }
            console.log("Reciever ", reciever.message);
           res.send(reciever);
    }
    catch(err){
        console.error(err);
        res.status(500).send('Error in fetching message');
    }
})
    

module.exports = router