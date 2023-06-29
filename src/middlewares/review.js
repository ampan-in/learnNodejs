const { body } = require('express-validator');
const db = require('../config/database')

const validateCreateReview = [
    body('userID')
        .isDecimal().withMessage("Invalid String format")
        .notEmpty().withMessage("rating is required"),

    body('productID')
        .isString().withMessage("Invalid String format")
        .notEmpty().withMessage("comment is required"),
    body('rating')
        .isDecimal().withMessage("Invalid String format")
        .notEmpty().withMessage("rating is required"),

    body('comment')
        .isString().withMessage("Invalid String format")
        .notEmpty().withMessage("comment is required"),

]
 
module.exports = {validateCreateReview}