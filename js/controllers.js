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

app.controller('signupCtrl', ['$scope', '$routeParams','auth','$location',
  function($scope, $routeParams, auth, $location) {
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
      //alert('you called me');
      //added the call to authFactory
      auth.register($scope.user).error(function(error){
        $scope.error = error;
      }).then(function(){
        $location.path('/class');
      });
    }

  }]);

app.controller('loginCtrl', ['$scope', '$routeParams','auth','$location',
  function($scope, $routeParams, auth, $location) {
    $scope.user = {};
    $scope.login = function(){
      //alert('you called me');
      //addded the call to authFactory
      auth.logIn($scope.user).error(function(error){
        $scope.error = error;
      }).then(function(){
        $location.path('/class');
      });

    }
  }]);

app.controller('forumCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.lectureId = $routeParams.lectureId;
    $scope.questionId = $routeParams.questionId;
  }]);

app.controller('makeCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.classId = $routeParams.classId;
  }]);