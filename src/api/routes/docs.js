const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

module.exports = function (router) {
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.1',
      info: {
        version: '0.1.0',
        title: 'Backend Cronos',
        description: 'Esta é a api do Portal Cronos',
        termsOfService: '',
        contact: {
          name: 'Guilherme Reis',
          email: 'guilherme.guic@gmail.com',
          url: '',
        },
      },
      servers: [
        {
          url: 'http://localhost:8080/api',
          description: 'Local server',
        },
        {
          url: 'http://localhost:8080/api',
          description: 'Testing server',
        },
      ],
      tags: [
        {
          name: 'Auth',
          description: 'Operações de Autenticação',
        },
        {
          name: 'Posts',
          description: 'Publicações do sistema',
        },
        {
          name: 'Services',
          description: 'Serviços do sistema',
        },
        {
          name: 'Members',
          description: 'Membros da equipe',
        },
      ],
      components: {
        schemas: {
          Posts: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                format: 'int64',
              },
              title: {
                type: 'string',
              },
              content: {
                type: 'string',
              },
              author: {
                type: 'string',
              },
              date: {
                type: 'string',
              },
              createdAt: {
                type: 'string',
              },
              updatedAt: {
                type: 'string',
              },
            },
            xml: {
              name: 'Posts',
            },
          },
          Services: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                format: 'int64',
              },
              name: {
                type: 'string',
              },
              description: {
                type: 'string',
              },
              createdAt: {
                type: 'string',
              },
              updatedAt: {
                type: 'string',
              },
            },
            xml: {
              name: 'Services',
            },
          },
          Members: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                format: 'int64',
              },
              name: {
                type: 'string',
              },
              email: {
                type: 'string',
              },
              description: {
                type: 'string',
              },
              createdAt: {
                type: 'string',
              },
              updatedAt: {
                type: 'string',
              },
            },
            xml: {
              name: 'Members',
            },
          },
          ApiSuccessResponse: {
            type: 'object',
            properties: {
              status: {
                type: 'integer',
              },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {},
                },
              },
            },
          },
          ApiErrorResponse: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
            },
          },
        },
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
    apis: [path.join(__dirname, '/*.js'), 'express.js'],
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
