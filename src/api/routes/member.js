const memberController = require('../controllers/member');
const {
  validatePostMembers,
  validatePutMembers,
} = require('../validators/member');
const hasErrorValidation = require('../middlewares/has-error-validation');
const isAuth = require('../middlewares/is-auth');

module.exports = function (router) {
  router.get('/members', memberController.getAll);
  router.get('/members/:id', memberController.getById);
  router.post(
    '/members',
    isAuth,
    validatePostMembers(),
    hasErrorValidation,
    memberController.postCreate
  );
  router.put(
    '/members/:id',
    isAuth,
    validatePutMembers(),
    hasErrorValidation,
    memberController.putUpdate
  );
  router.delete('/members/:id', isAuth, memberController.deleteById);
};
