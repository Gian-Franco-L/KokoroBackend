const bcrypt = require( 'bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')


usersRouter.put('/', async(req, res) =>{
  const { body } = req
  const { id, token, password } = body

  const user = await User.findOne({ "_id": id, "resetToken": token})

  if(user){
    let newUpdate = user
  
    newUpdate["passwordHash"] = await bcrypt.hash(password, 10)
    newUpdate["resetToken"] = ""

    User.findByIdAndUpdate(user.id, newUpdate)
      .then(() =>{
        res.json(newUpdate)
      })
  }else{
    res.status(401).json({
      error: 'invalid token'
    })
  }
})

module.exports = usersRouter