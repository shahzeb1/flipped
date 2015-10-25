(function() {
'use strict';

app
  .run(run);

run.$inject = ['$http', '$timeout'];

function run($http, $timeout) {

  var moxtra_client_id = "pFGtS5moH6w"; // THIS IS FROM MOXTRA

  getMoxtraToken("this_is_a_userid").then(function(data){
    if(data.status != 200){
      alert("couldn't reach mostra");
    }

    console.log("init moxtra");
    initMoxtra(data.data);
    // try to init chat every 100ms
    var promise = $timeout(function(){
      initMoxtraChat(promise);
    }, 3000);
  });


  function initMoxtra(data) {
    var options = {
        mode: "sandbox", //for production environment change to "production"
        client_id: moxtra_client_id,
        access_token: data.access_token, //valid access token from user authentication
        invalid_token: function(event) {
            alert("Access Token expired for session id: " + event.session_id);
        }
    };

    Moxtra.init(options);

  }

  function getMoxtraToken(userid){
    console.log("getting moxtra token");
    return $http({
      method: 'GET',
      url: 'http://localhost:6001/moxtra?userid=' + userid
    });
  }

  function initMoxtraChat(promise){
    console.log("trying to init chat");
    var options = {
      //unique_id: "unique_id_02",
      binder_id: "B3j4r119OOgJzceOefITjtC",
      iframe: true,
      tagid4iframe: "moxtra-chat-container",
      iframewidth: "820px",
      iframeheight: "450px",
      autostart_meet: true,
      autostart_note: false,
      start_chat: function(event) {
          alert("Chat started session Id: " + event.session_id);
          promise.cancel();
      },
      invite_meet: function(event) {
          alert("Meet invite");
      },
      start_meet: function(event) {
          alert("Meet started session key: " + event.session_key + " session id: " + event.session_id);
      },
      end_meet: function(event) {
          alert("Meet end event");
      },
      invite_member: function(event) {
          alert("Invite member into binder Id: " + event.binder_id);
      },
      request_note: function(event) {
          alert("Note start request");
      },
      error: function(event) {
          promise.cancel();
          alert("Chat error code: " + event.error_code + " error message: " + event.error_message);
      }
    };
    Moxtra.chat(options);
  }

}

})();
