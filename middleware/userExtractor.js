const jwt = require('jsonwebtoken')

module.exports = (req, res, next) =>{
  const authorization = req.get('authorization')
  let token = null
  
  if(authorization && authorization.toLocaleLowerCase().startsWith('bearer')){
    token = authorization.split(' ')[1]
  }

  const decodedToken = jwt.verify(token, process.env.JWTPASS)

  const { id: userId } = decodedToken
  
  req.userId = userId

  next()
}