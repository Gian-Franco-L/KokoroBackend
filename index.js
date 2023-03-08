require('dotenv').config()
require('./mongo')
const express = require('express')
const cors = require('cors')
const app = express()
const productsRouter = require('./controllers/products')
const purchasesRouter = require('./controllers/purchases')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const notFound = require('./middleware/notFound')
const handdleErrors = require('./middleware/handdleErrors')
const Product = require('./models/Product')

app.use(express.json())
app.use(cors());

app.get("/", (req, res) =>{
  Product.find({})
    .then(prod =>{
      res.json(prod)
    })
})

app.use('/api/products/', productsRouter)

app.use('/api/purchases/', purchasesRouter)

app.use('/api/users', usersRouter)

app.use('/api/login', loginRouter)

app.use(notFound)
app.use(handdleErrors)

const PORT = 8000
app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`)
})