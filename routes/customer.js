const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwtSecret = require('../config/jwtConfig')
const nodemailer = require('nodemailer')
//const cache = require('../config/cache')
const jwt = require('jsonwebtoken')
const Customer = require('../models').customer
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 12;

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

router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, customers, info) => {
        console.log("top request")
        if (err) {
            console.error(`error ${err}`);
        }
        if (info !== undefined) {
            if (info.message === 'bad username') {
                console.log("bad username")
                res.status(401).send(info.message)
            } else {
                res.status(403).send(info.message)
            }
        } else {
            req.logIn(customers, () => {
                Customer.findOne({
                    where: {
                        email: req.body.email 
                    },
                }).then(customer => {
                    const token = jwt.sign({ customer: customer}, jwtSecret.secret, {
                        expiresIn: 60 * 60, 
                    });
                    console.log(token)
                    res.status(200).json({token});
                });
            });
        }
    })(req, res, next);
});

router.post('/', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            console.error(info.message);
            res.status(403).send(info.message)
        } else {
            req.logIn(user, error => {
                console.log(user);
                let { username, email } = req.body
                const data = {
                    username: username,
                    email: email
                };
                console.log(data)
                Customer.findOne({
                    where: {
                        name: data.username,
                    },
                }).then(customer => {
                    customer.update({
                        name: data.username,
                        email: data.email
                    }).then(() => {
                        //res.status(200).send({message: 'user created'})
                        res.send(user)
                    })
                })
            })
        }
    })(req, res, next)
})

router.get('/logout', (req, res) => {
   // console.log(req.body.customer.password)
    res.send("The user has been logge out")
})

router.post('/passwordreset', (req, res, next) => {
        console.log("top request")
        
                Customer.findOne({
                    where: {
                        email: req.body.email 
                    },
                }).then(customer => {
                    const token = jwt.sign({ customer: customer}, jwtSecret.secret, {
                        expiresIn: 60 * 60, 
                    });
                    console.log(token)
                    res.status(200).json({token});
                });
});

router.post('/forgotpassword', (req, res) =>{
    
    try {
    Customer.findOne({
        where:{
            email: req.body.email
        }
    }).then(customer=>{
        if(customer){
        const token = jwt.sign({ customer: customer}, jwtSecret.secret, {
            expiresIn: 60 * 60, 
        });

            transporter.sendMail({
            from: '"Nax Oduor 👻" <naxoduor7@gmail.com>',
            to: "naxochieng86@gmail.com",
            subject: "Hello ✔",
            text: "Hello world?",
            html: `<h1>Please click the below link to reset password!</h1></br><p><a href="http://127.0.0.1/resetpassword/${token}">Click here to change password</a></p>`
          }, function(err, info){
        if(err){
        console.log("encountered error")
        res.status(404).json("email not in db")
        }
        else{
        console.log("email sent")
        res.send("recovery email sent")
        }
        });
    }
    else{
        console.log("no customer found")
        res.status(404).json("email not in db")
    }
    }).catch(err =>{
        console.log("no customer found")
        console.log(err)
        res.status(404).json(err)
    })
}
catch(err){
    res.send("email not in db")
    console.log(err)
}
})

router.post('/resetpassword', (req, res, next) => {
    passport.authenticate('bearer', (err, customer, info) => {
        if(err)
        res.status(401).send(err)
        let result ={}
        let customer_id=customer.customer.customer_id
        let password="password";
        bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
        Customer.findOne({
            where:{
                customer_id:customer_id
            }
        }).then(customer=>{
            customer.update({
                password: hashedPassword
            }).then(customer=>{
                res.send("The password was updated successfully")
            }).catch(err=>{
                res.send(err)
            })
        }).catch(err=>{
            res.send(err)
        })
    })        
    })(req, res, next);
});

router.get('/reset', (req, res, next)=> {
    console.log("we are inside the reser route... call bearer token aauthentication");
    passport.authenticate('bearer', (err, customer, info)=>{
        if(err)
        res.status(401).send(err)
        res.send("password reset link a-ok")
    })(req, res, next)
})

router.put('/updatePasswordViaEmail', (req, res, next)=>{
    console.log("found the route")
      passport.authenticate('bearer', (err, customer, info) => {
        if(err)
        res.status(401).send(err)
        bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
        customer.update({
        name: username,
        password: hashedPassword
        }).then(customer=>{
            console.log("password successfully updated")
            res.send(customer);
        })
    })
        res.send("password updated'`")        
    })(req, res, next);
    
})

module.exports = router
