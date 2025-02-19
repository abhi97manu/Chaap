const db = require('../db/db.js')


const friendSchema = new db.Schema({
    name: {type: String, required: true,},
    prPic: {type: String, required: true},
   
   
});

module.exports = db.model('Friends',friendSchema);