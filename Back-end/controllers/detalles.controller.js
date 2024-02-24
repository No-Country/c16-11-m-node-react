const Detalles = require("../models/Detalles")
const { makeSuccessResponse, makeErrorResponse } = require("../utils.js/response.utils")

//faltan endpoint para actualizar los datos de productos Detalles

//funcion para crear producto detalles
const createDetalles = async(req, res, next) => {
    try {
            const { name, description, available, category_id } = req.body
    
            const detalle = new Detalles({ name, description, available, category_id })
            await detalle.save()
    
            res.status(201)
            res.json(makeSuccessResponse(detalle))
    } catch (err) {
        next(err)
    }
}

//funcion para buscar Detalles por id o todos
const getDetalles = async (req, res, next) => {
    try {
        const { id } = req.params

        let query = undefined

        if (id !== undefined) {
            query = Detalles.findById(id)
        } else {
            query = Detalles.find({})
        }

        const response = await query.exec()
        if (!response) return res.status(400).json(makeErrorResponse("no existe el producto"))

        res.json(makeSuccessResponse(response))
    } catch (err) {
        next(err)
    }
}

//funcion para traer todos los globos de una subcategoria
const DetallesBySubCategory = async (req, res, next) => {
    try {
        const { id } = req.body
        if (!id) return res.status(400).json(makeErrorResponse("debe enviar un id por params"))

        const detalle = await Detalles.find({ category_id: id })

        if (!detalles) return res.status(400).json(makeErrorResponse("no existe la categoria"))

        res.json(makeSuccessResponse(detalle))
    } catch (err) {
        next(err)
    }
}

module.exports =  {
    createDetalles,
    getDetalles,
    DetallesBySubCategory
}