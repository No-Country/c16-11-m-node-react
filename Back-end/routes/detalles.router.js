const { createDetalles, getDetalles, DetallesBySubCategory } = require('../controllers/detalles.controller')
const { errorMiddleware, validateIdParams } = require('../middlewares/common.middleware')
const { validateGloboData } = require('../middlewares/globos.middlewares')
const detallesRouter = require('express').Router()

//enrutador para crear producto globos
detallesRouter.post('/crear',validateGloboData, createDetalles, errorMiddleware)

//enrutador para traer todos los productos globos
detallesRouter.get('/get', getDetalles, errorMiddleware)

//enrutador para buscar productos globos por ID 
detallesRouter.get('/get/:id',validateIdParams , getDetalles, errorMiddleware)

//enrutador para traer/buscar todos los productos globos de una subcategoria
detallesRouter.get('/globosBySubCategory/:id',validateIdParams , DetallesBySubCategory, errorMiddleware )

module.exports = { detallesRouter }