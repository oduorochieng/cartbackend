const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/', (req, res, next) => {
    passport.authenticate('bearer', (err, user, info) => {
        if(err)
        res.status(401).send(err)
        res.send(user)        
    })(req, res, next);
});

module.exports = router