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

app.controller('signupCtrl', ['$scope', '$routeParams','auth',
  function($scope, $routeParams, auth) {
    $scope.user = {};
    $scope.signupType = $routeParams.type;
    // Check if the type is student or teacher
    if($scope.signupType != "student" && $scope.signupType != "teacher"){
    	$scope.signupType = "student";	
    }
    
    // Are we dealing with a tacher?
    if($scope.signupType == "teacher"){
      $scope.user.teacher = true;
    }else{
      $scope.user.teacher = false;
    }



    // Signup button clicked
    $scope.signup = function(){
      alert('you called me');
      auth.register($scope.user);
    }

  }]);

app.controller('loginCtrl', ['$scope', '$routeParams','auth',
  function($scope, $routeParams, auth) {
    $scope.user = {};
    $scope.login = function(){
      alert('you called me')
      auth.logIn($scope.user)

    }
  }]);