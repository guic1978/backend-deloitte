const { User } = require('../models');
const { HttpStatus } = require('../enums/http-status.enum');

exports.postLogin = async (email, password) => {
  const user = await checkIfExists(email);

  return new Promise((resolve) => {
    resolve({
      data: user,
    });
  });
};

const checkIfExists = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = HttpStatus.NOT_FOUND;
    throw error;
  }

  return new Promise((resolve) => resolve(user));
};
