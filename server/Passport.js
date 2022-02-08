// passport-google-oauth20
// Passport strategy for authenticating with Google using the OAuth 2.0 API.

// This module lets you authenticate using Google in your Node.js applications. By plugging into Passport, Google authentication can be easily and unobtrusively integrated into any application or framework that supports Connect-style middleware, including Express.

// 1Password, the only password manager you should trust. Industry-leading security and award winning design.

// Status: Build Coverage Quality Dependencies

// Install
// $ npm install passport-google-oauth20
// Usage
// Create an Application
// Before using passport-google-oauth20, you must register an application with Google. If you have not already done so, a new project can be created in the Google Developers Console. Your application will be issued a client ID and client secret, which need to be provided to the strategy. You will also need to configure a redirect URI which matches the route in your application.

// Configure Strategy
// The Google authentication strategy authenticates users using a Google account and OAuth 2.0 tokens. The client ID and secret obtained when creating an application are supplied as options when creating the strategy. The strategy also requires a verify callback, which receives the access token and optional refresh token, as well as profile which contains the authenticated user's Google profile. The verify callback must call cb providing a user to complete authentication.

const passport = require("passport");
const user = require("./Models/user.js");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((id, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  user.findById(id, (err, user) => {
    done(err, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "664020622197-h8henpf256g1e1llh4hkcfr56uiuvtfo.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      user.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  )
);
