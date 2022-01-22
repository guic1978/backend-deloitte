const memberController = require('../controllers/member');
const {
  validatePostMembers,
  validatePutMembers,
} = require('../validators/member');
const hasErrorValidation = require('../middlewares/has-error-validation');

module.exports = function (router) {
  router.get('/members', memberController.getAll);
  router.get('/members/:id', memberController.getById);
  router.post(
    '/members',
    validatePostMembers(),
    hasErrorValidation,
    memberController.postCreate
  );
  router.put(
    '/members/:id',
    validatePutMembers(),
    hasErrorValidation,
    memberController.putUpdate
  );
  router.delete('/members/:id', memberController.deleteById);
};
