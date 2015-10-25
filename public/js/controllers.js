app.controller('lectureCtrl', ['$scope', '$routeParams','$location',
  function($scope, $routeParams, $location) {
    $scope.lectureList = ['Lecture 1', 'Lecture 2', 'Lecture 3'];
    $scope.lectureId = $routeParams.lectureId;
    $scope.classId = $routeParams.classId;

    $scope.lectureClick = function(lectureTitle){
      //console.log(classTitle);

      $location.path('/lecture/'+$scope.classId+'/'+lectureTitle);
    }
  }]);


app.controller('homeCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    //$scope.classId = $routeParams.id;
  }]);

app.controller('classCtrl', ['$scope', '$routeParams','auth','fClass','$location',
  function($scope, $routeParams,auth,fClass,$location) {
    $scope.classList = [
    {Name: "Chemistry 101",  Img: "chemistry.jpg",  ClassId: "1"},
    {Name: "Math 101",  Img: "math.jpg",  ClassId: "2"},
    {Name: "Italy",  Img: "italy.jpg",  ClassId: "3"}
    ];

    $scope.classClick = function(classTitle){
      //console.log(classTitle);

      $location.path('/lecture/'+classTitle);
    }

    $scope.classId = $routeParams.id;
    $scope.loggedInUser = auth.currentUser();
    $scope.isTeacher = function(){
      console.log(auth.isTeacher());
      return auth.isTeacher();
    };

    //console.log($scope.teacher);
    //console.log($scope.loggedInUser);
    $scope.studentAddClass = function(){

    };

    var returnObject= fClass.retrieveClasses(auth.currentUserId(),auth.isTeacher());
    console.log(returnObject);

    $scope.getClasses = function(){

          var returnObject= fClass.retrieveClasses(auth.currentUserId(),auth.isTeacher());
      console.log(returnObject);
      //$scope.classList = returnObject;
    };


    $scope.teacherAddClass = function(){
      console.log(auth.currentUser());
        fClass.addClass($scope.class.name, auth.currentUserId());
        //$scope.classList.push(title);
    };

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
      //added the call to authFactory
      auth.register($scope.user).error(function(error){
        $scope.error = error;
      }).then(function(){
        $location.path('/login');
      });
    }

  }]);

app.controller('loginCtrl', ['$scope', '$routeParams','auth','$location',
  function($scope, $routeParams, auth, $location) {
    $scope.user = {};
    $scope.login = function(){
      // added the call to authFactory
      auth.logIn($scope.user).error(function(error){
        $scope.error = error;
      }).then(function(){
        if(user.teacher){
          $location.path('/make/1');
        }else{
          $location.path('/class');
        }
      });

    }
  }]);

app.controller('forumCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.lectureId = $routeParams.lectureId;
    $scope.questionId = $routeParams.questionId;
  }]);

app.controller('makeCtrl', ['$scope', '$routeParams','lectureMake',
  function($scope, $routeParams, lectureMake) {
    $scope.lecture = {};
    $scope.classId = $routeParams.classId;
    $scope.postLecture = function(){
      alert("You called me");
      lectureMake.submitLecture($scope.lecture);


    }
  }]);

app.controller('shoutoutCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $scope.classId = $routeParams.classId;
    // When the submit text message button is clicked
    $scope.sendText = function(){
      
      var textVal = $("textarea#textMessage").val();
      $http({
      method: 'POST',
      url: '/text',
      data: {text: textVal}
      }).then(function successCallback(response) {
        $("#form").hide();
        $("#success").fadeIn("slow");
      }, function errorCallback(response) {
        console.log('error');
        console.log(response);
    });

    }
    
  }]);