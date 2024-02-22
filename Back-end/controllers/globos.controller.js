
const Globos = require("../models/Globos")

//funcion para crear producto globos
const createGlobos = async (req, res) => {
    const { name, description, available, subCategory_id } = req.body

    const globo = new Globos({ name, description, available, subCategory_id })
    await globo.save()

    res.status(201)
    res.json(globo)
}


//funcion para buscar globos por id o todos
const getGlobos = async (req, res) => {
    const { id } = req.query

    let query = undefined

    if (id !== undefined) {
        query = Globos.findById(id)
    } else {
        query = Globos.find({})
    }

    const response = await query.exec()

    res.json(response)

    if (!response) return res.status(400).json({ message: "no existe el producto" })
}

//funcion para cambiar disponibilidad de available

const updateAvailable = async (req, res) => {
    const { globoId, available } = req.body
    const globo = await Globos.findById(globoId)

    if (!globo) return res.status(400).json({ message: "no existe el producto" })

    globo.available = available
    globo.save()

    res.json({ message: "disponibilidad actualizada", data: globo })

}

//funcion para cambiar disponibilidad de available
const deleteGlobo = async (req, res) => {
    const { globoId } = req.body

    const globo = await Globos.findByIdAndDelete(globoId)

    if (!globo) return res.status(400).json({ message: "no existe el producto" })

    res.json(globo)
}

//funcion para traer todos los globos de una subcategoria
const globosBySubCategory = async (req, res) => {
    const { subCatId } = req.body

    const globos = await Globos.find({ subCategory_id: subCatId })

    res.json(globos)
}

module.exports = {
    createGlobos,
    getGlobos,
    updateAvailable,
    deleteGlobo,
    globosBySubCategory
}