const bcrypt = require( 'bcrypt')
//clase que nos permite crear un router de forma separada del index
const usersRouter = require('express').Router()
//importamos el modelo
const User = require('../models/User')
const jwt = require('jsonwebtoken')


//en el index ya tiene una ruta '/api/users' asi que usamos '/'
usersRouter.get('/', async(req, res) =>{ 
  const users =  await User.find({})
    .populate('purchase', {
      info: 1,
      total: 1,
      status: 1,
      _id: 1})
  res.json(users)
})

usersRouter.post('/', async (req, res) =>{
  const { body } = req
  const { name, email, phone, cartItems = [], _id} = body
  const userName = body.userName.toLowerCase()
  const password = body.password.toLowerCase()

  const searchUser = await User.findOne({ "userName": userName })
  const searchEmail = await User.findOne({ "email": email })
  const isNumber = /^([0-9 +-])*$/.exec(phone)

  if(searchUser || !password || !name || name.length > 25 || !email || searchEmail || !phone || isNumber === null){
    res.status(409).end()
    return 0;
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const userForToken = {
    id: _id,
    userName: userName
  }

  const token = jwt.sign(userForToken, process.env.JWTPASS, {
    expiresIn: 60 * 60 * 24 * 7
  })

  const user = new User({
    userName: userName,
    passwordHash: passwordHash,
    name: name,
    email: email,
    phone: phone,
    cartItems: cartItems,
    token: token,
    access: access = "no",
    resetToken: resetToken = ""
  })

  const savedUser = await user.save()
  res.json(savedUser)
})

usersRouter.delete('/:id', (req, res, next) =>{
  const { id } = req.params
  const { userName } = req.params

  if(userName === process.env.ADMIN){
  User.findByIdAndDelete(id)
    .then(() =>{
      res.status(204).end()
    })
    .catch(err =>{
      next(err)
    })
  }else{
    res.status(409).end()
  }
})

usersRouter.put('/', async(req, res) =>{
  const { body } = req
  const { userName, election, updateElection, cartItems } = body

  const user = await User.findOne({ "userName": userName })

  let newUpdate = user

  if(election){
    newUpdate["name"] = updateElection
  }

  if(cartItems){
    newUpdate["cartItems"] = cartItems
  }

  User.findByIdAndUpdate(user.id, newUpdate)
    .then(() =>{
      res.json(newUpdate)
  })
})

module.exports = usersRouter