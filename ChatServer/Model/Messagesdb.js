const db = require('../db/db.js')


const msgSchema = new db.Schema({
    senderID: {type: String, required: true,},
    recieverID: {type: String, required: true},
    message: {type: String, required: true,unique: true},
    timestamp : {type: Date, required: true}
   
});

module.exports = db.model('Messages',msgSchema);