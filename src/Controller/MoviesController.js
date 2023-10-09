const knex = require("../database/knex");

class MoviesNotesController {
  async create(req, res) {
    const { title, description, rating, movies_tags } = req.body;
    const { user_id } = req.params;

    const [note_id] = await knex("movies_notes").insert({
      title,
      description,
      rating,
      user_id,
    });

    const [tagsMoviesInsert] = movies_tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });
    console.log(tagsMoviesInsert);
    await knex("movies-tags").insert(tagsMoviesInsert);

    res.json();
  }
}

module.exports = MoviesNotesController;
