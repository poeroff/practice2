const Product = require("../models/product")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const {validationResult} = require("express-validator");
const { proppatch } = require("../routes/product");

exports.postcreate = async(req,res,next)=>{
    const condition = "FOR SALE"
    const {title , content} = req.body;
    const errors = validationResult(req);
   
    if(!errors.isEmpty()){
        return res.status(422).json({error : errors.array()[0].msg})
    }

    await Product.create({title : title ,content : content , userId :  res.locals.user  ,condition })
    return res.status(200).json({message :  "sucess"})
}


exports.postupdate  = async(req,res,next)=>{
    const {title,content,condition} = req.body;
    const { update } = req.params;
    const {productId}  = req.params;
    const error = validationResult(req);

   
    if(!error.isEmpty()){
        return res.status(422).json({error : error.array()[0].msg})
    }
// 타입 변환 없이 문자열 비교
    
if (res.locals.user === update) {
    const result = await Product.findOne({where : {productId : productId}})
    if(result){
        await Product.update({title: title,content: content,condition: condition,},{where: {productId: productId , userId : update}});
        return res.status(200).json({ message: "success" })
    }
    return res.status(403).json({ errorMessage: "상품 조회에 실패하였습니다" });
  }
}


exports.postDelete = async(req,res,next)=>{
    const { del } = req.params;
    const {productId}  = req.params;
    if (res.locals.user === del) {
        const result = await Product.findOne({where : {productId : productId}})
        if(result){
            await Product.destroy({where: {productId: productId , userId : del}});
            return res.status(200).json({ message: "success" })
        }
        return res.status(403).json({ errorMessage: "상품 조회에 실패하였습니다" });
      }
}

exports.productsearch = async(req,res,next)=>{

    console.log(res.locals.user)
    const result = await Product.findAll({
        where: { userId: res.locals.user },
        order:[['createdAt' ,"DESC"]],
        include: {model : User , as: 'seller', attributes:["nickname"]},
      });
    return res.status(200).json({result : result})

}
exports.getdetail = async(req,res,next)=>{
    const {detail} = req.params;
    console.log(res.locals.user)
    const result = await Product.findOne({
        where: { userId: res.locals.user ,productId: detail},
        include: {model : User , as: 'seller', attributes:["nickname"]},
      });
    if(!result){
        return res.status(422).json({errorMessage : "요청하신 상품을 찾을수 없습니다."})
    }
      return res.status(200).json({result : result})
}
