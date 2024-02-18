const { default: mongoose } = require("mongoose");

const subCategorySchema = new mongoose.Schema({
    name: { type: String, required: true }
})

const SubCategoria = mongoose.model('SubCategoria', subCategorySchema)

module.exports = SubCategoria