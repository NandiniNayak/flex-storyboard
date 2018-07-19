var GoogleStrategy = require('passport-google-oauth20').Strategy;
var mongoose = require('mongoose');
var keys = require('./keys');


// export the passport function
module.exports = function(passport){
  passport.use(
    new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true // enables working on heroku
    }, (accessToken, refreshToken, profile, done) => {
       console.log(accessToken);
       console.log(profile);
    })
  )
}
