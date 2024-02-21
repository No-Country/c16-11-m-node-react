const { Schema } = require("mongoose");
const Product = require("./Products");

const Detalles = Product.discriminator('Detalles', new Schema({
    available: { type: Boolean, default: false },
    category_id: { type: Schema.Types.ObjectId, ref: 'Categoria' }
}))

module.exports = Detalles