const usersRouter = require('express').Router()
const User = require('../models/User')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

usersRouter.put('/', async(req, res) =>{
  const { body } = req
  const { emailPassword } = body

  if(emailPassword !== undefined){
    if(emailPassword === ""){
      res.status(400).send({
        message: "El email es requerido"
      })
    }
    try{
      const user = await User.findOne({ "email": emailPassword })

      let newUpdate = user

      if(!user){
        return res.status(403).send({
          message: "No existe este email"
        })
      }

      const userForToken = {
        id: user._id,
        userName: user.userName
      }

      const token = jwt.sign(userForToken, process.env.JWTPASS, {
        expiresIn: 60 * 60 * 24 * 7
      })

      newUpdate["resetToken"] = token

      User.findByIdAndUpdate(user.id, newUpdate)
      .then(() =>{
        res.json(newUpdate)
      })
      
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
              type: "OAUTH2",
              user: process.env.GMAIL_USERNAME,
              clientId: process.env.OAUTH_CLIENT_ID,
              clientSecret: process.env.OAUTH_CLIENT_SECRET,
              refreshToken: process.env.OAUTH_REFRESH_TOKEN,
              accessToken: process.env.OAUTH_ACCESS_TOKEN,
              expires: 3599
        }
      });

      const emailPort = process.env.EMAIL_PORT

      const mailOptions = {
        from: process.env.GMAIL_USERNAME,
        to: emailPassword,
        subject: 'Enlace para recuperar contraseña',
        text:`${emailPort}/#/resetpassword/${user._id}/${token}`
      }

      transporter.sendMail(mailOptions, (err, res) =>{
        if(err){
          console.error(err)
        }else{
          console.log(res);
          res.status(200).json("Se ha enviado el mail correctamente")
        }
      })

    }catch(err){
      res.status(500).send(err)
    }
  }
})

module.exports = usersRouter