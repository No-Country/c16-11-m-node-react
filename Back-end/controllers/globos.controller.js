
const Globos = require("../models/Globos")

//funcion para crear producto globos
const createGlobos = async (req, res, next) => {
    try {
        const { name, description, available, subCategory_id } = req.body

        const globo = new Globos({ name, description, available, subCategory_id })
        await globo.save()

        res.status(201)
        res.json(globo)
    } catch (err) {
        next(err)
    }
}


//funcion para buscar globos por id o todos
const getGlobos = async (req, res, next) => {
    try {
        const { id } = req.query

        let query = undefined

        if (id !== undefined) {
            query = Globos.findById(id)
        } else {
            query = Globos.find({})
        }

        const response = await query.exec()
        if (!response) return res.status(400).json({ message: "no existe el producto" })

        res.json(response)
    } catch (err) {
        next(err)
    }

}

//funcion para cambiar disponibilidad de available

const updateAvailable = async (req, res, next) => {
    try {
        const { id, available } = req.body
        const globo = await Globos.findById(id)

        if (!globo) return res.status(400).json({ message: "no existe el producto" })

        globo.available = available
        globo.save()

        res.json({ message: "disponibilidad actualizada", data: globo })

    } catch (err) {
        next(err)
    }
}

//funcion para cambiar disponibilidad de available
const deleteGlobo = async (req, res, next) => {
    try {
        const { id } = req.body

        const globo = await Globos.findByIdAndDelete(id)

        if (!globo) return res.status(400).json({ message: "no existe el producto" })

        res.json(globo)
    } catch (err) {
        next(err)
    }
}

//funcion para traer todos los globos de una subcategoria
const globosBySubCategory = async (req, res, next) => {
    try {
        const { id } = req.body

        const globos = await Globos.find({ subCategory_id: id })

        res.json(globos)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createGlobos,
    getGlobos,
    updateAvailable,
    deleteGlobo,
    globosBySubCategory
}