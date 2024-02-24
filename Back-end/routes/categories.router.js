const { createCategory, createSubcategory, getCategory, getSubCategory, getsubCategoryByCategory } = require('../controllers/category.controller')
const { validateCategoryData, validateSubCategoryData} = require('../middlewares/category.middleware')
const { errorMiddleware, validateIdParams } = require('../middlewares/common.middleware')

const categoryRouter = require('express').Router()

//ruta para crear categoria
categoryRouter.post('/create-category',validateCategoryData , createCategory, errorMiddleware )

//ruta para traer todas las categorias
categoryRouter.get('/get', getCategory, errorMiddleware )

//ruta para buscar categoria por id
categoryRouter.get('/get/:id',validateIdParams, getCategory, errorMiddleware)

//crear subCategoria
categoryRouter.post('/create-subCategory',validateSubCategoryData, createSubcategory, errorMiddleware)

//buscar sub-categoria/s
categoryRouter.get('/subCategory', getSubCategory, errorMiddleware)

//buscar sub-categoria por id
categoryRouter.get('/subCategory/:id', validateIdParams, getSubCategory, errorMiddleware)

//buscar sub-categoria/s
categoryRouter.get('/subCategoryByCategory/:id',validateIdParams, getsubCategoryByCategory, errorMiddleware)

module.exports = { categoryRouter }

