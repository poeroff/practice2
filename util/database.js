const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize("node", "root", process.env.DBPASSWORD, {
  dialect: "mysql",
  host: "127.0.0.1",
});

module.exports = sequelize;
