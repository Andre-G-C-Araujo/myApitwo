const { Router } = require("express");

const SessionController = require("../Controller/SessionController");
const sessionController = new SessionController();

const sessionRoutes = Router();

sessionRoutes.post("/", sessionController.create);

module.exports = sessionRoutes;
