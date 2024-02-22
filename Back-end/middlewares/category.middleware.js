const { body, query } = require('express-validator')
const { requestValidation } = require("./common.middleware");


// Middleware para validar los datos de la categoría
const validateCategoryData = [
    body('name').notEmpty().withMessage('el nombre es requerido'),
    body('name').isString().withMessage('el nombre debe ser alfabetico'),
    body('description').optional().isString().withMessage('la descripcion debe ser alfabetica'),
    requestValidation,
]

// Middleware para validar el formato de ID de MongoDB en consultas
const validateQueryMongoId = [
    // Verifica opcionalmente que el parámetro de consulta 'id' sea un ID de MongoDB válido
    query('id').optional().isMongoId().withMessage('debe ser un id formato mongo'),
    requestValidation
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


// Middleware para validar los datos de la categoría - se repite en globos con distinto mensaje
const validateBodyMongoId = [
    body('catId').notEmpty().withMessage('el id de la categoria es requerida'),
    body('catId').isMongoId().withMessage('el id de la categoria deberia ser formato mongo'),    
    requestValidation
]

module.exports = {
    validateCategoryData,
    validateQueryMongoId,
    validateSubCategoryData,
    validateBodyMongoId
}