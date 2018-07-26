const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');


// Stories Index
router.get('/', (req, res) => {
  // fetch public stories
  Story.find({status: 'public'})
  // populate suer with user fields : access association
    .populate('user')
    .then(stories => {
      // res.send('STORIES');
      res.render('stories/index', {
        stories: stories
      });
    });

});

// show single Story
router.get('/show/:id', (req, res) => {
  // note: when an id is passed use findOne method
  Story.findOne({
    _id: req.params.id
  })
  .populate('user')
  .then( story => {
    res.render('stories/show', {
      story: story
    });
  });
});

//Stories new form
router.get('/new', ensureAuthenticated, (req, res) => {
  // res.send('STORIES');
  res.render('stories/new');
});
// edit story form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  console.log('edit story');
  Story.findOne({
    _id: req.params.id
  })
  .then( story => {
    // res.send('STORIES');
    res.render('stories/edit', {
      story: story
    });
  });
});

// process Add Story
router.post('/', (req, res) => {
  /* step 1:
  res.send('sent')
  step 2:
  console.log(req.body); //{ title: '', status: 'public', allowComments: 'on', body: '' }
  res.send('hello')
  step 3:
  note: allowComments gets saved as on when checked and allowComments does not exist when unchecked, hence we need a check to store true or false*/

  let allowComments;

  if(req.body.allowComments){
    allowComments = true;
  } else {
    allowComments = false;
  }
  // create story object
  const newStory = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments: allowComments,
    user: req.user.id
  }

  // Create Story
  new Story(newStory)
    .save()
    .then(story => {
      res.redirect(`/stories/show/{story.id}`);
    });
});
module.exports = router;
