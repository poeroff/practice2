const express = require("express");

const router = express.Router();
const bcrypt = require("bcryptjs")

const logincontroller = require("../controller/login");
const {check,body} =require("express-validator");
const User = require("../models/user")


router.post("/signup",[check("email").isEmail().withMessage("PLEASE ENTER A VALID EMAIL").custom((value,{req})=>{
    return  User.findOne({ where: { email: value } }).then(user=>{
        console.log(user)
        if(user){
            return Promise.reject("EMAIL exists already")
        }
    })
}), 
body("password","Please enter a password with only numbers and text ant at least 5characters").isLength({min:5}).isAlphanumeric().trim(),
body("checkpassword").trim().custom((value, {req})=>{
    if(value !== req.body.password){
        throw new Error("password have to match")
    }
    return true;
})
],logincontroller.postsignup)

router.post("/login",[check("email").isEmail().withMessage("PLEASE ENTER A VALID EMAIL").custom((value,{req})=>{
    return  User.findOne({ where: { email: value } }).then(user=>{
        if(!user){
            console.log("NOT")
            return Promise.reject("EMAIL NOT MATCH") 
        }
    })
}),body("password").isAlphanumeric().custom(async(value,{req})=>{
    const email = req.body.email
    const find = await User.findOne({where : {email:email}})
    const match = await bcrypt.compare( value,find.password)
   if(!match){
        return Promise.reject("Password NOT MATCH")
   }
    
})],logincontroller.postLogin)


router.post("/users/me",logincontroller.authmiddleware)

module.exports = router;