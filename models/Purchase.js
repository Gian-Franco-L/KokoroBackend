const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  info: Array,
  total: Number,
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) =>{
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Purchase = model('Purchase', userSchema)

module.exports = Purchase