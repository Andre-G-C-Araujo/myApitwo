const knex = require("../database/knex");

class MoviesTagsController {
  async index(req, res) {
    const user_id = req.user.id;

    const moviesTagShow = await knex("movies_tags").where({
      user_id,
    });

    return res.json(moviesTagShow);
  }
}

module.exports = MoviesTagsController;
