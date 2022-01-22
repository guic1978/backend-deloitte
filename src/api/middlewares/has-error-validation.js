const { validationResult } = require('express-validator');
const { HttpStatus } = require('../../enums/http-status.enum');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.errors.map((error) => error.msg).join('; '));
    error.statusCode = HttpStatus.VALIDATION_ERROR;
    return next(error);
  }

  next();
};
