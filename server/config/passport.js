const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Users = require("../models/UserModel");


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret123";

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        Users.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          console.log("User Not Found")
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};