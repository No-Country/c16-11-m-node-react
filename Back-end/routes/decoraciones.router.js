const { createDecoracion, getDecoracion, decoracionBySubCategory } = require('../controllers/decoracion.controller')
const { errorMiddleware, validateIdParams } = require('../middlewares/common.middleware')
const { validateGloboData } = require('../middlewares/globos.middlewares')
const decoracionRouter = require('express').Router()

//enrutador para crear producto globos
decoracionRouter.post('/crear',validateGloboData, createDecoracion, errorMiddleware)

//enrutador para traer todos los productos globos
decoracionRouter.get('/get', getDecoracion, errorMiddleware)

//enrutador para buscar productos globos por ID 
decoracionRouter.get('/get/:id',validateIdParams , getDecoracion, errorMiddleware)

//enrutador para traer/buscar todos los productos globos de una subcategoria
decoracionRouter.get('/globosBySubCategory/:id',validateIdParams , decoracionBySubCategory, errorMiddleware )


module.exports = { decoracionRouter }