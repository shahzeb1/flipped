/**
 * Created by lschubert on 10/24/15.
 */

    'use strict';

    app.factory('auth', authFactory);


    authFactory.$inject = ['$http', '$window'];

    function authFactory($http, $window){
        var auth = {};
        auth.saveToken = function (token){
            $window.localStorage['flipped-token'] = token;
        };

        auth.getToken = function (){
            return $window.localStorage['flipped-token'];
        };
        auth.isLoggedIn = function(){
            var token = auth.getToken();

            if(token){
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };
        auth.currentUser = function(){
            if(auth.isLoggedIn()){
                var token = auth.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.username;
            }
        };
        auth.register = function(user){
            return $http.post('/register', user).success(function(data){
                auth.saveToken(data.token);
            });
        };

        auth.logIn = function(user){
            return $http.post('/login', user).success(function(data){
                auth.saveToken(data.token);
            });
        };
        auth.logOut = function(){
            $window.localStorage.removeItem('flipped-token');
        };
        return auth;
    };
