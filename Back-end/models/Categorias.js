const { default: mongoose } = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true }
})

const Categoria = mongoose.model('Categoria', CategorySchema)

module.exports = Categoria