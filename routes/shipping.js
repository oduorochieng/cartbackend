const express = require('express')
const router = express.Router()
const db = require('../config/database')
//const cache = require('../config/cache')
const url = require('url');
const ShippingRegion = require('../models').shipping_region
const Shipping = require('../models').shipping

router.get('/regions/regionId/:shipping_id', (req, res) => {
    let inShippingRegionId = req.params.shipping_id
    Shipping.findAll({
        where: {
            shipping_region_id: inShippingRegionId
        }
    }).then((shippingInfo) => {
        res.send(shippingInfo)
    })
})

router.get('/regions', (req, res) => {
    ShippingRegion.findAll().then((shippingRegions) => {
        res.send(shippingRegions)
    })
});

module.exports = router