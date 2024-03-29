const Empresas = require("../models/Empresas")
const { uploadImage } = require("../utils.js/cloudinary.utils")
const { makeSuccessResponse, makeErrorResponse } = require("../utils.js/response.utils")
const fs = require('fs-extra')

//funcion para crear producto Empresas
const createEmpresas = async (req, res, next) => {
    try {
        const { name, description, available, etiqueta } = req.body

        const empresa = new Empresas({ name, description, available, etiqueta })

        // Verificar si se adjuntó una imagen en la solicitud
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
            empresa.imagen = uploadedImages;
        }

        await empresa.save()

        res.status(201)
        res.json(makeSuccessResponse(empresa))
    } catch (err) {
        next(err)
    }
}

//funcion para buscar Producto Empresas por id o todos
const getEmpresas = async (req, res, next) => {
    try {
        const { id } = req.params

        let query = undefined

        if (id !== undefined) {
            query = Empresas.findById(id)
        } else {
            query = Empresas.find({})
        }

        const response = await query.exec()

        if (!response) return res.status(404).json(makeErrorResponse("no existe el producto"))
        res.json(makeSuccessResponse(response))
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createEmpresas,
    getEmpresas
}