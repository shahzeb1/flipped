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
