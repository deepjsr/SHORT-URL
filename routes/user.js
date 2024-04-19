const express=require("express");
// const { v4: uuidv4 } = require('uuid');
const {handelUserSignUp,handelUserLogin}=require('../controllers/user')
const router= express.Router();
router.post('/',handelUserSignUp),
router.post('/login',handelUserLogin),
module.exports=router;