const Product = require("../models/product");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { validationResult } = require("express-validator");
const { proppatch } = require("../routes/product");

exports.postcreate = async (req, res, next) => {
  const condition = "FOR SALE";
  const { title, content } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }

  await Product.create({
    title: title,
    content: content,
    userId: res.locals.user,
    condition,
  });
  return res.status(200).json({ message: "sucess" });
};

exports.postupdate = async (req, res, next) => {
  const { title, content, condition } = req.body;
  
  const { productId } = req.params;
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(422).json({ error: error.array()[0].msg });
  }
    const result = await Product.findOne({ where: { productId: productId ,userId : res.locals.user } });
    if (result) {
      await result.update(
        { title: title, content: content, condition: condition }
      );
      return res.status(200).json({ message: "success" });
    }
    return res.status(403).json({ errorMessage: "상품 조회에 실패하였습니다" });
  
};

exports.postDelete = async (req, res, next) => {
  
  const { productId } = req.params;
  
    const result = await Product.findOne({ where: { productId: productId ,userId : res.locals.user} });
    if (result) {
      await result.destroy();
      return res.status(200).json({ message: "success" });
    }
    return res.status(403).json({ errorMessage: "상품 조회에 실패하였습니다" });
  
};

exports.productsearch = async (req, res, next) => {
  
  const result = await Product.findAll({
    where: { userId: res.locals.user },
    order: [["createdAt", "DESC"]],
    include: { model: User, as: "userinfo", attributes: ["nickname"] },
  });
  return res.status(200).json({ result: result });
};
exports.getdetail = async (req, res, next) => {
  const { detail } = req.params;
  const result = await Product.findOne({
    where: { userId: res.locals.user, productId: detail },
    include: { model: User, as: "userinfo", attributes: ["nickname"] },
  });
  if (!result) {
    return res
      .status(422)
      .json({ errorMessage: "요청하신 상품을 찾을수 없습니다." });
  }
  return res.status(200).json({ result: result });
};
