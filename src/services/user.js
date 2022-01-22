const bcrypt = require('bcryptjs');

const { User } = require('../models');
const { HttpStatus } = require('../enums/http-status.enum');

exports.postCreate = async () => {
  const userDto = {
    name: 'Guilherme Reis',
    email: 'guilherme.guic@gmail.com',
    password: '12345',
    mainRole: 'Admin',
  };

  await checkIfNotExists(userDto.email);

  userDto.password = await bcrypt.hash(userDto.password, 12);
  const user = User.create(userDto);

  return new Promise((resolve) => {
    resolve({
      data: user,
    });
  });
};

const checkIfNotExists = async (email) => {
  const user = await User.findOne({ where: [{ email }] }).catch((error) =>
    console.log(error)
  );
  if (user) {
    const error = new Error('User alread exists');
    error.statusCode = HttpStatus.CONFLICT;
    throw error;
  }

  return new Promise((resolve) => resolve(user));
};
