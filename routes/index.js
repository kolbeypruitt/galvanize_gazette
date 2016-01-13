var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/gazette');
var storydb = db.get('storydb');

/* GET home page. */
router.get('/api/v1/stories', function (req, res, next) {
  return storydb.find().then(function (stories) {
    // console.log(stories);
    res.json(stories);
  });
});

router.post('/api/v1/stories', function (req, res, next) {
  var story = req.body;
  return storydb.insert({
    title: story.title
    , link: story.link
    , image: story.image
    , summary: story.summary
  });
});

router.get('/api/v1/stories/:id', function (req, res, next) {
  return storydb.findOne({_id: req.params.id}).then(function (story) {
    res.json(story);
  });
})

router.post('/api/v1/stories/:id', function (req, res, next) {
  storydb.findOne({_id: req.params.id}).then(function (oldStory) {
    var newStory = oldStory;
    newStory.opinions.push(req.body.opinion);
    return storydb.findAndModify({
      query: { _id: req.params.id },
      update: { $set: { opinions: newStory.opinions } }
    })
    .then(function (updated) {
      console.log(updated);
    })
  })
})

router.get('*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../public/'
  });
});

module.exports = router;
