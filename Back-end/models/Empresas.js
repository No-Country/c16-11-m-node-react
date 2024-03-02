const { Schema } = require("mongoose");
const Product = require("./Products");

const Empresas = Product.discriminator('Empresas', new Schema({
    
}))

module.exports = Empresas