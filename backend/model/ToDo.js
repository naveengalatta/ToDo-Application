const Sequelize = require("sequelize");
const sequelize = require("../util/Database.js");

const ToDo = sequelize.define("todo",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            required: true,
            type: Sequelize.STRING
        },
        description: Sequelize.STRING
    },
    {
        timestamps: true,
        freezeTableName: true,
    }
);

module.exports = ToDo;
