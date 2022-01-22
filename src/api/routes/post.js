const postController = require('../controllers/post');
const { validatePostPosts, validatePutPosts } = require('../validators/post');
const hasErrorValidation = require('../middlewares/has-error-validation');
const isAuthenticated = require('../middlewares/is-authenticated');
const isAuthorized = require('../middlewares/is-authorized');

module.exports = function (router) {
  router.get('/posts', postController.getAll);
  router.get('/posts/:id', postController.getById);
  router.post(
    '/posts',
    isAuthenticated,
    isAuthorized(['Admin']),
    validatePostPosts(),
    hasErrorValidation,
    postController.postCreate
  );
  router.put(
    '/posts/:id',
    isAuthenticated,
    isAuthorized(['Admin']),
    validatePutPosts(),
    hasErrorValidation,
    postController.putUpdate
  );
  router.delete(
    '/posts/:id',
    isAuthenticated,
    isAuthorized(['Admin']),
    postController.deleteById
  );
};
