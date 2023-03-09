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

// const mongoose = require('mongoose')

// const DB_URL = process.env.MONGO_DB_URI

// if (!DB_URL) {
//   throw new Error(
//     'Please define the DB_URL environment variable inside .env.local'
//   )
// }

// let cached = global.mongoose

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null }
// }

// async function dbConnect() {
//   if (cached.conn) {
//     console.log("dbConnected");
//     return cached.conn
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     }

//     cached.promise = mongoose.connect(DB_URL, opts).then((mongoose) => {
//       console.log("dbConnected")
//       return mongoose
//     })
//   }
//   cached.conn = await cached.promise
//   console.log("dbConnected")
//   return cached.conn
// }

// module.exports = dbConnect