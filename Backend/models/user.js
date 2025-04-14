const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const { Schema, model } = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.error('Connection error:', err));



const userSchema = new Schema({
     username:{
      type:String,
      required:true,
     },
     email:{
      type:String,
      required:true,
      unique:true,
     },
     password:{
      type:String,
      required:true,
      },


}, { timestamps: true });

const User = model("user", userSchema); // ✅ First argument is the model name
module.exports = User;
