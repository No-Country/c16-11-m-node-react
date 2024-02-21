const { createGlobos, getGlobos, updateAvailable, deleteGlobo } = require('../controllers/globos.controller')
const globoRouter = require('express').Router()

//enrutador para crear producto globos
globoRouter.post('/crear', createGlobos)

//enrutador para traer/buscar productos globos por ID o todos
globoRouter.get('/get', getGlobos)

//enrutador para actualizar disponibilidad producto globos
globoRouter.patch('/product-available', updateAvailable)

//enrutador para eliminar un producto globos
globoRouter.patch('/delete-product', deleteGlobo)

module.exports = { globoRouter }