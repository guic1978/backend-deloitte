const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const { HttpStatus } = require('../../enums/http-status.enum');
const { User } = require('../../models');

module.exports = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    error = new Error('Not Authenticated');
    error.statusCode = HttpStatus.FORBIDDEN;
    return next(error);
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decodedToken.userId);
    req.userId = +user.id;
    req.userName = user.name;
    req.userMainRole = user.mainRole;
  } catch (err) {
    err.statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    return next(err);
  }
  if (!decodedToken) {
    error = new Error('Not Authenticated');
    error.statusCode = HttpStatus.FORBIDDEN;
    return next(error);
  }
  next();
};
