const postController = require('../controllers/post');

module.exports = function (router) {
  router.get('/posts', postController.getAll);
  router.post('/posts', postController.postCreate);
  router.get('/posts/:id', postController.getById);
  router.delete('/posts/:id', postController.deleteById);
};
