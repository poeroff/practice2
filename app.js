const express = require("express");
const flash = require("connect-flash");

const app = express();

const sequelize = require("./util/database");
app.use(express.json());

const User = require("./models/user");
const Product = require("./models/product");

const loginrouter = require("./routes/login");
const productrouter = require("./routes/product");

app.use("/auth", loginrouter);
app.use(productrouter);
app.use(flash());

Product.belongsTo(User, { foreignKey: "userId", as: "userinfo" });

sequelize.sync().then((result) => {
  console.log("5000번 포트에 연결이 성공하였습니다");
  app.listen(5000);
});
