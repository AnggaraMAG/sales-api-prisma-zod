const { z } = require('zod');

const saleSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .trim()
    .transform(val => val.charAt(0).toUpperCase() + val.slice(1)),
  price: z.number()
    .positive('Price must be a positive number')
    .max(1000000, 'Price cannot exceed 1,000,000')
    .transform(val => Number(val.toFixed(2)))
});

module.exports = saleSchema;
