const jwtSecret = require('./jwtConfig')
const Customer = require('../models').customer
const BCRYPT_SALT_ROUNDS = 12;
const passport = require('passport')
const passportJWT = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer')
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const jwt= require('jsonwebtoken')

passport.use(
    'register',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
            session: false,
        },
        (req, username, password, done) => {
            let name = username

            try {
                Customer.findOne({
                    where: {
                        [Op.or]: [
                            {
                                name,
                            },
                            { email: req.body.email },
                        ],
                    },
                }).then(customer => {
                    if (customer != null) {
                        console.log('username or email already taken');
                        return done(null, false, {
                            message: 'username or email already taken',
                        });
                    }
                    bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                        Customer.create({
                            name,
                            password: hashedPassword,
                            email: req.body.email,
                            mob_phone: req.body.mobile
                        }).then(user => {
                            console.log('user created');
                            return done(null, user);
                        });
                    });
                });
            }
            catch (err) {
                return done(err)
            }
        },
    ),
);

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false,
        },
        (email, password, done) => {
            
            try {
                console.log("loooooooooooooooooooooooooooooogin")
                Customer.findOne({
                    where: {
                        email: email
                    },
                }).then(user => {
                    console.log("found email")
                    if (user === null) {
                        console.log("user  is null")
                        return done(null, false, { message: 'bad username' });
                    }
                    bcrypt.compare(password, user.password).then(response => {
                        if (response !== true) {
                            console.log('passwords do not match');
                            return done(null, false, { message: 'passwords do not match' });
                        }
                        console.log('user found and authenticated');
                        return done(null, user)
                    });
                });
            } catch (err) {
                return done(err)
            }
        },
    ),
);

passport.use(
    'bearer',
    new BearerStrategy(
    function(token, done){
        console.log("the request is")
        console.log(token)
        console.log("verify the token given")
        jwt.verify(token, "jwt-secret", function(err, customer){
            if(err) {
                //console.log(err)
                return done(err)
            }
            console.log("print the user")
            console.log(customer)
            return done(null, customer ? customer : false);
        })
    }
))