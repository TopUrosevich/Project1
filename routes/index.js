var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express' 
  });
});

router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', {
    title: 'Hello, world!'
  });
});

router.get('/userlist', function(req, res, next) {
  var db = req.db;
  var collection = db.get('express_example');
  collection.find({}, {}, function(e, list) {
    res.render('userlist', {
      "userlist": list
    });
  });
});

router.get('/newuser', function(req, res, next) {
  res.render('newuser', {
    title: 'Add New User'
  });
});

router.post('/adduser', function(req, res) {
  console.log('isOk');
  var db = req.db;
  
  var name = req.body.name;
  var username = req.body.username;
  var useremail = req.body.email;
  
  var collection = db.get('express_example');
  
  collection.insert({
    "name": name,
    "username": username,
    "email": useremail
  }, function(err, info){
    if (err) {
      res.send('There was a problem adding the information to the database.');
    } else {
      res.redirect('userlist');
    }
  });
});

module.exports = router;
