require('dotenv').config()
require('./mongo')
const express = require('express')
const cors = require('cors')
const app = express()
const productsRouter = require('./controllers/products')
const purchasesRouter = require('./controllers/purchases')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const forgotPassword = require('./controllers/forgotPassword')
const resetPassword = require('./controllers/resetPassword')
const notFound = require('./middleware/notFound')
const handdleErrors = require('./middleware/handdleErrors')

app.use(express.json())
app.use(cors());

app.use('/api/products', productsRouter)

app.use('/api/purchases', purchasesRouter)

app.use('/api/users', usersRouter)

app.use('/api/login', loginRouter)

app.use('/api/forgotpassword', forgotPassword)

app.use('/api/resetPassword', resetPassword)

app.use(notFound)
app.use(handdleErrors)

const PORT = 8000
app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`)
})