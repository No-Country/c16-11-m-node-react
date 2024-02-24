const { Schema } = require("mongoose");
const Product = require("./Products");

const Globos = Product.discriminator('Globos', new Schema({
    subCategory_id: { type: Schema.Types.ObjectId, ref: 'SubCategoria', required:true }
}))

module.exports = Globos