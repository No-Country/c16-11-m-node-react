const Detalles = require("../models/Detalles")


//funcion para crear producto detalles
const createDetalles = async(req, res, next) => {
    try {
        try {
            const { name, description, available, category_id } = req.body
    
            const detalle = new Detalles({ name, description, available, category_id })
            await detalle.save()
    
            res.status(201)
            res.json(detalle)
        } catch (err) {
            next(err)
        }
    } catch (err) {
        next(err)
    }
}
//funcion para buscar Detalles por id o todos
const getDetalles = async (req, res, next) => {
    try {
        const { id } = req.query

        let query = undefined

        if (id !== undefined) {
            query = Detalles.findById(id)
        } else {
            query = Detalles.find({})
        }

        const response = await query.exec()
        if (!response) return res.status(400).json({ message: "no existe el producto" })

        res.json(response)
    } catch (err) {
        next(err)
    }
}

//funcion para cambiar disponibilidad de available
const deleteDetalle = async (req, res, next) => {
    try {
        const { id } = req.body

        const detalle = await Globos.findByIdAndDelete(id)

        if (!detalle) return res.status(400).json({ message: "no existe el producto" })

        res.json(detalle)
    } catch (err) {
        next(err)
    }
}

//funcion para traer todos los globos de una subcategoria
const DetallesBySubCategory = async (req, res, next) => {
    try {
        const { id } = req.body

        const detalle = await Detalles.find({ subCategory_id: id })

        res.json(detalle)
    } catch (err) {
        next(err)
    }
}




module.exports =  {
    createDetalles,
    getDetalles,
    deleteDetalle,
    DetallesBySubCategory
}



