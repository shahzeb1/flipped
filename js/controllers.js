

app.controller('lectureCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.lectureId = $routeParams.lectureId;
    $scope.classId = $routeParams.classId;
  }]);

app.controller('classCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.classId = $routeParams.id;
  }]);

app.controller('streamCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.streamId = $routeParams.id;
  }]);

app.controller('signupCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.signupType = $routeParams.type;
    // Check if the type is student or teacher
    if($scope.signupType != "student" && $scope.signupType != "teacher"){
    	$scope.signupType = "student";	
    }
    $scope.user = {};
    // Signup button clicked
    $scope.signup = function(){

      alert('you called me');
    }

  }]);

app.controller('loginCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
  }]);