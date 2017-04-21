const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

passport.use(new FacebookStrategy({
    clientID: '1871157256463548' || process.env.FB_APPID,
    clientSecret: process.env.FB_APPSECRET
    // callbackURL: "http://www.example.com/auth/facebook/callback"
},
  (accessToken, refreshToken, profile, done) => {
    // Enter database query looking for specified userID
    User.findOrCreate((err, user) => {
      if (err) { return done(err); }
      done(null, user);
    });
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
