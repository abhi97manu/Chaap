const mongoose = require('mongoose');
const db = require('../db/db');

const userSchema = new db.Schema({
    username: {type: String, required: true,},
    password: {type: String, required: true},
    email: {type: String, required: true,unique: true},
    friends: [{type : mongoose.Schema.Types.ObjectId, ref : "Friends"}],
    createdAt: {type: Date, default : Date.now}
   
});

module.exports = db.model('User',userSchema);
