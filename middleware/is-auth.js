const User = require("../models/user")
const jwt = require("jsonwebtoken");
require("dotenv").config()


module.exports = async(req,res,next)=>{
    
    const {authorization} = req.headers;
    const [authType, authToken] = authorization.split(" ");
   
    
    if(authType !== "Bearer" || !authToken){
        return res.status(401).json({errormessage : "로그인후 사용이 가능한 API입니다"})
    }
    try{
        const userid =  jwt.verify(authToken, process.env.SECRETKEY)
        
        res.locals.user=  String(userid.id).trim()
        next();
   
    }
    catch(err){
        console.log(err);
        return res.status(401).json({errormessage : "로그인 후 사용이 가능한 API입니다"})
    }
}