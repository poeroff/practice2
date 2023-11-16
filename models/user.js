const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const bcrypt = require("bcryptjs")

const User = sequelize.define("user", {
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nickname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    hooks: {
        beforeCreate: async (user) => {  //beforeCreate , beforeUpdate, beforeDestroy 
            // 비밀번호를 데이터베이스에 저장하기 전에 해싱
            const hashedPassword = await bcrypt.hash(user.password, 12);
            user.password = hashedPassword;
           
        },
    },
});
module.exports = User;