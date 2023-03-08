const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI

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

// const mysql = require('mysql')

// const conection = mysql.createConnection({
//   host: 'localhost',
//   database: 'pConnect',
//   user: 'root',
//   password: 'password',
//   insecureAuth : true
// })

// conection.connect(function(error){
//   if(error){
//     console.log(error);
//   }else{
//     console.log('conexion exitosa')
//   }
// })
// conection.end()