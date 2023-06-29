const { body } = require('express-validator');
const db = require('../config/database')

const validateCreateUser = [
    body('username')
        .isString().withMessage("Invalid String format")
        .notEmpty().withMessage("username is required"),

    body('password')
        .isString().withMessage("Invalid String format")
        .notEmpty().withMessage("password is required"),

    body('email')
        .isEmail().withMessage("Invalid email format")
        .notEmpty().withMessage("email is required")
]
 
const validateUpdateUser = [
    body('username')
        .isString().withMessage("Invalid String format")
        .notEmpty().withMessage("username is required"),

    body('password')
        .isString().withMessage("Invalid String format")
        .notEmpty().withMessage("password is required"),

    body('email')
        .isEmail().withMessage("Invalid email format")
        .notEmpty().withMessage("email is required")
]
module.exports = {validateCreateUser,validateUpdateUser}