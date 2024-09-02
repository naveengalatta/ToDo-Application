const Sequelize = require("sequelize");

//database, username, password
const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
    dialect: "mysql",
    host: process.env.HOST,
    logging: false
});

module.exports = sequelize;