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

  async show(req, res) {
    const { id } = req.params;

    const note = await knex("movies_notes").where({ id }).first();

    const moviesTags = await knex("movies-tags").where({ note_id: id });

    return res.json({
      ...note,
      moviesTags,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex("movies_notes").where({ id }).delete();

    return res.json();
  }

  async index(req, res) {
    const { title, user_id, movies_tags } = req.query;

    let notes;

    if (movies_tags) {
      const filterTags = movies_tags.split(",").map((tag) => tag.trim());
      console.log(filterTags);

      notes = await knex("movies-tags")
        .select([
          "movies_notes.id",
          "movies_notes.title",
          "movies_notes.user_id",
        ])
        .where("movies_notes.user_id", user_id)
        .whereLike("movies_notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("movies_notes", "movies_notes.id", "movies-tags.note_id")
        .orderBy("movies_notes.title");
    } else {
      notes = await knex("movies_notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }
    const userMoviesTags = await knex("movies-tags").where({ user_id });
    const notesWithTags = notes.map((note) => {
      const noteTags = userMoviesTags.filter((tag) => tag.note_id === note.id);

      return {
        ...note,
        movies_tags: noteTags,
      };
    });

    return res.json(notesWithTags);
  }
}

module.exports = MoviesNotesController;
