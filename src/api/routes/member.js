const memberController = require('../controllers/member');

module.exports = function (router) {
  router.get('/members', memberController.getAll);
  router.get('/members/:id', memberController.getById);
  router.post('/members', memberController.postCreate);
  router.put('/members/:id', memberController.putUpdate);
  router.delete('/members/:id', memberController.deleteById);
};
