var soccerDashControllers = angular.module('soccerDashControllers', ['soccerDashServices', 'firebase']);
 
soccerDashControllers.controller("LeagueTblCtrl", ["$scope",

	function($scope){    
		//Give a class 'favorite' to the favorite team's data, enabling highlighting @ view
    $scope.isFavorite= function(){
    	for (var n in $scope.teams) {
	    	if ($scope[teams][n][team] === $scope.favorite){
	    		$scope.teams.team.favorite = true; 
	    	}
	    }
    }
}]);

soccerDashControllers.controller('IndexController',
  ['$scope', '$location', '$firebaseSimpleLogin', '$firebase', 'soccerDashServices',
    function($scope, $location, $firebaseSimpleLogin, $firebase, soccerDashServices) {

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

  		//After the login, fetch the service to get the list of teams 
			soccerDashServices.getTeams('premier-league', '2013/2014', )
			.then(function(data) {
			  $scope.teams = data;
			});

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

    //Navigation menu management
    // show / hide for nav
    $scope.selected = false;

    $scope.showNav = function(){
      $scope.selected = true;
    };

    $scope.hideNav = function(){
      $scope.selected = false;
    }


}]);

soccerDashControllers.controller('HomeController',
 ['$scope', function($scope){


}]);

soccerDashControllers.controller("LoginController", ["$scope",
  function($scope){

}]);


