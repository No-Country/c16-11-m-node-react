const Detalles = require("../models/Detalles")
const { uploadImage } = require("../utils.js/cloudinary.utils")
const { makeSuccessResponse, makeErrorResponse } = require("../utils.js/response.utils")
const fs = require('fs-extra')

//faltan endpoint para actualizar los datos de productos Detalles

//funcion para crear producto detalles
const createDetalles = async (req, res, next) => {
    try {
        const { name, description, available, etiqueta, category_id } = req.body

        const detalle = new Detalles({ name, description, available, etiqueta, category_id })

        // Verificar si se adjuntaron imágenes en la solicitud
        if (req.files && req.files.image) {
            const uploadedImages = [];
            // Subir cada imagen a Cloudinary y obtener los resultados
            for (let i = 0; i < req.files.image.length; i++) {
                const result = await uploadImage(req.files.image[i].tempFilePath);
                uploadedImages.push({
                    public_id: result.public_id,
                    secure_url: result.secure_url
                });
                // Eliminar el archivo temporal después de subirlo a Cloudinary
                if (req.files.image[i].tempFilePath) {
                    await fs.unlink(req.files.image[i].tempFilePath);
                }
            }
            // Asignar las imágenes al globo
            detalle.imagen = uploadedImages;
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

//funcion para traer todos los detalles de una categoria
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