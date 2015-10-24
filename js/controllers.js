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


flippedCtrl.controller('homeCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    init();

    $scope.classId = $routeParams.id;

    $scope.sessionInfo = {
      id : 'session-id',
      clientId: "pFGtS5moH6w",
      clientSecret: "smxeTPLITSI",
      userId: 'unique-user-id', // ideally this comes from the user context
      firstName: 'John', // ideally this comes from the user context
      lastName: 'Smith' // ideally this comes from the user context
    };

    function init(){
      console.log("initting home contrller");
    }

  }]);

flippedCtrl.controller('streamCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.streamId = $routeParams.id;
  }]);
