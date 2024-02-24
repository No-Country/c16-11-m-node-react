const { body } = require('express-validator')
const { requestValidation } = require("./common.middleware");


// Middleware para validar los datos de la categoría
const validateCategoryData = [
    body('name').notEmpty().withMessage('el nombre es requerido'),
    body('name').isString().withMessage('el nombre debe ser alfabetico'),
    body('description').optional().isString().withMessage('la descripcion debe ser alfabetica'),
    requestValidation,
]

// Middleware para validar los datos de la categoría
const validateSubCategoryData = [
    body('name').notEmpty().withMessage('el nombre es requerido'),
    body('name').isString().withMessage('el nombre debe ser alfabetico'),
    body('description').optional().isString().withMessage('la descripcion debe ser alfabetica'),
    body('categoryId').notEmpty().withMessage('el id de la categoria es requerida'),
    body('categoryId').isMongoId().withMessage('el id de la categoria deberia ser formato mongo'),
    requestValidation,
]

module.exports = {
    validateCategoryData,
    validateSubCategoryData,
}