const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const authConfig = require('../configs/auth');


class SessionsController {
  async create(request, response) {
    
    const { email, password } = request.body	

    const user = await knex('users').where({ email }).first();

    if (!user) {
      throw new AppError('Email e/ou senha incorreto(s)', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email e/ou senha incorreto(s)', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: String(user.id),
      expiresIn: authConfig.jwt.expiresIn
    })


    return response.json({ user, token });
  }
}

module.exports = SessionsController
