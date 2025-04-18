const express = require("express")

const router=express.Router();

const {handlePassDelete,handlePassGetReq,handlePassPostReq,handlePassUpdate} =require("../controllers/dataHandlers")

router.post('/',handlePassPostReq)
router.get('/',handlePassGetReq)
router.put('/:id',handlePassUpdate)
router.delete('/:id',handlePassDelete)


module.exports=router