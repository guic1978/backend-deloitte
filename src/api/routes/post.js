const postController = require('../controllers/post');

module.exports = function (router) {
  router.get('/posts', postController.getAll);
  router.get('/posts/:id', postController.getById);
  router.post('/posts', postController.postCreate);
  router.put('/posts/:id', postController.putUpdate);
  router.delete('/posts/:id', postController.deleteById);
};
