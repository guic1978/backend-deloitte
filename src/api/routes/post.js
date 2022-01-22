const postController = require('../controllers/post');
const { validatePostPosts, validatePutPosts } = require('../validators/post');
const hasErrorValidation = require('../middlewares/has-error-validation');
const isAuthenticated = require('../middlewares/is-authenticated');
const isAuthorized = require('../middlewares/is-authorized');

module.exports = function (router) {
  //#region GET /posts
  /**
   * @swagger
   * /posts:
   *  get:
   *    tags:
   *    - Post
   *    security:
   *    - BearerAuth: []
   *    sumary: Obtém todos os registros
   *    description: Obtém todos os registros
   *
   *    responses:
   *      '201':
   *        description: Lista com os registros.
   *        content:
   *          'application/json':
   *            schema:
   *              type: object
   *              properties:
   *                data:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      id:
   *                        type: string
   *                      title:
   *                        type: string
   *                      content:
   *                        type: string
   *                      author:
   *                        type: string
   *                      date:
   *                        type: string
   *                      createdAt:
   *                        type: string
   *                      updatedAt:
   *                        type: string
   */
  //#endregion
  router.get('/posts', postController.getAll);
  router.get('/posts/:id', postController.getById);

  //#region GET /posts
  /**
   * @swagger
   * /posts:
   *  post:
   *    tags:
   *    - Post
   *    security:
   *    - BearerAuth: []
   *    sumary: Cria um novo registro
   *    description: Cria um novo registro
   *    requestBody:
   *      content:
   *        'application/json':
   *          schema:
   *            type: object
   *            properties:
   *              title:
   *                type: string
   *              content:
   *                type: string
   *              author:
   *                type: string
   *
   *    responses:
   *      '201':
   *        description: Id do novo registro.
   *        content:
   *          'application/json':
   *            schema:
   *              type: object
   *              properties:
   *                id:
   *                  type: string
   *                  description: 'id do novo registro'
   */
  //#endregion
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
