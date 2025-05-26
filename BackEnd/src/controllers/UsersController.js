const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkUserExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return response.status(201).json();
  }

  async update(request, response) {
    let error;
    try {
      const { name, email, password, oldPassword } = request.body;
      const user_id = request.user.id;

      const database = await sqliteConnection();
      const user = await database.get("SELECT * FROM users WHERE id = (?)", [
        user_id,
      ]);

      if (!user) {
        error = new AppError("Usuário não encontrado");
      }

      const userWithUpdatedEmail = await database.get(
        "SELECT * FROM users WHERE email = (?)",
        [email]
      );

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
        error = new AppError("Este e-mail já está em uso.");
        return response.status(error.statusCode).json({
          message: error.message,
        });
      }

      Object.assign(user, {
        name: name ?? user.name,
        email: email ?? user.email,
      });

      if (password && !oldPassword) {
        error = new AppError(
          "Você informar a senha antiga para definir a nova senha"
        );
        return response.status(error.statusCode).json({
          message: error.message,
        });
      }

      if (password && oldPassword) {
        const checkOldPassword = await compare(oldPassword, user.password);

        if (!checkOldPassword) {
          const error = new AppError("A senha antiga não confere.");
          return response.status(error.statusCode).json({
            message: error.message,
          });
        }

        user.password = await hash(password, 8);
      }

      await database.run(
        `
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
        [user.name, user.email, user.password, user_id]
      );

      return response.json();
    } catch (error) {
      console.error(error);

      return response.status(500).json({
        message: "Ocorreu um erro inesperado do lado do servidor.",
      });
    }
  }
}

module.exports = UsersController;
