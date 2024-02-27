const { default: mongoose, model } = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    available: { type: Boolean, default: false },
    description: { type: String, required: true },
    etiqueta:{type: String , enum:["destacados","novedades","ofertas"]},
    imagen: {
        public_id: { type: String },
        secure_url: { type: String }
    }
})

const Product = model('Product', productSchema)

module.exports = Product