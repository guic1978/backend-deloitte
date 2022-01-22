const AuthController = require('../controllers/auth');
const { validatePostLogin } = require('../validators/auth');
const hasErrorValidation = require('../middlewares/has-error-validation');

module.exports = function (router) {
  router.post(
    '/auth/login',
    validatePostLogin(),
    hasErrorValidation,
    AuthController.postLogin
  );
};
