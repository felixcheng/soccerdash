var soccerDashControllers = angular.module('soccerDashControllers', ['soccerDashServices', 'firebase']);

soccerDashControllers.controller('IndexController',
  ['$scope', '$location', '$firebaseSimpleLogin', '$firebase',
    function($scope, $location, $firebaseSimpleLogin, $firebase) {

    //Firebase members data collection
    var dataRef = new Firebase('https://soccerdashboard.firebaseio.com/members');

    //Firebase/Github Authentication
    $scope.loginObj = $firebaseSimpleLogin(dataRef);

    //Listening to login
    $scope.$on("$firebaseSimpleLogin:login", function(evt, user) {
      console.log("User " + user.id + " successfully logged in!");
      $location.path("/"); //When a user is logged in, redirect him to the '/''
      //Add user to the list of members, will not add the user if it already exists because same key
      $scope.members = $firebase(dataRef);
      $scope.members[user['id']] = user;
      $scope.members.$save(user['id']);
      //Add user to the scope, maybe it could be helpful?
      $scope.user = user;
    });

    //Listening to logout
    $scope.$on("$firebaseSimpleLogin:logout", function(evt) {
      console.log("User logged out!");
      $location.path("/login"); //When a user is logged out, redirect him to '/login'
    });

    //Listening to authentication error
    $scope.$on("$firebaseSimpleLogin:error", function(err) {
      console.log("Authentication error: " + err);
    });

}]);

soccerDashControllers.controller("LeagueTblCtrl", ["$scope", "$http",
  function($scope, $http){

}]);

soccerDashControllers.controller("HeaderCtrl", ["$scope",
  function($scope){
    //TO DO: The selected team should already be in the $scope, loaded by the home controller
    $scope.team = {
      name: "Liverpool FC"
    };
}]);

soccerDashControllers.controller("LoginController", ["$scope",
  function($scope){

}]);

soccerDashControllers.controller("HomeController", ["$scope",
  function($scope){

}]);