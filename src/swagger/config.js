const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

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
        url: 'https://sales-api-prisma-zod.vercel.app/api-docs',
        description: 'API Server',
      }
    ],
  },
  apis: [
    './src/swagger/schemas/*.js',
    './src/swagger/routes/*.js'
  ],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
