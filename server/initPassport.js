const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

passport.use(new FacebookStrategy({
    clientID: '1871157256463548' || process.env.FB_APPID,
    clientSecret: process.env.FB_APPSECRET,
    callbackURL: 'http://www.google.com'
},
  (accessToken, refreshToken, profile, done) => {
    console.log('hello');
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
