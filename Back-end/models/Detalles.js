const { Schema } = require("mongoose");
const Product = require("./Products");

const Detalles = Product.discriminator('Detalles', new Schema({
    category_Id: { type: Schema.Types.ObjectId, ref: 'Categoria' },
    subCategoy_id: { type: Schema.Types.ObjectId, ref: 'SubCategoria' }
}))

module.exports = Detalles