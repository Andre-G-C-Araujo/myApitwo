const { Router } = require("express");

const MoviesTagsController = require("../Controller/MoviesTagsController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const moviesTagsController = new MoviesTagsController();

const moviesTagsRoutes = Router();

moviesTagsRoutes.get("/", ensureAuthenticated, moviesTagsController.index);

// moviesTagsRoutes.get("/:id", moviesTagsController.index);

module.exports = moviesTagsRoutes;
