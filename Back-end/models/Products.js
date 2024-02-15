const { default: mongoose, model } = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{ type:String , required:true},
    description:{type:String , reuired: true}
})

const Product = model('Product', productSchema)

module.exports = Product