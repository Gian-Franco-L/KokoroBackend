const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  userName: String,
  passwordHash: String,
  name: String,
  email: String,
  phone: String,
  cartItems: Array,
  token: String,
  access: String,
  purchase:[{
    type: Schema.Types.ObjectId,
    ref: 'Purchase'
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) =>{
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = model('User', userSchema)

module.exports = User