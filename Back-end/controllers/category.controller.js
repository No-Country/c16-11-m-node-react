const Categoria = require("../models/Categorias")
const SubCategoria = require("../models/SubCategorias")
const { makeSuccessResponse, makeErrorResponse } = require("../utils.js/response.utils")

//faltan los endpoint para eliminar categoria y subcategoria
//faltan los endpoint para actualizar datos de categoria y subcategoria

//crear categoria
const createCategory = async (req, res, next) => {
    try {
        const { name, description } = req.body

        const category = new Categoria({ name, description })

        await category.save()

        res.status(201)
        res.json(makeSuccessResponse(category))

    } catch (err) {
        next(err)
    }
}

//buscar categoria/s
const getCategory = async (req, res, next) => {
    try {
        
        const { id } = req.params
        let query = undefined
    
        if (id !== undefined) {
            query = Categoria.findById(id)
        } else {
            query = Categoria.find({})
        }
    
        const response = await query.exec()

        if (!response) return res.status(404).json(makeErrorResponse("no existe la categoria") )
    
        res.json(makeSuccessResponse(response))
    
    } catch (err) {
        next(err)
    }
}

//crear subCategoria
const createSubcategory = async (req, res, next) => {
    try {
        const { name, categoryId } = req.body
        const subcategory = new SubCategoria({ name, categoryId })
        
        await subcategory.save()
        res.status(201)
        res.json(makeSuccessResponse(subcategory))
    } catch (err) {
        next(err)
    }
}

//buscar subCategoria/s
const getSubCategory = async (req, res, next) => {
    try {
        const { id } = req.params

        let query = undefined
    
        if (id !== undefined) {
            query = SubCategoria.findById(id)
        } else {
            query = SubCategoria.find({})
        }
    
        const response = await query.exec()
        
        if (!response) return res.status(404).json(makeErrorResponse("no existe la subcategoria") )
        res.json(makeSuccessResponse(response))
    } catch (err) {
        next(err)
    }
}

//buscar subcategoria con id de categorias
const getsubCategoryByCategory = async (req, res, next) => {
    try {
        const { id } = req.params
    
        const categoria = await Categoria.findById(id)
        const subCategoria = await SubCategoria.find({ categoryId: id })
    
        res.json(makeSuccessResponse(subCategoria))
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createCategory,
    getCategory,
    createSubcategory,
    getSubCategory,
    getsubCategoryByCategory
}