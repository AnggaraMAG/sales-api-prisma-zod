const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sales API Documentation',
      version: '1.0.0',
      description: 'API documentation for Sales Management System',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: [
    './src/swagger/schemas/*.js',
    './src/swagger/routes/*.js'
  ],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
