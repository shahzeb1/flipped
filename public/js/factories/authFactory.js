/**
 * Created by lschubert on 10/24/15.
 * used for authentication for login and signup
 */

    'use strict';

    app.factory('auth', authFactory);


    authFactory.$inject = ['$http', '$window'];

    function authFactory($http, $window){
        var auth = {};
        auth.saveToken = function (token){
            $window.localStorage['flipped-token'] = token;
        };

        auth.saveUserObject = function(user){
            //console.log(user);
            $window.localStorage['user-name'] = user.username;
            $window.localStorage['user-id'] = user.id;
            $window.localStorage['user-teacher'] = user.teacher;
        }

        auth.getToken = function (){
            return $window.localStorage['flipped-token'];
        };

        //auth.getUserObject = function(){
        //    return $window.localStorage['user-object'];
        //};

        auth.isLoggedIn = function(){
            var token = auth.getToken();

            if(token){
                //console.log(token);
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };
        auth.currentUser = function(){
            if(auth.isLoggedIn()){
                //var user = auth.getUserObject();

                return localStorage['user-name'];
            }
        };
        auth.currentUserId = function(){
            if(auth.isLoggedIn()){
                //var user = auth.getUserObject();

                return localStorage['user-id'];
            }
        };
        auth.isTeacher = function(){

            if(auth.isLoggedIn()){
                //var user = auth.getUserObject();
                //console.log(user["username"]);
                return localStorage['user-teacher'];
            }

        };

        auth.register = function(user){
            return $http.post('/register', user).success(function(data){
                //console.log(data.token);
                auth.saveToken(data.token);
                auth.saveUserObject(data.user);
            });
        };

        auth.logIn = function(user){
            return $http.post('/login', user).success(function(data){
                //console.log(data);
                auth.saveToken(data.token);
                auth.saveUserObject(data.user);
            });
        };
        auth.logOut = function(){
            $window.localStorage.removeItem('flipped-token');
        };
        return auth;
    };
