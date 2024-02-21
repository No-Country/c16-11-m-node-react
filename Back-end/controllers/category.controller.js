const Categoria = require("../models/Categorias")
const SubCategoria = require("../models/SubCategorias")

//crear categoria
const createCategory = async (req, res) => {
    const { name, description } = req.body

    const category = new Categoria({ name, description })

    await category.save()

    res.status(201)
    res.json(category)
}

//buscar categoria/s
const getCategory = async (req, res) => {
    const { id } = req.query
    let query = undefined

    if (id !== undefined) {
        query = Categoria.findById(id)
    } else {
        query = Categoria.find({})
    }

    const response = await query.exec()

    res.json(response)

    if (!response) return res.status(404).json({ message: "no existe la categoria" })
}

//buscar subcategoria con id de categorias
const getsubCategoryByCategory = async(req, res) => {
    const {catId } = req.body

    const categoria = await Categoria.findById(catId)
    const subCategoria = await SubCategoria.find({categoryId: catId})

    res.json(subCategoria)
}


//crear subCategoria
const createSubcategory = async (req, res) => {
    const { name, categoryId } = req.body
    const subcategory = new SubCategoria({ name, categoryId })

    await subcategory.save()
    res.status(201)
    res.json(subcategory)
}

//buscar subCategoria/s
const getSubCategory = async (req, res) => {
    const { id } = req.query
    let query = undefined

    if (id !== undefined) {
        query = SubCategoria.findById(id)
    } else {
        query = SubCategoria.find({})
    }

    const response = await query.exec()

    res.json(response)

    if (!response) return res.status(404).json({ message: "no existe la subcategoria" })
}



module.exports = {
    createCategory,
    getCategory,
    createSubcategory,
    getSubCategory,
    getsubCategoryByCategory
}