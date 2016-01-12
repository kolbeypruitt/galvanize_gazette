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
  console.log(req.body);
  console.log(req.params.id);
  // var opinion = req.body;
  // return storydb.findOne({_id: req.params.id}).then(function (story) {
  //   var newStory = story;
  //   if (!newStory.opinions) {
  //     newStory.opinions = [];
  //   }
  //   newStory.opinions.push(opinion);

  //   return storydb.update(story, newStory).then(function (newStory) {
  //    console.log(newStory);
  //   })
  // })
})

router.get('*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../public/'
  });
});

module.exports = router;
