const knex = require("../database/knex");

class MoviesTagsController {
  async index(req, res) {
    const user_id = req.params;
    console.log(user_id.id);

    const moviesTagShow = await knex("movies_tags").where({
      user_id: user_id.id,
    });

    return res.json(moviesTagShow);
  }
}

module.exports = MoviesTagsController;
