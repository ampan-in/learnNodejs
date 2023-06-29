const { body } = require('express-validator');

// middleware สำหรับ validate request body
const validateCreateProducts = [
    body('name')
        .isString().withMessage("Invalid date format")
        .notEmpty().withMessage('name is required'),

    body('description')
        .isString().withMessage("Invalid string format")
        .notEmpty().withMessage('description is required'),
    
    body('price')
        .isDecimal().withMessage("Invalid decimal format")
        .notEmpty().withMessage('price is required'),
  ];

  const validateUpdateProducts = [
    body('name')
        .isString().withMessage("Invalid date format")
        .notEmpty().withMessage('name is required'),

    body('description')
        .isString().withMessage("Invalid string format")
        .notEmpty().withMessage('description is required'),
    
    body('price')
        .isDecimal().withMessage("Invalid decimal format")
        .notEmpty().withMessage('price is required'),
  ];

module.exports = { validateCreateProducts, validateUpdateProducts}