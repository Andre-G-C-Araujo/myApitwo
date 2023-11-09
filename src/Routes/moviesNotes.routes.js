const { Router } = require("express");

const MoviesNotesController = require("../Controller/MoviesNotesController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const moviesRoutes = Router();

const moviesNotesController = new MoviesNotesController();

moviesRoutes.use(ensureAuthenticated);

moviesRoutes.get("/", moviesNotesController.index);
moviesRoutes.post("/", moviesNotesController.create);
moviesRoutes.get("/:id", moviesNotesController.show);
moviesRoutes.delete("/:id", moviesNotesController.delete);

module.exports = moviesRoutes;
