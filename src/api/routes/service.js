const serviceController = require('../controllers/service');
const { validateServices } = require('../validators/service');
const hasErrorValidation = require('../middlewares/has-error-validation');
const isAuth = require('../middlewares/is-auth');

module.exports = function (router) {
  router.get('/services', serviceController.getAll);
  router.get('/services/:id', serviceController.getById);
  router.post(
    '/services',
    isAuth,
    validateServices(),
    hasErrorValidation,
    serviceController.postCreate
  );
  router.put(
    '/services/:id',
    isAuth,
    validateServices(),
    hasErrorValidation,
    serviceController.putUpdate
  );
  router.delete('/services/:id', isAuth, serviceController.deleteById);
};
