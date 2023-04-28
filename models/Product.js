const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  Name: String,
  Price: Number,
  Date: Number,
  Size: String,
  Material: String,
  Stuffing: String,
  Type: String,
  Status: String,
  Img: String
})

productSchema.set('toJSON', {
  transform: (document, returnedObject) =>{
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Product = model('Product', productSchema)

module.exports = Product