const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const validateSale = require('../middleware/validateSale.js');


const prisma = new PrismaClient();
const app = express();
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger/config');



app.use(express.json());
app.use(cors());






// doc swagger
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// Serve Swagger UI static files
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(specs, {
  explorer: true,
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css'
}));


// Get all sales
app.get('/sales', async (req, res) => {
    try {
      const sales = await prisma.sale.findMany();
      res.json(sales);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create a new sale 
app.post('/sales',validateSale, async (req, res) => {
    try {
      const { name, price } = req.body;
      const sale = await prisma.sale.create({
        data: {
          name,
          price,
        },
      });
      res.json(sale);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get sale by ID
app.get('/sales/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const sale = await prisma.sale.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!sale) {
        return res.status(404).json({ error: 'Sale not found' });
      }
      res.json(sale);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update sale
app.put('/sales/:id',validateSale, async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price } = req.body;
      const sale = await prisma.sale.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name,
          price,
        },
      });
      res.json(sale);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete sale
app.delete('/sales/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.sale.delete({
        where: {
          id: parseInt(id),
        },
      });
      res.json({ message: 'Sale deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});