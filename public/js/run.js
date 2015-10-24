(function() {
'use strict';

app
  .run(run);

run.$inject = ['$http'];

function run($http) {

  var moxtra_client_id = "pFGtS5moH6w"; // THIS IS FROM MOXTRA

  getMoxtraToken("this_is_a_userid").then(function(data){
    if(data.status != 200){
      alert("couldn't reach mostra");
    }
    initMoxtra(data.data);
  });


  console.log("init moxtra");

  function initMoxtra(data) {
    var options = {
        mode: "sandbox", //for production environment change to "production"
        client_id: moxtra_client_id,
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
