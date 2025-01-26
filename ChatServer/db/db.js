const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/ChatApp", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {console.log('connected to database')})
.catch(err => console.error('connection err',err));

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully!');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected!');
  });
//Create Schema

module.exports = mongoose;

