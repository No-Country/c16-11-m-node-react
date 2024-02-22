const { body, query } = require('express-validator')
const { requestValidation } = require('./common.middleware')

// Middleware para validar los datos de productos Globos
const validateGloboData = [
    body('name').notEmpty().withMessage('el nombre del producto es requerido'),
    body('name').isString().withMessage('el nombre del producto debe ser añfabetico'),
    body('description').notEmpty().withMessage('la descripcion del producto es requerido'),
    body('description').isString().withMessage('la descripcion del producto debe ser añfabetico'),
    body('available').optional().isBoolean().withMessage('la disponibilidad debe ser booleano'),
    body('subCategory_id').notEmpty().withMessage('el id de la subcategoria del producto es requerida'),
    body('subCategory_id').isMongoId().withMessage('el id de la subcategoria del producto debe ser formato mongo'),
    requestValidation
]

// Middleware para validar el formato de ID de MongoDB en consultas
const validateQueryMongoId = [
    // Verifica opcionalmente que el parámetro de consulta 'id' sea un ID de MongoDB válido
    query('id').optional().isMongoId().withMessage('debe ser un id formato mongo'),
    requestValidation
]

const validateAvailableData = [
    body('id').notEmpty().withMessage('el id del producto es requerida'),
    body('id').isMongoId().withMessage('el id del producto deberia ser formato mongo'),
    body('available').optional().isBoolean().withMessage('la disponibilidad debe ser booleano'),
    requestValidation
]

// Middleware para validar los datos de la categoría - se repite en categorias con distinto mensaje
const validateBodyMongoId = [
    body('id').notEmpty().withMessage('el id del producto es requerida'),
    body('id').isMongoId().withMessage('el id del producto deberia ser formato mongo'),    
    requestValidation
]

module.exports ={
    validateGloboData,
    validateQueryMongoId,
    validateAvailableData,
    validateBodyMongoId
}