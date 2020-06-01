const express = require('express')
const router = express.Router()
const db = require('../config/database')
//const cache = require('../config/cache')
const url = require('url');
const querystring = require('querystring');
const ShippingRegion = require('../models').shipping_region
const Shipping = require('../models').shipping

router.get('/regions/regionid/:shipping_region_id', (req, res) => {
    let inShippingRegionId = req.params.shipping_region_id
    Shipping.findOne({
        where: {
            shipping_region_id: inShippingRegionId
        }
    })
})

router.get('/regions', (req, res) => {

    ShippingRegion.findAll().then((shippingRegions) => {
        res.send(shippingRegions)
    })

});
