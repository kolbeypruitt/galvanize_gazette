var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/gazette');
var storydb = db.get('storydb');

/* GET home page. */
router.get('/api/v1/stories', function (req, res, next) {
  return storydb.find().then(function (stories) {
    res.json(stories);
  })
})

router.post('/api/v1/stories', function (req, res, next) {
  var story = req.body;
  return storydb.insert({
    title: story.title
    , link: story.link
    , image: story.image
    , summary: story.summary
  }).then(function (story) {
    console.log(story);
  })
})
router.get('*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../public/'
  })
});
module.exports = router;
