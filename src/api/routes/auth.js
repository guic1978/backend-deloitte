const AuthController = require('../controllers/auth');
const { validatePostLogin } = require('../validators/auth');
const hasErrorValidation = require('../middlewares/has-error-validation');

module.exports = function (router) {
  //#region POST /auth/login
  /**
   * @swagger
   * /auth/login:
   *  post:
   *    tags:
   *    - Auth
   *    security:
   *    - BearerAuth: []
   *    sumary: Realiza o login
   *    description: Realiza o login
   *    requestBody:
   *      content:
   *        'application/json':
   *          schema:
   *            type: object
   *            properties:
   *              email:
   *                type: string
   *              password:
   *                type: string
   *    responses:
   *      '200':
   *        description: Objeto de resposta da autenticação.
   *        content:
   *          'application/json':
   *            schema:
   *              type: object
   *              properties:
   *                token:
   *                  type: string
   *                  description: 'token JWT de autenticação na API'
   *                userId:
   *                  type: string
   *                  description: 'Menssagem informando se a autenticação foi bem sucessedida ou não'
   */
  //#endregion

  router.post(
    '/auth/login',
    validatePostLogin(),
    hasErrorValidation,
    AuthController.postLogin
  );
};
