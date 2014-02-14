var soccerDashControllers = angular.module('soccerDashControllers', ['soccerDashServices', 'firebase']);

soccerDashControllers.controller("LeagueTblCtrl", ["$scope", "$http",

	function($scope, $http){  
		$http.jsonp("http://api.statsfc.com/table.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k&competition=premier-league&year=2013/2014?callback=JSON_CALLBACK").then( function ( response ) {
	    $scope.teams = response.data;
	    console.log($scope)
		});    

    $scope.isFavorite = function(){
      if ($scope.teams.team === $scope.favorite){
        $scope.teams.team.favorite = true; 
      }
    };

}]);

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
=======
	}]);
>>>>>>> Change to 'jsonp'

soccerDashControllers.controller("HomeController", ["$scope", function($scope){
  // Array of team objects 
  $scope.teams = [ 
    { shortName: "arsenal", fullName: 'Arsenal' },
    { shortName: "aston-villa", fullName: 'Aston Villa' },
    { shortName: "cardiff-city", fullName: 'Cardiff City' },
    { shortName: "chelsea", fullName: 'Chelsea' },
    { shortName: "crystal-palace", fullName: 'Crystal Palace' },
    { shortName: "everton", fullName: 'Everton' }, 
    { shortName: "fulham", fullName: 'Fulham' },
    { shortName: "hull-city", fullName: 'Hull City' },
    { shortName: "liverpool", fullName: 'Liverpool' }, 
    { shortName: "manchester-city", fullName: 'Manchester City' }, 
    { shortName: "manchester-united", fullName: 'Manchester United' }, 
    { shortName: "newcastle-united", fullName: 'Newcastle United' },
    { shortName: "norwich-city", fullName: 'Norwich City' }, 
    { shortName: "southampton", fullName: 'Southampton' }, 
    { shortName: "stoke-city", fullName: 'Stoke City' }, 
    { shortName: "sunderland", fullName: 'Sunderland' }, 
    { shortName: "swansea-city", fullName: 'Swansea City' }, 
    { shortName: "tottenham-hotspur", fullName: 'Tottenham Hotspur' }, 
    { shortName: "west-bromwich-albion", fullName: 'West Bromwich Albion' }, 
    { shortName: "west-ham-united", fullName: 'West Ham United' }
  ];

}]);

soccerDashControllers.controller("LoginController", ["$scope",
  function($scope){

}]);
