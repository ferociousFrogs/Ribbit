const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { checkOrCreateUser } = require('./utilities/utilityFunctions');
require('dotenv').config();

passport.use(new FacebookStrategy({
  clientID: process.env.FB_APPID || '1871157256463548',
  clientSecret: process.env.FB_APPSECRET,
  callbackURL: 'localhost:3000/'
},
  (accessToken, refreshToken, profile, done) => {
    console.log('hello');
  }
));

passport.serializeUser((user, done) => {
  checkOrCreateUser(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
