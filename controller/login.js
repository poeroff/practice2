const User = require("../models/user");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();
exports.postsignup = async (req, res, next) => {
  const { email, nickname, password, checkpassword } = req.body;
  const error = validationResult(req);
  // await User.create({ email: "", nickname: "", password: "" });
  if (!error.isEmpty()) {
    return res.status(422).json({ error: error.array()[0].msg });
  }

  await User.create({ email: email, nickname: nickname, password: password });
  return res.status(200).json({ email: email, nickname: nickname });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const error = validationResult(req);
  console.log(email, password);

  if (!error.isEmpty()) {
    return res.status(422).json({ error: error.array()[0].msg });
  }

  const userId = await User.findOne({ where: { email: email } });

  console.log(userId.userId);
  const token = jwt.sign(
    { id: userId.userId }, // JWT 데이터
    process.env.SECRETKEY,
    { expiresIn: "12h" }
  );
  return res.status(200).send({ token: "Bearer " + token });
};

exports.authmiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  const [authType, authToken] = authorization.split(" ");
  console.log(authType, authToken);

  if (authType !== "Bearer" || !authToken) {
    return res
      .status(401)
      .json({ errormessage: "로그인후 사용이 가능한 API입니다" });
  }
  try {
    console.log(authToken);
    const userId = jwt.verify(authToken, process.env.SECRETKEY);

    res.locals.user = userId.id;
    console.log(userId.id);
    const finduser = await User.findOne({ where: { userId: res.locals.user } });
    return res
      .status(200)
      .json({ email: finduser.email, nickname: finduser.nickname });
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ errormessage: "로그인 후 사용이 가능한 API입니다" });
  }
};
