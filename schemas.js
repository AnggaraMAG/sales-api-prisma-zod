// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
const swaggerUi = require('swagger-ui-express');
const specs = require('./src/swagger/config');

// Get all sales
/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Create a new sale
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Sale created successfully
 *       400:
 *         description: Invalid input data
 */