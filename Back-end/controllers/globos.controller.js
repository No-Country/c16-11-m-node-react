const Globos = require("../models/Globos")
const { uploadImage } = require("../utils.js/cloudinary.utils")
const { makeSuccessResponse, makeErrorResponse } = require("../utils.js/response.utils")
const fs = require('fs-extra')

//faltan endpoint para actualizar los datos de productos globos

//funcion para crear producto globos
const createGlobos = async (req, res, next) => {
    try {
        const { name, description, available, etiqueta, subCategory_id } = req.body

        const globo = new Globos({ name, description, available, etiqueta, subCategory_id })

        // Verificar si se adjuntó una imagen en la solicitud
        if (req.files?.image) {
            // Subir la imagen a Cloudinary y obtener el resultado
            const result = await uploadImage(req.files.image.tempFilePath)

            // Asignar el public_id y secure_url de la imagen al globo
            globo.imagen = {
                public_id: result.public_id,
                secure_url: result.secure_url
            }

            // Eliminar el archivo temporal después de subirlo a Cloudinary
            if (req.files.image.tempFilePath) {
                await fs.unlink(req.files.image.tempFilePath);
            }
        }

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