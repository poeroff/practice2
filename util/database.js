const Sequelize = require("sequelize");
require("dotenv").config()

const sequelize = new Sequelize("node","root",process.env.DBPASSWORD,{
    dialect : "mysql",
    host : "localhost"
})

module.exports = sequelize;