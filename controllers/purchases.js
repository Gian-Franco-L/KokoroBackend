const purchasesRouter = require('express').Router()
const Purchase = require('../models/Purchase')
const User = require('../models/User')
const userExtractor = require('../middleware/userExtractor')

purchasesRouter.get('/', (req, res) =>{
  Purchase.find({}).populate('user', {
    username: 1,
    name: 1
  })
    .then(purch =>{
      res.json(purch)
    })
})

purchasesRouter.delete('/:id', userExtractor, (req, res, next) =>{
  const { id } = req.params

  Purchase.findByIdAndDelete(id)
    .then(() =>{
      res.status(204).end()
    })
    .catch(err =>{
      next(err)
    })
})

purchasesRouter.post('/', userExtractor, async (req, res, next) =>{
  const { info, total, email } = req.body

  const user = await User.findOne({email})

  if(!email || !info || !total){
    return res.status(400).json({
      error: 'Purchase.content is missing'
    })
  }

  const newPurchase = new Purchase({
    info: info,
    total: total,
    status: "on",
    user: user._id
  })

  try{
    const savedPurchase = await newPurchase.save()
    user.purchase = [...user.purchase, savedPurchase]
    await user.save()
    res.json(savedPurchase)
  }catch(err){
    next(err)
  }
})

purchasesRouter.put('/:id', userExtractor, (req, res) =>{
  const { id } = req.params
  const changedPurchase = req.body

  Purchase.findByIdAndUpdate(id, changedPurchase)
    .then(result =>{
      res.json(result)
    })
})

module.exports = purchasesRouter