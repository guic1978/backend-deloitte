const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { HttpStatus } = require('../enums/http-status.enum');

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

const checkIfExists = async (email) => {
  const user = await User.findOne({ where: [{ email }] });
  if (!user) {
    const error = new Error('User not found or invalid password');
    error.statusCode = HttpStatus.NOT_FOUND;
    throw error;
  }

  return new Promise((resolve) => resolve(user));
};

const havePasswordMatched = async (password, userPassword) => {
  const matched = await bcrypt.compare(password.toString(), userPassword);

  if (!matched) {
    const error = new Error('User not found or invalid password');
    error.statusCode = HttpStatus.NOT_FOUND;
    throw error;
  }

  return new Promise((resolve) => resolve(matched));
};

const createJWT = (user) => {
  const token = jwt.sign(
    {
      name: user.name,
      email: user.email,
      userId: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );

  return new Promise((resolve) => resolve(token));
};
