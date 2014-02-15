var soccerDashControllers = angular.module('soccerDashControllers', ['soccerDashServices', 'firebase', 'ngAnimate']);
 
soccerDashControllers.controller("LeagueTblCtrl", ["$rootScope", "$scope",

	function($rootScope, $scope){    
		//Give a class 'favorite' to the favorite team's data, enabling highlighting @ view
    console.log($rootScope.league);
    $scope.isFavorite= function(){
    	for (var n in $rootScope.league) {
	    	if ($rootScope[teams][n][team] === $scope.favorite){
	    		$rootScope.teams.team.favorite = true; 
	    	}
	    }
    }
}]);

soccerDashControllers.controller('IndexController',
  ['$rootScope', '$scope', '$location', '$firebaseSimpleLogin', '$firebase', 'statsfcService',
    function($rootScope, $scope, $location, $firebaseSimpleLogin, $firebase, statsfcService) {

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
      $scope.user = user;
      if($scope.members.$child(user['id'])) {
        console.log('The user does already exists:' + user['id']);
        $scope.user.new = false;
      } else {
        //Create a new member
        $scope.members[user['id']] = user;
        $scope.members.$save(user['id']);
        $scope.user.new = true;
        console.log('$scope.user.new');
        console.log($scope.user.new);
      }
      //Add user to the scope, maybe it could be helpful?

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

    // Array of team objects 
		statsfcService.getTeams('premier-league', '2013/2014' )
			.then(function(data) {
        console.log(data);
			  $scope.teams = data;
			});

		//to do- load favorite from firebase
		$scope.favorite = "Liverpool";

}]);

soccerDashControllers.controller('HomeController',
 ['$scope', function($scope){


}]);

soccerDashControllers.controller("LoginController", ["$scope",
  function($scope){

}]);

soccerDashControllers.controller("MiniLeagueCtrl", ["$rootScope", "$scope", 

	function($rootScope, $scope){  
		//Copy the data from 'teams' to 'favoriteTeam' for 
		//the miniLeague Page 
		var teams = $rootScope.league;
    console.log('$scope.favorite');
    console.log($scope.favorite);
  	for (var n in teams) {
    	if (teams[n].team === $scope.favorite){
    		$scope.favoriteTeam = teams[n];
    	}
  	}
  	console.log('favteam', $scope.favoriteTeam)
 
}]);
