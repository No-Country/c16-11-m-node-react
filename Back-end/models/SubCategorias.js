const { default: mongoose , Schema } = require("mongoose");

const subCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique:true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true }
})

const SubCategoria = mongoose.model('SubCategoria', subCategorySchema)

module.exports = SubCategoria