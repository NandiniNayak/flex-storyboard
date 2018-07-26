const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Story = mongoose.model('stories');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');


router.get('/', ensureGuest, (req, res) => {
  // res.send('HOME');
  res.render('index/welcome');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  // show only stories of logged in user on their dashboard
  Story.find({user:req.user.id})
    .then(stories => {
      // res.send('DASHBOARD');
      res.render('index/dashboard', {
        stories: stories
      });
    });
});

router.get('/about',(req, res) => {
  res.render('index/about');
});

module.exports = router;
