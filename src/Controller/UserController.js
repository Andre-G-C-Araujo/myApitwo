const { hash, compare } = require("bcryptjs");
const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");
const validator = require("email-validator");

class UserController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const database = await sqliteConnection();
    const checkUsersExist = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (!validator.validate(email)) {
      throw new AppError("Email invalido, tente um que seja valído");
    }

    if (checkUsersExist) {
      throw new AppError("Esse email ja existe");
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?,?,?)",
      [name, email, hashedPassword]
    );

    return res.status(201).json();
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body;
    const { id } = req.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user) {
      throw new AppError("Usuario nao existente");
    }

    const userWithUpdateEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      console.log(userWithUpdateEmail);
      throw new AppError("Esse e-mail já esta cadastrado.");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("Precisa preencher a senha antiga");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("ultima senha nao confere.");
      }

      user.password = await hash(password, 8);
    }

    await database.run(
      `UPDATE or IGNORE users SET
         name = ?,
         email = ?,
         password = ?,
         updated_at = DATETIME('now'),
         id = ?
    `,
      [user.name, user.email, user.password, id]
    );

    return res.status(201).json();
  }
}

module.exports = UserController;
