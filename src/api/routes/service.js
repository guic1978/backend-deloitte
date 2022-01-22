const serviceController = require('../controllers/service');
const { validateServices } = require('../validators/service');
const hasErrorValidation = require('../middlewares/has-error-validation');

module.exports = function (router) {
  router.get('/services', serviceController.getAll);
  router.get('/services/:id', serviceController.getById);
  router.post(
    '/services',
    validateServices(),
    hasErrorValidation,
    serviceController.postCreate
  );
  router.put(
    '/services/:id',
    validateServices(),
    hasErrorValidation,
    serviceController.putUpdate
  );
  router.delete('/services/:id', serviceController.deleteById);
};
