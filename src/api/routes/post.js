const postController = require('../controllers/post');
const { validatePostPosts, validatePutPosts } = require('../validators/post');
const hasErrorValidation = require('../middlewares/has-error-validation');
const isAuth = require('../middlewares/is-auth');

module.exports = function (router) {
  router.get('/posts', postController.getAll);
  router.get('/posts/:id', postController.getById);
  router.post(
    '/posts',
    isAuth,
    validatePostPosts(),
    hasErrorValidation,
    postController.postCreate
  );
  router.put(
    '/posts/:id',
    isAuth,
    validatePutPosts(),
    hasErrorValidation,
    postController.putUpdate
  );
  router.delete('/posts/:id', isAuth, postController.deleteById);
};
