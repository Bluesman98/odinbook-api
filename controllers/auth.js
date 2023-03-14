require('dotenv').config()
const bcrypt = require("bcryptjs")
const User = require('../models/User')
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) { 
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user)
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
      })) 
      return done(null, user);
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

exports.sign_up_post = function (req, res, next) {

  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) { 
      return next(err);
    }
    
    // otherwise, store hashedPassword in DB
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword
    })
    user.save(err => {
      if (err) { 
        return next(err);
      }
      res.send(user)
    });

  });
 
  };

  exports.sign_in_post =  [
    passport.authenticate('local'),
    function(req, res, next) {
      res.send(req.user)
    }
  ]

  exports.sign_out_get = function(req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  };
