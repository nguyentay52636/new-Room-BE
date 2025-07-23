const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const facebookService = require('../services/facebook.services');

// Kiểm tra Facebook credentials
const hasFacebookCredentials = process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET;

if (!hasFacebookCredentials) {
  console.warn('⚠️ FACEBOOK_APP_ID hoặc FACEBOOK_APP_SECRET chưa được cấu hình trong .env');
  console.warn('⚠️ Facebook login sẽ không khả dụng cho đến khi credentials được cấu hình');
} else {
  // Chỉ cấu hình Facebook Strategy khi có credentials
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.BASE_URL || 'http://localhost:8000'}/api/auth/facebook/callback`,
    profileFields: ['id', 'emails', 'name'],
  }, facebookService.facebookCallback));
  
}

// Lưu user vào session
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

module.exports = passport;
