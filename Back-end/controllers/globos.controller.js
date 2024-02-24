const Globos = require("../models/Globos")
const { makeSuccessResponse, makeErrorResponse } = require("../utils.js/response.utils")

//faltan endpoint para actualizar los datos de productos globos

//funcion para crear producto globos
const createGlobos = async (req, res, next) => {
    try {
        const { name, description, available, subCategory_id } = req.body

        const globo = new Globos({ name, description, available, subCategory_id })
        await globo.save()

        res.status(201)
        res.json(makeSuccessResponse(globo))
    } catch (err) {
        next(err)
    }
}

//funcion para buscar globos por id o todos
const getGlobos = async (req, res, next) => {
    try {
        const { id } = req.params

        let query = undefined

        if (id !== undefined) {
            query = Globos.findById(id)
        } else {
            query = Globos.find({})
        }

        const response = await query.exec()

        if (!response) return res.status(404).json(makeErrorResponse("no existe el producto"))
        res.json(makeSuccessResponse(response))
    } catch (err) {
        next(err)
    }
}

//funcion para traer todos los globos de una subcategoria
const globosBySubCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).json(makeErrorResponse("debe enviar un id por params"))

        console.log(id)

        const globos = await Globos.find({ subCategory_id: id })

        if (!globos) return res.status(400).json(makeErrorResponse("no existe la categoria"))

        res.json(makeSuccessResponse(globos))
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createGlobos,
    getGlobos,
    globosBySubCategory
}