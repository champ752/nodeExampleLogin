const jwt = require('jwt-simple');
const User = require('../models/user');
const configs = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    // Json information to be encoded and secrect
    return jwt.encode( {sub:user.id, iat:timestamp}, configs.secret);

}

exports.signup = function (req, res, next) {
    const email =req.body.email;
    const password = req.body.password;

    // if email or password is NOT provided
    if(!email || !password){
        return res.status(422).send({error:'You must provide email and password'});
    }


    //See if a user with the given email exists
    User.findOne({email:email}, function(err,existingUser) {
        // If a user email does exist, return an error
        if(err){return next(err);}
        if(existingUser){
            return res.status(422).send({error:'Email is in use'});
        }
        //If a user with email does NOT exist, create and save user record
        const user = new User({
                email:email,
                password:password
            });
        user.save(function (err) {
            if(err){return next(err);}
            res.json({token:tokenForUser(user)});
        });
    });
    // Respond to request indicating the user was created
};
exports.signin = function (req, res, next) {
    // Middleware (passport) also passing user object access it with req.user;
    res.send({token:tokenForUser(req.user)});
};

// Check user login using passport library