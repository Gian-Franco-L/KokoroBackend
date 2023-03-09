const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  Name: String,
  Price: Number,
  Date: Number,
  Size: String,
  Material: String,
  Stuffing: String,
  Img: String
})

//transforma los datos
productSchema.set('toJSON', {
  transform: (document, returnedObject) =>{
    //pasa el _id a id
    returnedObject.id = returnedObject._id
    //elimina _id
    delete returnedObject._id
    //elimina __v
    delete returnedObject.__v
  }
})

//crea Product en base al schema creado
const Product = model('Product', productSchema)

module.exports = Product

// const mongoose = require("mongoose")

// const productSchema = mongoose.Schema({
//   Name: String,
//   Price: Number,
//   Date: Number,
//   Size: String,
//   Material: String,
//   Stuffing: String,
//   Img: String
// })

// const Product =mongoose.models?.product || mongoose.model("product", productSchema)

// module.exports = Product