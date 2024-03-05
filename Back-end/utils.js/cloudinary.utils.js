const { CLOUDINARY_CONFIG } = require('../config');

const cloudinary = require('cloudinary').v2

// Configurar Cloudinary con las credenciales proporcionadas
cloudinary.config({
    cloud_name: CLOUDINARY_CONFIG.CLOUD_NAME,
    api_key: CLOUDINARY_CONFIG.API_KEY,
    api_secret: CLOUDINARY_CONFIG.API_SECRET,
    secure: true
});

// Función para cargar una imagen a Cloudinary
const uploadImage = (filePath) => {
    return cloudinary.uploader.upload(filePath, {
        folder: 'detallesLuna',
        format: 'webp'
    });
};

module.exports = { uploadImage }