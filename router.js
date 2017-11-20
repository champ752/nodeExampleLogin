//manage route
const Authentication  = require('./controller/authentication');
const passport = require('passport');
const passportService = require('./services/passport');


const requireAuth = passport.authenticate('jwt', {session:false});
const requireSignin = passport.authenticate('local',{session:false});
module.exports = function (app) {
    // .get (request type get
    //param request response next
    // app.get('/',function (req,res,next) {
    //     res.send(['water','phone2']);
    // });
    app.get('/ee',requireAuth,function (req,res) {
       res.send({hi:"tjere"});
    });
    //middleware to authenticate user with email and password
    //Only authenticated user can passing thought middleware
    app.post('/signin',requireSignin,Authentication.signin);

    app.post('/signup',Authentication.signup);
};