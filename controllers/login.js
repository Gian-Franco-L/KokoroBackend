const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async(req, res) =>{
  const { body } = req
  const { logUser, logPassword } = body
  const user = await User.findOne({ "userName": logUser })
  const passwordCorrect = user == null
    ? false
    : await bcrypt.compare(logPassword, user.passwordHash)

  if(!(user && passwordCorrect)){
    res.status(409).json({
      error: 'invalid user or password'
    })
  }else{
    const userForToken = {
      id: user._id,
      userName: user.userName
    }
  
    const token = jwt.sign(userForToken, process.env.JWTPASS, {
      expiresIn: 60 * 60 * 24 * 7
    })
  
    res.send({
      name: user.name,
      userName: user.userName,
      email: user.email,
      phone: user.phone,
      token: token,
      access: user.access
    })
  }
})

module.exports = loginRouter