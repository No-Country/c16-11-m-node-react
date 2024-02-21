const { Schema } = require("mongoose");
const Product = require("./Products");

const Globos = Product.discriminator('Globos', new Schema({
    available: { type: Boolean, default: false },
    subCategory_id: { type: Schema.Types.ObjectId, ref: 'SubCategoria' }
}))

module.exports = Globos