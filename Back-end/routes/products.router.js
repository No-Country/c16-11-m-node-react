const { getProducts, updateProductAvailable, deleteProduct, getLabelProduct, updateLabelProduct } = require('../controllers/product.controller')
const { errorMiddleware, validateIdParams, validateAvailableData } = require('../middlewares/common.middleware')

const productRouter = require('express').Router()

//ruta para la busqueda de productos
productRouter.get('/get', getProducts ,errorMiddleware )

//ruta para la busqueda de producto por id
productRouter.get('/get/:id',validateIdParams, getProducts ,errorMiddleware )

//ruta para la actualizacion la disponibilidad
productRouter.patch('/available-product',validateAvailableData, updateProductAvailable ,errorMiddleware )

//ruta para la eliminacion de un producto por id por params
productRouter.delete('/delete/:id',validateIdParams ,deleteProduct ,errorMiddleware )

//ruta para actualizar etiqueta de producto por id body
productRouter.patch('/etiquetas/patch', updateLabelProduct ,errorMiddleware )

//ruta para actualizar etiqueta de producto por id body
productRouter.get('/etiquetas', getLabelProduct ,errorMiddleware )

module.exports = { productRouter }