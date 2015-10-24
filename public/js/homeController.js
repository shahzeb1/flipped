
flippedCtrl.controller('homeCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.classId = $routeParams.id;

    $scope.sessionInfo = {
      id : 'session-id',
      clientId: "pFGtS5moH6w",
      clientSecret: "smxeTPLITSI",
      userId: 'unique-user-id', // ideally this comes from the user context
      firstName: 'John', // ideally this comes from the user context
      lastName: 'Smith' // ideally this comes from the user context
    };

  }]);
