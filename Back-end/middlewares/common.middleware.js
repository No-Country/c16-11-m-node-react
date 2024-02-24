const { validationResult } = require("express-validator")
const { MongoServerError } = require('mongodb')
const { param, body, query } = require('express-validator')
const { makeErrorResponse } = require("../utils.js/response.utils")

// Verifica si hay errores de validación en la solicitud utilizando express-validator.
const requestValidation = (req, res, next) => {
    const result = validationResult(req)

    if (!result.isEmpty()) return res.status(400).json({ errors: result.array() })

    next()
}

// Captura cualquier error que se produzca durante el procesamiento de la solicitud.
const errorMiddleware = (err, req, res, next) => {
    console.log("error capturado ", err)

    // Si es un error de duplicación de clave en MongoDB
    if (err instanceof MongoServerError && err.code === 11000) {
        // Responder con un código de estado 409 (Conflicto)
        return res.status(409).json(makeErrorResponse('El nombre proporcionado ya existe'));
    }

    res.status(500)
    res.json({ message: 'internal error' })
}


// Middleware para validar el formato de ID de MongoDB en consultas por param
const validateIdParams = [
    param('id').optional().isMongoId().withMessage('el formato del id debe ser mongo'),
    requestValidation
]

// Middleware para validar el formato de ID de MongoDB en consultas por query
const validateQueryMongoId = [
    // Verifica opcionalmente que el parámetro de consulta 'id' sea un ID de MongoDB válido
    query('id').optional().isMongoId().withMessage('debe ser un id formato mongo'),
    requestValidation
]

// Middleware para validar datos enviados por body para actializacion de disponibilidad
const validateAvailableData = [
    body('id').notEmpty().withMessage('el id del producto es requerida'),
    body('id').isMongoId().withMessage('el id del producto deberia ser formato mongo'),
    body('available').optional().isBoolean().withMessage('la disponibilidad debe ser booleano'),
    requestValidation
]

module.exports = {
    requestValidation,
    errorMiddleware,
    validateIdParams,
    validateAvailableData,
    validateQueryMongoId
}