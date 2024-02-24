const Decoracion = require("../models/Detalles")
const { makeSuccessResponse, makeErrorResponse } = require("../utils.js/response.utils")

//faltan endpoint para actualizar los datos de productos globos

//funcion para crear producto detalles
const createDecoracion = async (req, res, next) => {
    try {
        const { name, description, available, category_id } = req.body

        const detalle = new Decoracion({ name, description, available, category_id })
        await detalle.save()

        res.status(201)
        res.json(makeSuccessResponse(detalle))
    } catch (err) {
        next(err)
    }
}

//funcion para buscar Detalles por id o todos
const getDecoracion = async (req, res, next) => {
    try {
        const { id } = req.params

        let query = undefined

        if (id !== undefined) {
            query = Decoracion.findById(id)
        } else {
            query = Decoracion.find({})
        }

        const response = await query.exec()
        if (!response) return res.status(400).json(makeErrorResponse("no existe el producto"))

        res.json(makeSuccessResponse(response))
    } catch (err) {
        next(err)
    }
}

//funcion para traer todos los globos de una subcategoria
const decoracionBySubCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).json(makeErrorResponse("debe enviar un id por params"))
        
        const detalle = await Decoracion.find({ category_id: id })

        if (!detalle) return res.status(400).json(makeErrorResponse("no existe la categoria"))

        res.json(makeSuccessResponse(detalle))
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createDecoracion,
    getDecoracion,
    decoracionBySubCategory
}