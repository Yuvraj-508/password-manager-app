const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const { Schema, model } = require('mongoose');
const argon2 = require('argon2');

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
      ip:{
        type:String,
      }


}, { timestamps: true });

userSchema.pre('save', async function (next) {
  const user = this;

  // Only hash if password is modified or new
  if (!user.isModified('password')) return next();

  try {
    user.password = await argon2.hash(user.password);
    next();
  } catch (err) {
    next(err);
  }
});


const User = model("user", userSchema); // ✅ First argument is the model name
module.exports = User;
