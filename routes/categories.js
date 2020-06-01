const express = require('express')
const router = express.Router()
//const cache = require('../config/cache')
const Product = require('../models').product
const Category = require('../models').category

router.get('/', (req, res) => {

    Category.findAll().then((categories) => {
        res.send(categories)
    })
})

router.get('/inDepartment/:id', (req, res) => {
    let inDepartmentId = req.params.id
    Category.findAll({
        where: {
            department_id: inDepartmentId
        }
    }).then((categories) => {
        res.send(categories)
    });
})

router.get('/totalitems/:id', (req, res) => {
    let inCategoryId = req.params.id
    Product.count({
        include: [{
            model: Category,
            where: { category_id: inCategoryId },
        }]
    }).then((count) => {
        let list = []
        let obj = {}
        obj.categories_count = count
        list.push(obj)
        res.send(list)      
    })
})

router.post('/products/*', (req, res) => {
    let { category_id, productsPerPage, startItem } = request.body.params

        Product.findAll({
            include: [{
                model: Category,
                where: { category_id: category_id },
            }],
            offset: startItem,
            limit: productsPerPage
        }).then((products) => {
            res.send(products)         
        })
    })
module.exports = router