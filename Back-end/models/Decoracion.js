const { Schema } = require("mongoose");
const Product = require("./Products");

const Decoracion = Product.discriminator('Decoracion', new Schema({
    available: { type: Boolean, default: false },
    categoy_id: { type: Schema.Types.ObjectId, ref: 'Categoria' }
}))

module.exports = Decoracion