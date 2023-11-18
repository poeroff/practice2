const Sequelize = require("sequelize");

const seauelize = require("../util/database");
const User = require("./user");

const product = seauelize.define("product", {
  productId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  condition: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

product.belongsTo(User, { foreignKey: "userId", as: "userinfo" });

module.exports = product;
