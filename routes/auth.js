const express = require('express');
const router = express.Router();
const passport = require('passport');

// refers to auth/google
// scope => permission to share
router.get('/google', passport.authenticate('google', {scope: ['profile','email']}));

// callback from passport-google-oauth20 github page:
// note : get rid of /auth , must be only /google/callback as we are in auth file
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
});

module.exports = router;
