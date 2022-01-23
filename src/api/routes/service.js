const serviceController = require('../controllers/service');
const { validateServices } = require('../validators/service');
const hasErrorValidation = require('../middlewares/has-error-validation');
const isAuthenticated = require('../middlewares/is-authenticated');
const isAuthorized = require('../middlewares/is-authorized');

module.exports = function (router) {
  //#region GET /services
  /**
   * @swagger
   * /services:
   *  get:
   *    tags:
   *    - Services
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
   *                      name:
   *                        type: string
   *                      description:
   *                        type: string
   *                      createdAt:
   *                        type: string
   *                      updatedAt:
   *                        type: string
   */
  //#endregion
  router.get('/services', serviceController.getAll);

  //#region GET /services/:id
  /**
   * @swagger
   * /services/{id}:
   *  get:
   *    tags:
   *    - Services
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
   *                    name:
   *                      type: string
   *                    description:
   *                      type: string
   *                    createdAt:
   *                      type: string
   *                    updatedAt:
   *                      type: string
   */
  //#endregion
  router.get('/services/:id', serviceController.getById);

  //#region POST /services
  /**
   * @swagger
   * /services:
   *  post:
   *    tags:
   *    - Services
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
   *              name:
   *                type: string
   *              email:
   *                type: string
   *              description:
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
    '/services',
    isAuthenticated,
    isAuthorized(['Admin']),
    validateServices(),
    hasErrorValidation,
    serviceController.postCreate
  );

  //#region PUT /services/:id
  /**
   * @swagger
   * /services/{id}:
   *  put:
   *    tags:
   *    - Services
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
   *              name:
   *                type: string
   *              email:
   *                type: string
   *              author:
   *                description: string
   *
   *    responses:
   *      '204':
   *        description: Sem conteúdo.
   */
  //#endregion
  router.put(
    '/services/:id',
    isAuthenticated,
    isAuthorized(['Admin']),
    validateServices(),
    hasErrorValidation,
    serviceController.putUpdate
  );

  //#region DELETE /services/:id
  /**
   * @swagger
   * /services/{id}:
   *  delete:
   *    tags:
   *    - Services
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
    '/services/:id',
    isAuthenticated,
    isAuthorized(['Admin']),
    serviceController.deleteById
  );
};
