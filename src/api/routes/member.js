const memberController = require('../controllers/member');
const {
  validatePostMembers,
  validatePutMembers,
} = require('../validators/member');
const hasErrorValidation = require('../middlewares/has-error-validation');
const isAuthenticated = require('../middlewares/is-authenticated');
const isAuthorized = require('../middlewares/is-authorized');

module.exports = function (router) {
  router.get('/members', memberController.getAll);
  router.get('/members/:id', memberController.getById);
  router.post(
    '/members',
    isAuthenticated,
    isAuthorized(['Admin']),
    validatePostMembers(),
    hasErrorValidation,
    memberController.postCreate
  );
  router.put(
    '/members/:id',
    isAuthenticated,
    isAuthorized(['Admin']),
    validatePutMembers(),
    hasErrorValidation,
    memberController.putUpdate
  );
  router.delete(
    '/members/:id',
    isAuthenticated,
    isAuthorized(['Admin']),
    memberController.deleteById
  );
};
