const Detalles = require("../models/Detalles")
const { uploadImage } = require("../utils.js/cloudinary.utils")
const { makeSuccessResponse, makeErrorResponse } = require("../utils.js/response.utils")
const fs = require('fs-extra')

//faltan endpoint para actualizar los datos de productos Detalles

//funcion para crear producto detalles
const createDetalles = async (req, res, next) => {
    try {
        const { name, description, available, category_id } = req.body

        const detalle = new Detalles({ name, description, available, category_id })

        // Verificar si se adjuntó una imagen en la solicitud
        if (req.files?.image) {
            // Subir la imagen a Cloudinary y obtener el resultado
            const result = await uploadImage(req.files.image.tempFilePath)

            // Asignar el public_id y secure_url de la imagen al globo
            detalle.imagen = {
                public_id: result.public_id,
                secure_url: result.secure_url
            }

            // Eliminar el archivo temporal después de subirlo a Cloudinary
            if (req.files.image.tempFilePath) {
                await fs.unlink(req.files.image.tempFilePath);
            }
        }
        
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

module.exports = {
    createDetalles,
    getDetalles,
    DetallesBySubCategory
}