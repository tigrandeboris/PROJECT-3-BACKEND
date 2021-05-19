const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

module.exports = (app) => {

  passport.serializeUser((user, cb) => { cb(null, user.id )});


  passport.deserializeUser((id, cb) => {
    User.findById(id)
    .then(user => cb(null, user))
    .catch(error => cb(error))
  }); 


  passport.use(new LocalStrategy({ passReqToCallback: true, usernameField: 'username'}, (req, username, password, next) => {
    User.findOne({ username })
    .then(user => {
      if(!user){
        return next(null, false, { message: 'Usuario o contraseña incorrectos.'});
      }

      if(bcrypt.compareSync(password, user.password)){
        return next(null, user);
      } else {
        return next(null, false, { message: 'Usuario o contraseña incorrectos'});
      }
    }) 
    .catch((error) => next(error))
  }))

  app.use(passport.initialize());
  app.use(passport.session());

}