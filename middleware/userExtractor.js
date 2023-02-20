const jwt = require('jsonwebtoken')

module.exports = (req, res, next) =>{
  const authorization = req.get('authorization')
  let token = null
  
  //nos aseguramos que la autenticacion que esta intentando el usuario es la correcta
  if(authorization && authorization.toLocaleLowerCase().startsWith('bearer')){
    token = authorization.split(' ')[1]
  }

  //verificamos si es el token correcto
  const decodedToken = jwt.verify(token, process.env.JWTPASS)

  const { id: userId } = decodedToken
  
  req.userId = userId

  next()
}