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
   *    - Posts
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

  //#region GET /posts/:id
  /**
   * @swagger
   * /posts/{id}:
   *  get:
   *    tags:
   *    - Posts
   *    security:
   *    - BearerAuth: []
   *    sumary: Obtém um registro
   *    description: Obtém um registro
   *    parameters:
   *      - name: id
   *        in: path
   *        description: ID do registro
   *        required: true
   *        schema:
   *          type: integer
   *
   *    responses:
   *      '204':
   *        description: Registro pelo ID.
   *        content:
   *          'application/json':
   *            schema:
   *              type: object
   *              properties:
   *                data:
   *                  type: object
   *                  properties:
   *                    id:
   *                      type: string
   *                    title:
   *                      type: string
   *                    content:
   *                      type: string
   *                    author:
   *                      type: string
   *                    date:
   *                      type: string
   *                    createdAt:
   *                      type: string
   *                    updatedAt:
   *                      type: string
   */
  //#endregion
  router.get('/posts/:id', postController.getById);

  //#region POST /posts
  /**
   * @swagger
   * /posts:
   *  post:
   *    tags:
   *    - Posts
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

  //#region PUT /posts/:id
  /**
   * @swagger
   * /posts/{id}:
   *  put:
   *    tags:
   *    - Posts
   *    security:
   *    - BearerAuth: []
   *    sumary: Edita um registro
   *    description: Edita um registro
   *    parameters:
   *      - name: id
   *        in: path
   *        description: ID do registro
   *        required: true
   *        schema:
   *          type: integer
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
   *      '204':
   *        description: Sem conteúdo.
   */
  //#endregion
  router.put(
    '/posts/:id',
    isAuthenticated,
    isAuthorized(['Admin']),
    validatePutPosts(),
    hasErrorValidation,
    postController.putUpdate
  );

  //#region DELETE /posts/:id
  /**
   * @swagger
   * /posts/{id}:
   *  delete:
   *    tags:
   *    - Posts
   *    security:
   *    - BearerAuth: []
   *    sumary: Exclui um registro
   *    description: Exclui um registro
   *    parameters:
   *      - name: id
   *        in: path
   *        description: ID do registro
   *        required: true
   *        schema:
   *          type: integer
   *    responses:
   *      '204':
   *        description: Sem conteúdo.
   */
  //#endregion
  router.delete(
    '/posts/:id',
    isAuthenticated,
    isAuthorized(['Admin']),
    postController.deleteById
  );
};
