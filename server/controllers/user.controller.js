const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');

router.post('/register', register);
router.post('/authenticate', authenticate);
router.post('/addnote', addnote);
router.post('/getallnotes',getallnotes);
//function for register
function register(req, res) {
    userService.create(req.body)
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function(err) {
            res.status(400).send(err);
    });
}
//function for authentication
function authenticate(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function(user) {
            if (user) {
                //req.session.current_user = user;
                res.send(user);
            } else {
                res.status(400).send('Username or password is incorrect');
            }
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}
//function to add notes in the database//
function addnote(req, res) {
  userService.addnote(req.body)
      .then(function() {
          res.sendStatus(200);
      })
      .catch(function(err) {
          res.status(400).send(err);
  });
}
function getallnotes(req, res) {
  userService.getallnotes()
      .then(function(data) {
          res.send(data);
      })
      .catch(function(err) {
          res.status(400).send(err);
  });
}
module.exports = router;
