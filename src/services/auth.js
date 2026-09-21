const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { HttpStatus } = require('../enums/http-status.enum');

/**
 * Realiza o login do usuário.
 * Verifica se o usuário existe pelo e-mail, valida a senha e gera o token JWT.
 *
 * @param {Object} params - Dados de autenticação.
 * @param {string} params.email - E-mail do usuário.
 * @param {string} params.password - Senha informada pelo usuário.
 * @returns {Promise<{ data: { token: string, userId: string } }>} Token JWT e id do usuário.
 * @throws {Error} Caso o usuário não exista ou a senha seja inválida (404).
 */
exports.postLogin = async ({ email, password }) => {
  const user = await checkIfExists(email);

  if (await havePasswordMatched(password, user.password)) {
    const token = await createJWT(user);

    return new Promise((resolve) => {
      resolve({
        data: {
          token,
          userId: user.id.toString(),
        },
      });
    });
  }
};

/**
 * Verifica se o usuário existe no banco de dados pelo e-mail.
 *
 * @param {string} email - E-mail do usuário a ser buscado.
 * @returns {Promise<Object>} Objeto do usuário encontrado.
 * @throws {Error} Caso o usuário não seja encontrado (404).
 */
const checkIfExists = async (email) => {
  const user = await User.findOne({ where: [{ email }] });
  if (!user) {
    const error = new Error('User not found or invalid password');
    error.statusCode = HttpStatus.NOT_FOUND;
    throw error;
  }

  return new Promise((resolve) => resolve(user));
};

/**
 * Compara a senha informada com a senha armazenada (hash) do usuário.
 *
 * @param {string} password - Senha em texto plano informada no login.
 * @param {string} userPassword - Hash da senha armazenada no banco.
 * @returns {Promise<boolean>} `true` se as senhas coincidirem.
 * @throws {Error} Caso a senha não coincida (404).
 */
const havePasswordMatched = async (password, userPassword) => {
  const matched = await bcrypt.compare(password.toString(), userPassword);

  if (!matched) {
    const error = new Error('User not found or invalid password');
    error.statusCode = HttpStatus.NOT_FOUND;
    throw error;
  }

  return new Promise((resolve) => resolve(matched));
};

/**
 * Gera um token JWT assinado com os dados do usuário.
 *
 * @param {Object} user - Objeto do usuário autenticado.
 * @param {string} user.name - Nome do usuário.
 * @param {string} user.email - E-mail do usuário.
 * @param {string} user.mainRole - Papel principal do usuário.
 * @param {number} user.id - Id do usuário.
 * @returns {Promise<string>} Token JWT com validade de 1 hora.
 */
const createJWT = (user) => {
  const token = jwt.sign(
    {
      name: user.name,
      email: user.email,
      mainRole: user.mainRole,
      userId: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );

  return new Promise((resolve) => resolve(token));
};
