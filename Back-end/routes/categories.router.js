const { createCategory, createSubcategory, getCategory, getSubCategory, getsubCategoryByCategory } = require('../controllers/category.controller')
const { validateCategoryData, validateQueryMongoId, validateSubCategoryData, validateBodyMongoId } = require('../middlewares/category.middleware')
const { errorMiddleware } = require('../middlewares/common.middleware')

const categoryRouter = require('express').Router()

//ruta para crear categoria
categoryRouter.post('/create-category',validateCategoryData , createCategory, errorMiddleware )

//ruta para buscar categoria/s
categoryRouter.get('/',validateQueryMongoId, getCategory, errorMiddleware)

//crear subCategoria
categoryRouter.post('/create-subCategory',validateSubCategoryData, createSubcategory, errorMiddleware)

//buscar sub-categoria/s
categoryRouter.get('/subCategory',validateQueryMongoId, getSubCategory, errorMiddleware)

//buscar sub-categoria/s
categoryRouter.get('/subCategoryByCategory',validateBodyMongoId, getsubCategoryByCategory, errorMiddleware)

module.exports = { categoryRouter }

