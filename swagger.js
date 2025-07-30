const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const env = require('dotenv');

env.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Phar-manager API Documentation',
      version: '1.0.0',
      description: `Documentation of the Phar-manager API, a pharmacy management system.`,
      contact: {
        name: "N'GASAMA Henoc",
        email: 'ngasamah@gmail.com',
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: 'Local server'
      },
      {
        url: `https://render/henocngasama/phar-manager`,
        description: 'Render server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
        NotFound: {
          description: 'Resource not found',
        },
        InternalError: {
          description: 'Internal server error',
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    tags: [
      {
        name: 'Medicines',
        description: 'Manage pharmacy products'
      },
      {
        name: 'Users',
        description: 'Operations related to users'
      },
      {
        name: 'Prescriptions',
        description: 'Operations related to prescriptions'
      },
      {
        name: 'Orders',
        description: 'Operations related to orders'
      },
      {
        name: 'Inventory',
        description: 'Operations related to inventory management'
      }
    ]
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
