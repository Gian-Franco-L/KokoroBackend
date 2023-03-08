const productsRouter = require('express').Router()
const Product = require('../models/Product')

productsRouter.get('/', (req, res) =>{
  // Product.find({})
  //   .then(prod =>{
  //     res.json(prod)
  //   })
    res.send("la pagina de inicio")
})

productsRouter.delete('/:id', (req, res) =>{
  const { id } = req.params

  Product.findByIdAndDelete(id)
    .then(() =>{
      res.status(204).end()
    })
    .catch(err =>{
      next(err)
    })
})

productsRouter.post('/', async (req, res, next) =>{
  const newProduct = new Product({
    Name: req.body.Name,
    Price: req.body.Price,
    Date: req.body.Date,
    Size: req.body.Size,
    Material: req.body.Material,
    Stuffing: req.body.Stuffing,
    Img: req.body.Img
  })

  try{
    const savedProduct = await newProduct.save()
    res.json(savedProduct)
  } catch(err) {
    next(err)
  }
})

productsRouter.put('/:id', (req, res) =>{
  const { id } = req.params
  const reqProduct = req.body

  const newProductInfo = {
    Name: reqProduct.Name,
    Price: reqProduct.Price,
    Date: reqProduct.Date,
    Size: reqProduct.Size,
    Material: reqProduct.Fabric,
    Stuffing: reqProduct.Stuffing,
    Img: reqProduct.Img
  }

  Product.findByIdAndUpdate(id, newProductInfo)
    .then(result =>{
      res.json(result)
    })
})

module.exports = productsRouter