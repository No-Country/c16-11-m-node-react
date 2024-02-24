const { Schema } = require("mongoose");
const Product = require("./Products");

const Decoracion = Product.discriminator('Decoracion', new Schema({
    category_id: { type: Schema.Types.ObjectId, ref: 'Categoria' }
}))

module.exports = Decoracion