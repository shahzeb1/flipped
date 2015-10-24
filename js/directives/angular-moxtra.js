(function(angular){
'use strict';

/**
 * @ngdoc directive
 * @name moxtraDirectivesApp.directive:moxtraChat
 * @description
 * # moxtraChat
 */
 var module = angular.module('moxtra', []);

  module.directive('moxtraChat', function () {
    return {
      template: '<div ng-attr-id={{containerId}}><button type="button" class="btn btn-primary" ng-click="startChat()">{{text}}</button></div>',
      restrict: 'E',
      scope: {
        sessionInfo: '='
      },
      controller: function($scope) {

        // set up initial variables
        $scope.containerId = 'chat-container';
        $scope.text = 'Chat';
        $scope.frameWidth = '100%';
        $scope.frameHeight ='100%';
        $scope.autoStartMeet = false;
        $scope.autoStartNote = false;

        $scope.clientId = $scope.sessionInfo.clientId;
        $scope.clientSecret = $scope.sessionInfo.clientSecret;
        $scope.timestamp = new Date().getTime();
        $scope.uniqueId = $scope.sessionInfo.userId; //'unique_user_id' - Unique ID of how user is identified in your system

        // var hash = CryptoJS.HmacSHA256($scope.clientId + $scope.uniqueId + $scope.timestamp, $scope.clientSecret);
        // var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
        // $scope.signature = hashInBase64.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');

        $scope.startChat = function() {
          $scope.getToken();
        };

        $scope.getToken = function () {
          var initOptions = {
            uniqueid: $scope.uniqueId,
            firstname: $scope.sessionInfo.firstName,
            lastname: $scope.sessionInfo.lastName,
            timestamp: $scope.timestamp,
            // signature: $scope.signature,
            get_accesstoken: function(result) {
                console.log('access_token: ' + result.access_token + ' expires in: ' + result.expires_in);
                $scope.startChat(result.access_token);
            },
            error: function(result) {
                console.log('error code: ' + result.error_code + ' message: ' + result.error_message);
            }
          };
          Moxtra.setup(initOptions);
        };

        $scope.startChat = function (accessToken) {
          var chatOptions = {
            iframe: true, //To open the meet in the same window within an iFrame.
            // tab: true, //To open the meet in a new browser tab, N/A if iframe option is set to true.
            tagid4iframe: $scope.containerId, //ID of the HTML tag within which the Meet window will show up. Refer https://developer.grouphour.com/moxo/docs-js-sdk/#meet
            email: $scope.email,
            iframewidth: $scope.frameWidth,
            iframeheight: $scope.frameHeight,
            extension: {
                'show_dialogs': { 'meet_invite': true }
            },
            access_token: accessToken,
            autostart_meet: $scope.autoStartMeet,
            autostart_note: $scope.autoStartNote,
            start_chat: function(event) {
                $scope.sessionInfo.id = event.binder_id;
                $scope.$apply();
                console.log('Chat started binder ID: ' + event.binder_id);
                //Your application server can upload files to meet using the session_id and session_key
            },
            start_meet: function(event) {
                console.log('Meet started session key: ' + event.session_key + ' session id: ' + event.session_id);
            },
            // end_meet: function(event) {
            //     console.log('Meet end event');
            // },
            invite_member: function(event) {
                console.log('Invite member into binder Id: ' + event.binder_id);
            },
            // request_note: function(event) {
            //     console.log('Note start request');
            // },
            error: function(event) {
                console.log('error code: ' + event.error_code + ' message: ' + event.error_message);
            }//,
            // end_meet: function(event) {
            //     console.log('Meet Ended');
            // }
          };
          Moxtra.chat(chatOptions);
        };

      },
      link: function postLink(scope, element, attrs) {
        scope.containerId = attrs.containerId;
        scope.text = attrs.text;
        scope.email = attrs.email;
        scope.frameWidth = attrs.frameWidth;
        scope.frameHeight = attrs.frameHeight;
        if (!angular.isUndefined(attrs.autoStartMeet)) {
          scope.autoStartMeet = attrs.autoStartMeet;
        }
        if (!angular.isUndefined(attrs.autoStartNote)) {
          scope.autoStartNote = attrs.autoStartNote;
        }
      }
    };
  });

})(angular);
