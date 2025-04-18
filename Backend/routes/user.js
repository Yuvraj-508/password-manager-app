const express = require("express")

const router=express.Router();
const {handleDashboard,handleRegister,handleLogin} = require('../controllers/userHandler')

router.post('/login',handleLogin);
router.post('/register',handleRegister);

module.exports=router;
