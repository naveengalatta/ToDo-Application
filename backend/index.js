const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/Database.js");
const { ToDoController } = require("./controller/ToDoController.js");

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));

global.returnResponse = (req, res, promise) => {
    res.type("application/json");
    promise
        .then((result) => {
            res.status(200);
            res.json(result);
        })
        .catch((err) => {
            res.status(500);
            res.json(err.message || err);
        });
};

app.use("/todo", ToDoController.init(express.Router()));

sequelize
    .sync({ force: true })
    .then((result) => {
        console.log("DB connection established... ");
        var port = process.env.PORT || 8080;
        app.listen(port);
        console.log("Server started at PORT number - " + port);
    })
    .catch((error) => {
        console.log("Error While DB connection... " + error);
    });
