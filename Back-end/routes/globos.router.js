const { createGlobos, getGlobos, globosBySubCategory } = require('../controllers/globos.controller')
const { errorMiddleware, validateIdParams } = require('../middlewares/common.middleware')
const { validateGloboData, validateBodyMongoId } = require('../middlewares/globos.middlewares')
const globoRouter = require('express').Router()

//enrutador para crear producto globos
globoRouter.post('/crear',validateGloboData, createGlobos, errorMiddleware)

//enrutador para traer todos los productos globos
globoRouter.get('/get', getGlobos, errorMiddleware)

//enrutador para buscar productos globos por ID 
globoRouter.get('/get/:id',validateIdParams , getGlobos, errorMiddleware)

//enrutador para traer/buscar todos los productos globos de una subcategoria
globoRouter.get('/globosBySubCategory/:id',validateIdParams ,globosBySubCategory ,errorMiddleware )


module.exports = { globoRouter }