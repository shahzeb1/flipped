var app = angular.module('app', [
  'ngRoute',
  'flippedCtrl'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }).
      when('/classes', {
      	templateUrl: 'templates/classes.html',
      	controller: 'classesCtrl'
      }).
      when('lecture/:id', {
      	templateUrl: 'templates/lecture.html',
      	controller: 'lectureCtrl'
      }).
      when('/stream', {
      	templateUrl: 'templates/stream.html',
      	controller: 'streamCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);