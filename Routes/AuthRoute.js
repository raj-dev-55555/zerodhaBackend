const { Signup, Login } = require('../Controllers/AuthController')
const {userVerification} = require("../Middlewares/AuthMiddleware")
const router = require('express').Router()

router.post('/signup', Signup)
router.post('/login', Login)
router.post('/verify',userVerification)

router.post('/logout',(req,res)=>{
    res.cookie("token","",{expires:new Date(0)});
    res.json({success:true});
})

module.exports = router