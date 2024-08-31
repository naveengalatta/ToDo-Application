const ToDo = require("../model/ToDo.js");

exports.ToDoService = {
    getAllToDoService: function (req, res) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await ToDo.findAll());
            } catch (err) {
                reject(err);
            }
        });
    },
    getByIdToDoService: function (req, res) {
        return new Promise(async (resolve, reject) => {
            try {
                var todo = await ToDo.findByPk(req.params.id);
                if (!todo) throw { message: "Data not found" };
                resolve(todo);
            } catch (error) {
                reject(error.message || error);
            }
        });
    },
    createToDoService: function (req, res) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!req.body.title) throw { message: "Mandatory field title" };
                resolve(
                    await ToDo.create({
                        title: req.body.title,
                        description: req.body.description,
                    })
                );
            } catch (error) {
                reject(error.message || error);
            }
        });
    },
    updateByIdTodoService: function (req, res) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!req.body.id) throw { message: "Mandatory field id" };
                if (!req.body.title) throw { message: "Mandatory field title" };
                var todo = await ToDo.findByPk(req.body.id);
                if (!todo) throw { message: "Data not found" };
                resolve(
                    await todo.update({
                        title: req.body.title,
                        description: req.body.description,
                    })
                );
            } catch (error) {
                reject(error.message || error);
            }
        });
    },
    deleteByIdToDoService: function (req, res) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!req.body.id) throw { message: "Mandatory field id" };
                var todo = await ToDo.findByPk(req.body.id);
                if (!todo) throw { message: "Data not found" };
                resolve(await todo.destroy());
            } catch (error) {
                reject(error.message || error);
            }
        });
    }
};
