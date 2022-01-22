const { HttpStatus } = require('../../enums/http-status.enum');
const AuthServices = require('../../services/auth');

exports.postLogin = async (req, res, next) => {
  const authDto = {
    email: req.body.email,
    password: req.body.password,
  };

  const result = await AuthServices.postLogin(authDto);
  res.status(HttpStatus.OK).json(result);
};
