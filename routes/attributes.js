const express = require('express')
const router = express.Router()
//const cache = require('../config/cache')
const AttributeValue = require('../models').attribute_value
const Product = require('../models').product
const Promise = require('bluebird');

router.get('/', (req, res) => {
  res.send("found the attributes route")
})

router.get('/inAttribute/:id', (req, res) => {
  console.log(req.url)
  console.log("get attributes afresh")
  let inProductId = req.params.id
  console.log(inProductId)
  Promise.all([
  AttributeValue.findAll({
    include: [{
      model: Product,
      where: { product_id: inProductId }
    }],
    where: { attribute_id: 1}
  }),
  AttributeValue.findAll({
    include: [{
      model: Product,
      where: { product_id: inProductId }
    }],
    where: { attribute_id: 2}
  })
]).spread((sizeAttributes, colorAttributes)=> {
        console.log(JSON.stringify(sizeAttributes))
        console.log(JSON.stringify(colorAttributes))
        res.send({
          "sizeAttributes": sizeAttributes,
          "colorAttributes": colorAttributes
        })
    })
    .catch(console.error)
})

module.exports = router
