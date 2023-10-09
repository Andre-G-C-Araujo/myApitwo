const { Router } = require("express");
const usersRoutes = Router();

const UsersController = require("../Controller/UserController");

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);

module.exports = usersRoutes;
