const { Schema } = require("mongoose");
const Product = require("./Products");

const Decoracion = Product.discriminator('Decoracion', new Schema({
    category_Id: { type: Schema.Types.ObjectId, ref: 'Categoria' },
    subCategoy_id: { type: Schema.Types.ObjectId, ref: 'SubCategoria' }
}))

module.exports = Decoracion