const { createGlobos, getGlobos, updateAvailable, deleteGlobo, globosBySubCategory } = require('../controllers/globos.controller')
const globoRouter = require('express').Router()

//enrutador para crear producto globos
globoRouter.post('/crear', createGlobos)

//enrutador para traer/buscar productos globos por ID o todos
globoRouter.get('/get', getGlobos)

//enrutador para actualizar disponibilidad producto globos
globoRouter.patch('/product-available', updateAvailable)

//enrutador para eliminar un producto globos
globoRouter.delete('/delete-product', deleteGlobo)

//enrutador para traer/buscar todos los productos globos de una subcategoria
globoRouter.get('/globosBySubCategory', globosBySubCategory)

module.exports = { globoRouter }