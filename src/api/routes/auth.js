const AuthController = require('../controllers/auth');

module.exports = function (router) {
  router.post('/auth/login', AuthController.postLogin);
};
