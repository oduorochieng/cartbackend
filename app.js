const express = require('express');
var cors = require('cors');
const passport = require('passport')
const Product = require('./models').product
const Category = require('./models').category
const ShoppingCart = require('./models').shopping_cart
const Order = require('./models').order
const OrderDetail = require('./models').order_detail

const db = require('./config/database')
require('./config/passport')
db.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log('Error ' + err))
const app = express();

app.use(function(req, res, next) {
  var allowedOrigins = ['http://104.248.73.139', 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', 'https://sandbox.safaricom.co.ke'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
})

app.use(cors({
    origin: 'http://www.powerafrica.co.ke',
    credentials: true,
  })
  )
  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.get('/', (req,res) => res.send(`INDEX`));

const PORT = process.env.PORT || 8080;

app.use('/products', require('./routes/products'))
app.use('/categories', require('./routes/categories'))
app.use('/departments', require('./routes/departments'))
app.use('/attributes', require('./routes/attributes'))
app.use('/chapaa', require('./routes/chapaa'))
app.use('/shoppingcart', require('./routes/shoppingcart'))
app.use('/customers', require('./routes/customer'))
app.use('/orders', require('./routes/orders'))
app.use('/shipping', require('./routes/shipping'))
app.use('/testing', require('./routes/testroute'))
app.use('/chapaa', require('./routes/chapaa'))
app.use('/protected', require('./routes/protected'))
app.listen(PORT, console.log(`Server started on port ${PORT}`));  
