const Product = require("../models/Products")
const { makeSuccessResponse, makeErrorResponse } = require("../utils.js/response.utils")

//funcion para buscar globos por id o todos
const getProducts = async (req, res, next) => {
    try {
        const { id } = req.params

        let query = undefined

        if (id !== undefined) {
            query = Product.findById(id)
        } else {
            query = Product.find({})
        }

        const response = await query.exec()
        if (!response) return res.status(400).json(makeErrorResponse("no existe el producto"))

        res.json(makeSuccessResponse(response))
    } catch (err) {
        next(err)
    }
}

//funcion para cambiar disponibilidad de available
const updateProductAvailable = async (req, res, next) => {
    try {
        const { id, available } = req.body
        const product = await Product.findById(id)

        if (!product) return res.status(400).json(makeErrorResponse("no existe el producto"))

        product.available = available
        product.save()

        res.json(makeSuccessResponse(product))

    } catch (err) {
        next(err)
    }
}

//funcion para cambiar disponibilidad de available
const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params

        const product = await Product.findByIdAndDelete(id)

        if (!product) return res.status(400).json(makeErrorResponse("no existe el producto"))

        res.json(makeSuccessResponse(product))
    } catch (err) {
        next(err)
    }
}

// funcion para traer productos segun su etiqueta . ejemp: "novedades", "ofertas", "destacados".
const getLabelProduct = async (req, res, next) => {
    try {
        const { label } = req.body
        const products = await Product.find({etiqueta: label})
    
        if (!products) return res.status(400).json(makeErrorResponse("no existe la etiqueta"))
        res.json(makeSuccessResponse(products))
    } catch (err) {
        next(err)
    }
}

module.exports = {
    updateProductAvailable,
    deleteProduct,
    getProducts,
    getLabelProduct
}

