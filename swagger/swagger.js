// server/swagger/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.4',
    info: {
      title: 'Real Estate API Docs',
      version: '1.0.12',
      description: 'Documentation for Bất Động Sản Project',
    },
    servers: [
      { url: 'http://localhost:8000' },
    ],
  },
  apis: [
    path.join(__dirname, '../routes/*.js'),      
    path.join(__dirname, './*.js'),           
  ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerUi };
