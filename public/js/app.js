var app = angular.module('app', [
  'ngRoute',
  'flippedCtrl',
  'moxtra'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }).
      when('/class', {
      	templateUrl: 'templates/classes.html',
      	controller: 'classCtrl'
      }).
      when('/lecture/:classId', {
      	templateUrl: 'templates/lecture_list.html',
      	controller: 'lectureCtrl'
      }).
      when('/lecture/:classId/:lectureId', {
        templateUrl: 'templates/lecture.html',
        controller: 'lectureCtrl'
      }).
      when('/stream/:id', {
      	templateUrl: 'templates/stream.html',
      	controller: 'streamCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
