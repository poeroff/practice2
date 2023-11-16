const Sequelize = require("sequelize");

const seauelize = require("../util/database")

const product = seauelize.define("product",{
    productId : {
        type : Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    title : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    content :{
        type : Sequelize.STRING,
        allowNull : false,
    },
  
    condition:{
        type : Sequelize.STRING,
        allowNull: false
    }


})
module.exports = product