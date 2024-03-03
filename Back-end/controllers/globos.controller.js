const Globos = require("../models/Globos")
const { uploadImage } = require("../utils.js/cloudinary.utils")
const { makeSuccessResponse, makeErrorResponse } = require("../utils.js/response.utils")
const fs = require('fs-extra')

//faltan endpoint para actualizar los datos de productos globos

//funcion para crear producto globos
const createGlobos = async (req, res, next) => {
    try {
        const { name, description, available, etiqueta, subCategory_id } = req.body;

        const globo = new Globos({ name, description, available, etiqueta, subCategory_id });

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
            globo.imagen = uploadedImages;
        }

        await globo.save();

        res.status(201);
        res.json(makeSuccessResponse(globo));
    } catch (err) {
        next(err);
    }
};



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