const serviceController = require('../controllers/service');

module.exports = function (router) {
  router.get('/services', serviceController.getAll);
  router.get('/services/:id', serviceController.getById);
  router.post('/services', serviceController.postCreate);
  router.put('/services/:id', serviceController.putUpdate);
  router.delete('/services/:id', serviceController.deleteById);
};
