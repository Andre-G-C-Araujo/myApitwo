const { Router } = require("express");

const MoviesTagsController = require("../Controller/MoviesTagsController");

const moviesTagsController = new MoviesTagsController();

const moviesTagsRoutes = Router();

moviesTagsRoutes.get("/:id", moviesTagsController.index);

module.exports = moviesTagsRoutes;
