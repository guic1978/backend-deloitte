const serviceController = require('../controllers/service');
const { validateServices } = require('../validators/service');
const hasErrorValidation = require('../middlewares/has-error-validation');
const isAuthenticated = require('../middlewares/is-authenticated');
const isAuthorized = require('../middlewares/is-authorized');

module.exports = function (router) {
  router.get('/services', serviceController.getAll);
  router.get('/services/:id', serviceController.getById);
  router.post(
    '/services',
    isAuthenticated,
    isAuthorized(['Admin']),
    validateServices(),
    hasErrorValidation,
    serviceController.postCreate
  );
  router.put(
    '/services/:id',
    isAuthenticated,
    isAuthorized(['Admin']),
    validateServices(),
    hasErrorValidation,
    serviceController.putUpdate
  );
  router.delete(
    '/services/:id',
    isAuthenticated,
    isAuthorized(['Admin']),
    serviceController.deleteById
  );
};
