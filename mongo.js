const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI

//conexion a mongoDB

mongoose.connect(connectionString)
  .then(() =>{
    console.log('Database connected')
  }).catch(err =>{
    console.error(err)
  })

process.on('uncaughtException', err =>{
  console.error(err)
  mongoose.disconnect()
})