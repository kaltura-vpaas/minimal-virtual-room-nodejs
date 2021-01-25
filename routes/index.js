var express = require('express');
var router = express.Router();
var createRoom = require('../lib/createroom');
var joinRoom = require('../lib/joinroom');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Kaltura Virtual Room' });
});

/* POST */
router.post('/', function (req, res, next) {
  createRoom("A Room Name", function (kalturaResponse) {
    console.log("creating room");
    joinRoom(kalturaResponse.id,
      req.body.firstName,
      req.body.lastName,
      req.body.email, function (joinLink) {
        res.redirect(joinLink);
      });
  });
});

module.exports = router;
