const Decoracion = require("../models/Detalles")
const { uploadImage } = require("../utils.js/cloudinary.utils")
const { makeSuccessResponse, makeErrorResponse } = require("../utils.js/response.utils")
const fs = require('fs-extra')

//faltan endpoint para actualizar los datos de productos decoraciones

//funcion para crear producto deecoraciones
const createDecoracion = async (req, res, next) => {
    try {
        const { name, description, available, etiqueta, category_id } = req.body

        const decoracion = new Decoracion({ name, description, available, etiqueta, category_id })

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
            decoracion.imagen = uploadedImages;
        }

        await decoracion.save()

        res.status(201)
        res.json(makeSuccessResponse(decoracion))
    } catch (err) {
        next(err)
    }
}

//funcion para buscar Decoraciones por id o todos
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

//funcion para traer todos las decoraciones de una categoria
const decoracionBySubCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).json(makeErrorResponse("debe enviar un id por params"))

        const decoracion = await Decoracion.find({ category_id: id })

        if (!decoracion) return res.status(400).json(makeErrorResponse("no existe la categoria"))

        res.json(makeSuccessResponse(decoracion))
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createDecoracion,
    getDecoracion,
    decoracionBySubCategory
}