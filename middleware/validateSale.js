const saleSchema = require('../schemas/saleSchema.js');

const validateSale = (req, res, next) => {
  try {
    const { body } = req;
    
    // Convert price string to number if it comes as string
    if (body.price) {
      body.price = Number(body.price);
    }

    const result = saleSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.errors.map(error => ({
        field: error.path[0],
        message: error.message
      }));
      return res.status(400).json({ errors });
    }

    req.validatedData = result.data;
    next();
  } catch (error) {
    return res.status(400).json({ 
      errors: [{ message: 'Invalid input data' }] 
    });
  }
};

module.exports = validateSale;
