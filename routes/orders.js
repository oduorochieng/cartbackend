const express = require('express')
const router = express.Router()
//const cache = require('../config/cache')
const ShoppingCart = require('../models').shopping_cart
const Product = require('../models').product
const Order = require('../models').order
const OrderDetail = require('../models').order_detail
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: '',
    user: '',
    clientId: '',
    clientSecret: '',
    refreshToken: '',
  }
});


router.post('/', (req, res) => {
  let inCartId = req.body.order.cartId
  let inCustomerId = req.body.order.customerId
  let inShippingId = req.body.order.shipping_region_id
  let inTaxId = req.body.order.taxId

  let newOrder = Order.build({
    order_id: null,
    created_on: new Date(),
    customer_id: inCustomerId,
    shipping_region_id: inShippingId,
    tax_id: inTaxId
  })
  newOrder.save().then((orderItem) => {
    Order.findOne({
      where: {
        customer_id: inCustomerId,
      },
      order: [['created_on', 'DESC']],
    }).then((currentOrder) => {
      let order_id = JSON.parse(JSON.stringify(currentOrder)).order_id
      ShoppingCart.findAll({
        attributes: ['quantity', 'attributes', 'product_id'],
        include: [{// Notice `include` takes an ARRAY
          model: Product,
          as: "products",
          attributes: ['name', 'price']
        }],
        where: {
          cart_id: inCartId
        }
      }).then((cart) => {
        let total = 0;
        let totalDelivery=0;
        let itemsList = []
        cart.forEach((item, index) => {
          let good = JSON.parse(JSON.stringify(item))
          let attributes = good.attributes
          let obj = {}
          let quantity = good.quantity
          Product.findByPk(good.product_id).then((product) => {
            let productItem = JSON.parse(JSON.stringify(product))
            let unit_cost = productItem.price
            let subtotal = quantity * unit_cost
            let delivery_cost = productItem.delivery_cost
            let subtotalDelivery = quantity * delivery_cost
            total = total + subtotal
            totalDelivery = totalDelivery + subtotalDelivery
            obj.order_id = order_id
            obj.product_id = productItem.product_id
            obj.attributes = attributes
            obj.product_name = productItem.name
            obj.quantity = quantity
            obj.unit_cost = unit_cost
            obj.delivery_cost = delivery_cost
            itemsList.push(obj)
            if (!cart[index + 1]) {
              console.log("list the items list")
              //console.log(itemsList)
              //bulk create orders details
              OrderDetail.bulkCreate(itemsList)
                .then((returneddetails) => {
                  console.log("list the details")
                  console.log(returneddetails)
                  currentOrder.update({
                    total_amount: total
                  }).then(() => {
                    transporter.sendMail({
                      from: '"Nax Oduor 👻" <naxoduor7@gmail.com>',
                      to: "naxochieng86@gmail.com",
                      subject: "Hello ✔",
                      text: "Hello world?",
                      html: `<h1>Order Details!</h1></br><p> The item details are ${JSON.stringify(returneddetails)}
                       and the total amount is ${total + totalDelivery}</p>`
                    }, function(err, info){
                  if(err){
                  console.log("encountered error")
                  console.log(err)
                  }
                  else{
                  console.log("email sent")
                  console.log("we have succesfully sent the email")
                  }
                  });
                    res.send(returneddetails);
                  })
                })
            }
          })
        })
      })
    })
  })
});

module.exports = router;
