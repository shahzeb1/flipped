/*eslint-env node*/

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var _ = require('lodash');
var request = require('request');
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

app.use(express.static('public'));

app.get('/moxtra', function(req, res) {
  if(!_.has(req, "query.userid")){
    res.send('no user');
  }

  var userid = req.query.userid;

  request.post({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url:     'https://apisandbox.moxtra.com/oauth/token',
    body:    "client_id=pFGtS5moH6w&" +
               "client_secret=smxeTPLITSI&"+
              "grant_type=http://www.moxtra.com/auth_uniqueid&"+
              "uniqueid=INSERT_UNIQUE_USER_IDENTIFIER&"+
              "timestamp=" + Date.now() + "&"+
              "firstname=" + userid + "&"+
              "lastname=" + "test"
  }, function(error, response, body){
    res.send(body);
  });


});
