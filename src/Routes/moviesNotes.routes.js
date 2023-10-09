const { Router } = require("express");

const MoviesNotesController = require("../Controller/MoviesController");

const moviesRoutes = Router();

const moviesNotesController = new MoviesNotesController();

moviesRoutes.post("/:user_id", moviesNotesController.create);

module.exports = moviesRoutes;
