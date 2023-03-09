// const mongoose = require('mongoose')

// const connectionString = process.env.MONGO_DB_URI

// mongoose.connect(connectionString)
//   .then(() =>{
//     console.log('Database connected')
//   }).catch(err =>{
//     console.error(err)
//   })

// process.on('uncaughtException', err =>{
//   console.error(err)
//   mongoose.disconnect()
// })



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

const mongoose = require('mongoose')

const DB_URL = process.env.MONGO_DB_URI

if (!DB_URL) {
  throw new Error(
    'Please define the DB_URL environment variable inside .env.local'
  )
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    console.log("--- db connected ---");
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(DB_URL, opts).then((mongoose) => {
      console.log("--- db connected ---")
      return mongoose
    })
  }
  cached.conn = await cached.promise
  console.log("--- db connected ---")
  return cached.conn
}

module.exports = dbConnect