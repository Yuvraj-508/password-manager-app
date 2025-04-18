const express = require("express")
const User = require("../models/user");
const router=express.Router();

router.get('/',async(req,res)=>{
     try {
        const verify = await User.findOne({ email: req.user.email });
        if (!verify) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "Welcome", user:req.user });
      } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
      }
})

router.get('/dashboard',async(req,res)=>{
    res.json({ message: "Welcome, user", user: req.user });
})

module.exports=router;
