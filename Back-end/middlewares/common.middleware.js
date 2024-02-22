const { validationResult } = require("express-validator")
const { MongoServerError } = require('mongodb')

// Verifica si hay errores de validación en la solicitud utilizando express-validator.
const requestValidation = (req, res , next) => {
    const result = validationResult(req)

    if (!result.isEmpty()) return res.json({errors: result.array()})

    next()
}

// Captura cualquier error que se produzca durante el procesamiento de la solicitud.
const errorMiddleware = (err, req, res, next) => {
    console.log("error capturado ", err)

    // Si es un error de duplicación de clave en MongoDB
    if (err instanceof MongoServerError && err.code === 11000) {
        // Responder con un código de estado 409 (Conflicto)
        return res.status(409).json({ message: 'El nombre proporcionado ya existe' });
    }

    res.status(500)
    res.json({ message:'internal error'})
}


module.exports = {
    requestValidation,
    errorMiddleware
}