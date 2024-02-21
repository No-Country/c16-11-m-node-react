const { createCategory, createSubcategory, getCategory, getSubCategory, getsubCategoryByCategory } = require('../controllers/category.controller')

const categoryRouter = require('express').Router()

//crear categoria
categoryRouter.post('/create-category', createCategory )

//buscar categoria/s
categoryRouter.get('/', getCategory)

//crear subCategoria
categoryRouter.post('/create-subCategory', createSubcategory)

//buscar sub-categoria/s
categoryRouter.get('/subCategory', getSubCategory)

//buscar sub-categoria/s
categoryRouter.get('/subCategoryByCategory', getsubCategoryByCategory)

module.exports = { categoryRouter }

