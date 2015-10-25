var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});


//local Variables
var User = require('../db/helper').User;
var insertData = require('../db/flipdb').insertData;
var retrieveUser = require('../db/flipdb').retrieveUser;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/test', function(req, res, next) {
  res.render('test' , {title: 'Express'});
});


router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User(req.body);

  var objToSave = {
    tableName: "appUser",
    object: user
  };

  insertData(objToSave, function (err){
    if(err){ return next(err); }

    return res.json({
      //token: user.generateJWT(),
      status: 200
    })
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  console.log(req.body);
  retrieveUser(req.body.username, req.body.password , function (err,user){
    if(err){ return next(err); }

    if(user){
      var newUser = new User(user);
      return res.json({
        user: newUser,
        token: newUser.generateJWT(),
        sucess: 200});
    } else {
      return res.status(401).json(info);
    }
  });
  });

module.exports = router;
