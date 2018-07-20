const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');


router.get('/', ensureGuest, (req, res) => {
  // res.send('HOME');
  res.render('index/welcome');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  // res.send('DASHBOARD');
  res.render('index/dashboard');
});

router.get('/about',(req, res) => {
  res.render('index/about');
});

module.exports = router;
