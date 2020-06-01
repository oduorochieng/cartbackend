const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/', (req, res, next) => {
    passport.authenticate('bearer', (err, customer, info) => {
        if(err)
        res.status(401).send(err)
        let result ={}
        result.mob_phone=customer.customer.mob_phone
        result.customer_id=customer.customer.customer_id
        console.log(customer.customer.customer_id)
        console.log(result)
        res.send(result)        
    })(req, res, next);
});

module.exports = router