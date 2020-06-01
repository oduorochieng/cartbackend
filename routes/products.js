const express = require('express')
const router = express.Router()
const db = require('../config/database')
//const cache = require('../config/cache')
const url = require('url');
const querystring = require('querystring');
const Product = require('../models').product
const Category = require('../models').category
const Sequelize = require('sequelize')
var amqp = require('amqplib/callback_api');

router.get('/', (req, res) => {

  let inDepartmentId = 1
  Product.findAll({
    include: [{// Notice `include` takes an ARRAY
      model: Category,
      where: { department_id: inDepartmentId },
    }],
    where: { display: 0 },
    offset: 1,
    limit: 8
  })
    .then(products => res.send(products))
    .catch(console.error)
})

router.get('/inDepartment/:id', (req, res) => {

  let inDepartmentId = req.params.id
  let key = `/products/inDepartment/${inDepartmentId}`

  /*cache.get(key, (err, result) => {
    console.log("get from cache")
    if (result !== null) {
      return res.send(result)
    }
  })
*/
  Product.findAll({
    include: [{
      model: Category,
      where: { department_id: inDepartmentId },
    }],
    where: { display: 0 },
    offset: 1,
    limit: 8
  })
    .then(products => {
      console.log("set cache")
      res.send(products)
      //cache.set(key, products, () => {
      //})
    })
    .catch(console.error)
})

router.get('/inCategory/:id', (req, res) => {
  let inCategorytId = req.params.id
  let key = `/products/inCategory/${inCategorytId}`

  /*cache.get(key, (err, result) => {
    if (result !== null) {
      return res.send(result)
    }
  })*/


  Product.findAll({
    include: [{
      model: Category,
      where: { category_id: inCategorytId },
    }],
    where: { display: 0 },
    offset: 1,
    limit: 8
  })
    .then(products => {
      res.send(products)
      //cache.set(key, products, () => {
      //})
    })
    .catch(console.error)
})

router.post('/inCategory/pagination/:id', (request, response) => {

  let { category_id, productsPerPage, startItem } = request.body.params

  let key = `/products/inCategory/pagination${category_id}${startItem}`

  /*cache.get(key, (err, result) => {
    if (result !== null) {
      return response.send(result)
    }
  })*/

  Product.findAll({
    include: [{
      model: Category,
      where: { category_id: category_id },
    }],
    where: { display: 0 },
    offset: startItem,
    limit: productsPerPage
  })
    .then(products => {
      response.send(products)
      //cache.set(key, products, () => {
      //})
    })
    .catch(console.error)
})

router.post('/inDepartment/pagination/:id', (request, response) => {

  let { department_id, productsPerPage, startItem } = request.body.params
  
  let key = `/products/inDepartment/pagination${department_id}${startItem}`
  /*cache.get(key, (err, result) => {
    if (result !== null) {
      return response.send(result)
    }
  })*/
  Product.findAll({
    include: [{
      model: Category,
      where: { department_id: department_id },
    }],
    where: { display: 0 },
    offset: startItem,
    limit: productsPerPage
  })
    .then(products => {
      response.send(products)
      //cache.set(key, products, () => {
      //})
    })
    .catch(console.error)
})

router.post('/search*', (request, response) => {

  let { inSearchString, inAllWords, inShortProductDescriptionLength, inProductsPerPage, inStartItem } = request.body.params
  console.log(inSearchString)
  let key = `/products/search/${searchString}$`

  /*cache.get(key, (err, result) => {
    if (result !== null) {
      return response.send(result)
    }
  })*/

  Product.findAll({
    where: Sequelize.literal('MATCH (name, description) AGAINST (:searchString)'),
    replacements: {
      searchString: inSearchString
    }
  }).then(products => {
    response.send(products)
    //cache.set(key, products, () => {  
    //})
  })
  .catch(console.error)
})

router.get('/rabbit', (req, res) => {

  let inDepartmentId = 1
  Product.findAll({
    include: [{// Notice `include` takes an ARRAY
      model: Category,
      where: { department_id: inDepartmentId },
    }],
    offset: 1,
    limit: 8
  })
    .then(products => 
      {
        amqp.connect('amqp://localhost', function(error0, connection){
    if(error0){
        throw error0;
    }
    connection.createChannel(function(error1, channel){
        if(error1){
            throw error1;
        }
        console.log("This are the products")
        console.log(products)
        var queue = 'hello';
        var msg = JSON.stringify(products);

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg)
    })
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
})
      })
    .catch(console.error)
})

module.exports = router