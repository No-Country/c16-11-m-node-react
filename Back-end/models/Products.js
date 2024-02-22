const { default: mongoose, model } = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{ type:String , required:true, unique:true},
    description:{type:String , required: true}
})

const Product = model('Product', productSchema)

module.exports = Product