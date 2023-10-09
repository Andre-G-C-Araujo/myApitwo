const { Router } = require("express");

const usersRouter = require("./users.routes");
const moviesRoutes = require("./moviesNotes.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/movies_notes", moviesRoutes);

module.exports = routes;
