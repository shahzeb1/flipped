var flippedCtrl = angular.module('flippedCtrl', []);

flippedCtrl.controller('lectureCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.lectureId = $routeParams.lectureId;
    $scope.classId = $routeParams.classId;
  }]);

flippedCtrl.controller('classCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.classId = $routeParams.id;
  }]);

flippedCtrl.controller('streamCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.streamId = $routeParams.id;
  }]);

flippedCtrl.controller('signupCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.signupType = $routeParams.type;
  }]);