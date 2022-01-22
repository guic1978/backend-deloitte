const postController = require('../controllers/post');
const { validatePostPosts, validatePutPosts } = require('../validators/post');
const hasErrorValidation = require('../middlewares/has-error-validation');

module.exports = function (router) {
  router.get('/posts', postController.getAll);
  router.get('/posts/:id', postController.getById);
  router.post(
    '/posts',
    validatePostPosts(),
    hasErrorValidation,
    postController.postCreate
  );
  router.put(
    '/posts/:id',
    validatePutPosts(),
    hasErrorValidation,
    postController.putUpdate
  );
  router.delete('/posts/:id', postController.deleteById);
};
