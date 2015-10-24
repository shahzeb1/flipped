(function() {
'use strict';

app
  .run(run);

run.$inject = ['$http'];

function run($http) {

  getMoxtraToken("this_is_a_userid").then(function(data){
    debugger;
    initMoxtra(data);
  });


  console.log("init moxtra");

  function initMoxtra(data) {
    var options = {
        mode: "sandbox", //for production environment change to "production"
        client_id: data.client_id,
        access_token: data.access_token, //valid access token from user authentication
        invalid_token: function(event) {
            alert("Access Token expired for session id: " + event.session_id);
        }
    };

    Moxtra.init(options, function(e){
      console.log("callback?");
    });
  }

  function getMoxtraToken(userid){
    console.log("getting moxtra token");
    return $http({
      method: 'GET',
      url: 'http://localhost:6001/moxtra?userid=' + userid
    });
  }
}

})();
