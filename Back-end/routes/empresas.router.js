const { createEmpresas, getEmpresas } = require("../controllers/empresas.controllers")
const { errorMiddleware, validateIdParams } = require("../middlewares/common.middleware")
const { validateEmpresaData } = require("../middlewares/globos.middlewares")
const EmpresasRouter = require('express').Router()

//enrutador para crear producto Empresas
EmpresasRouter.post('/crear', validateEmpresaData, createEmpresas, errorMiddleware)

//enrutador para traer todos los productos Empresas
EmpresasRouter.get('/get', getEmpresas, errorMiddleware)

//enrutador para buscar productos Empresas por ID 
EmpresasRouter.get('/get/:id', validateIdParams, getEmpresas, errorMiddleware)

module.exports = { EmpresasRouter }