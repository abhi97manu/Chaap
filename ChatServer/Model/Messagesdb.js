const db = require('../db/db.js')


const msgSchema = new db.Schema({
    senderID: {type: String, required: true,},
    recieverID: {type: String, required: true},
    message: [
        {
        messageSet: {type: String, required: true},
        timestamp: {type: Date ,required: true,default: Date.now}
        
         }
    ],
    timestamp : {type: Date, required: true,default: Date.now}
   
});

module.exports = db.model('Messages',msgSchema);