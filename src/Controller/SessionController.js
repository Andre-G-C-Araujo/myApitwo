const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

class SessionController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("E-mail ou password inválidos", 400);
    }

    const matchPassword = await compare(password, user.password);

    if (!matchPassword) {
      throw new AppError("E-mail ou password inválidos", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return res.json({ user, token });
  }
}

module.exports = SessionController;
