var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Contact = require('../models/Contact.js');
var passport = require('passport');
require('../config/passport')(passport);

/* GET ALL Contacts */
router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Contact.find(function (err, contacts) {
      if (err) return next(err);
      res.json(contacts);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/* SAVE Contact */
router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Contact.create(req.body, function (err, post) {
      if (err) return next(err);
      console.log(post);
      res.json(post);

    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/* extract JWT token */
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
