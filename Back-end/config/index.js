const dotEnv = require('dotenv')

// Cargar las variables de entorno desde el archivo .env en el objeto process.env
dotEnv.config()


//configuracion Mongo
const MONGO_CONFIG = {
    URI: process.env.MONGO_URI
}

//configuracion del Puerto en el que se ejecutará el servidor Express
const EXPRESS_CONFIG = {
    PORT: process.env.PORT
}

//configuracion Cloudinary
const CLOUDINARY_CONFIG = {
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET
}

module.exports = {
    MONGO_CONFIG,
    EXPRESS_CONFIG,
    CLOUDINARY_CONFIG
}