var express = require('express');
var router = express.Router();

var clientList = require('../src/list/ClientList');
var topicList = require('../src/list/TopicList');
var authApi = require('../src/api/AuthApi');

let port = process.env.PORT || 1337;

var cred = {
  username: 'admin',
  password: 'dxs123'
}

var loggedin = false;

/* GET home page. */
router.get('/', function (req, res, next) {
    if(loggedin){
      res.render('topics', {
        port: port,
        topics: topicList.getTopicList()
      });
    } else {
      res.render('index', { 
        port: port
      });
    }    
});

router.post('/processLogin', function (req, res, next) {
  let usr = req.body.username;
  let pw = req.body.password;
  if (usr == cred.username && pw == cred.password) {
    loggedin = true;
    res.render('topics', {
      port: port,
      topics: topicList.getTopicList()
    });
  } else {
    res.redirect('/');
  }
});

router.get('/topics', function (req, res, next) {
  res.render('topics', { 
    port: port,
    topics: topicList.getTopicList()
  });
});

router.get('/topic-summary', function(req, res, next){
  let topic = req.query.topic;
  res.render('topic-summary', {
    topic_summary: topicList.getTopic(topic)
  });
});

router.get('/live-topic-summary', function(req,res,next){
  let topic = req.query.topic;
  res.json({topic: topicList.getTopic(topic)});
});

router.get('/get-topics', function (req, res, next) {
  res.json({topics: topicList.getTopicList()});
});

router.get('/client', function (req, res, next) {
  res.render('client', { results: clientList.getClientList() });
});

router.post('/add-client', function (req, res, next) {
  authApi.addClient(req, res);
  res.render('client', { results: clientList.getClientList() });
});

router.get('/delete-client', function (req, res, next) {
  authApi.deleteClient(req, res);
  res.render('client', { results: clientList.getClientList() });
});

router.get('/signout', function (req, res, next) {
  if (loggedin) {
    loggedin = false;
  }
  res.redirect('/');
});

module.exports = router;
