const express = require('express')
const router = express.Router()
//const cache = require('../config/cache')
const Product = require('../models').product
const Department = require('../models').department
const Category = require('../models').category

router.get('/', (req, res) => {

    Department.findAll().then((departments) =>{
        res.send(departments)
    })
        
})

router.get('/totalitems/:id', (req, res) => {
    let inDepartmentId = req.params.id

    Product.count({
        include: [{
            model: Category,
            where: { department_id: inDepartmentId },
        }]
    }).then((count) => {
        let list = []
        let obj = {}
        obj.products_on_department_count = count
        list.push(obj)
        res.send(list)
        //console.log(JSON.stringify(list))
        
    })

})

router.post('/products/:id', (req, res) => {
    
    let { id, productsPerPage, startItem } = request.body.params
    Product.findAll({
        include: [{
            model: Category,
            where: { department_id: id },
        }],
        offset: startItem,
        limit: productsPerPage
    }).then((products) => {
        res.send(products)
    })

})


module.exports = router