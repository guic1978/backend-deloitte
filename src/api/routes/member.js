const memberController = require('../controllers/member');
const {
  validatePostMembers,
  validatePutMembers,
} = require('../validators/member');
const hasErrorValidation = require('../middlewares/has-error-validation');
const isAuthenticated = require('../middlewares/is-authenticated');
const isAuthorized = require('../middlewares/is-authorized');

module.exports = function (router) {
  //#region GET /members
  /**
   * @swagger
   * /members:
   *  get:
   *    tags:
   *    - Members
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
   *                       type: string
   *                      email:
   *                        type: string
   *                      description:
   *                       type: string
   *                      createdAt:
   *                       type: string
   *                      updatedAt:
   *                       type: string
   */
  //#endregion
  router.get('/members', memberController.getAll);

  //#region GET /members/:id
  /**
   * @swagger
   * /members/{id}:
   *  get:
   *    tags:
   *    - Members
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
   *                    email:
   *                      type: string
   *                    description:
   *                      type: string
   *                    createdAt:
   *                      type: string
   *                    updatedAt:
   *                      type: string
   */
  //#endregion
  router.get('/members/:id', memberController.getById);

  //#region POST /members
  /**
   * @swagger
   * /members:
   *  post:
   *    tags:
   *    - Members
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
    '/members',
    isAuthenticated,
    isAuthorized(['Admin']),
    validatePostMembers(),
    hasErrorValidation,
    memberController.postCreate
  );

  //#region PUT /members/:id
  /**
   * @swagger
   * /members/{id}:
   *  put:
   *    tags:
   *    - Members
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
    '/members/:id',
    isAuthenticated,
    isAuthorized(['Admin']),
    validatePutMembers(),
    hasErrorValidation,
    memberController.putUpdate
  );

  //#region DELETE /members/:id
  /**
   * @swagger
   * /members/{id}:
   *  delete:
   *    tags:
   *    - Members
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
    '/members/:id',
    isAuthenticated,
    isAuthorized(['Admin']),
    memberController.deleteById
  );
};
