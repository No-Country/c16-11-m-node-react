const { createGlobos, getGlobos, updateAvailable, deleteGlobo, globosBySubCategory } = require('../controllers/globos.controller')
const { errorMiddleware } = require('../middlewares/common.middleware')
const { validateGloboData, validateQueryMongoId, validateAvailableData, validateBodyMongoId } = require('../middlewares/globos.middlewares')
const globoRouter = require('express').Router()

//enrutador para crear producto globos
globoRouter.post('/crear',validateGloboData, createGlobos, errorMiddleware)

//enrutador para traer/buscar productos globos por ID o todos
globoRouter.get('/get',validateQueryMongoId , getGlobos, errorMiddleware)

//enrutador para actualizar disponibilidad producto globos
globoRouter.patch('/product-available',validateAvailableData, updateAvailable, errorMiddleware)

//enrutador para eliminar un producto globos
globoRouter.delete('/delete-product',validateBodyMongoId ,deleteGlobo , errorMiddleware )

//enrutador para traer/buscar todos los productos globos de una subcategoria
globoRouter.get('/globosBySubCategory',validateBodyMongoId ,globosBySubCategory ,errorMiddleware )

//enrutador para eliminar producto globo
globoRouter.delete('/delete',validateBodyMongoId ,deleteGlobo ,errorMiddleware )

module.exports = { globoRouter }