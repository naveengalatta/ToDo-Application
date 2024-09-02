const { ToDoService } = require("../service/ToDoService.js");

exports.ToDoController = {
    init: (todoRouter) => {

        todoRouter.get("/", (req, res) => returnResponse(req, res, ToDoService.getAllToDoService(req, res)));
        todoRouter.get("/:id", (req, res) => returnResponse(req, res, ToDoService.getByIdToDoService(req, res)));
        todoRouter.post("/", (req, res) => returnResponse(req, res, ToDoService.createToDoService(req, res)));
        todoRouter.put("/", (req, res) => returnResponse(req, res, ToDoService.updateByIdTodoService(req, res)));
        todoRouter.delete("/:id", (req, res) => returnResponse(req, res, ToDoService.deleteByIdToDoService(req, res)));

        return todoRouter;
    }

}