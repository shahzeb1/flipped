var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
var uuid = require('uuid');

//local Variables
var User = require('../db/helper').User;
var insertData = require('../db/flipdb').insertData;
var retrieveUser = require('../db/flipdb').retrieveUser;
var db = require('../db/flipdb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/test', function(req, res, next) {
  res.render('test' , {title: 'Express'});
});

router.get('/classes/:id/:teacher', function(req,res,next) {
  var classes = [];
  //
  if (req.params.teacher == 1) {
    classes = db.retrieveTeacherClass(req.query.id)
  } else if (req.params.teacher == 0) {
    classes = db.retrieveStudentClasses(req.query.id)
  }
  //add dashboard/classes page
    return res.json({
      status: 200,
      classes: classes
    })
});

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  console.log(req.body);

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

router.post('/class', function(req, res,next) {
  var newClass = req.body;
  console.log(newClass);
  newClass.id = uuid.v4();
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 7; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  newClass.code = text;
  var objToSave = {
    tableName: "class",
    object: newClass
  };
  console.log("before saving");
  insertData(objToSave, function(err){
    return res.json({
      code: newClass.code,
      success: 200
    });
  });
});

//need to figure out how to save a file when we do this
router.post('/class/:class/lecture', function(req, res,next) {
  var lecture = req.body;
  console.log(lecture);
  lecture.id = uuid.v4();

  var objToSave = {
    tableName: "lecture",
    object: lecture
  };
  console.log("before saving");
  insertData(objToSave, function(err){
    return res.json({
      lecture: lecture,
      success: 200
    });
  });
});

module.exports = router;
