var soccerDashControllers = angular.module('soccerDashControllers', ['soccerDashServices', 'firebase', 'ngAnimate']);
 
soccerDashControllers.controller("LeagueTblCtrl", ["$rootScope", "$scope",

	function($rootScope, $scope){    
		//Give a class 'favorite' to the favorite team's data, enabling highlighting @ view
    $scope.isFavorite= function(){
    	for (var n in $rootScope.league) {
	    	if ($rootScope[teams][n][team] === $scope.favorite){
	    		$rootScope.teams.team.favorite = true; 
	    	}
	    }
    }
}]);

soccerDashControllers.controller('IndexController',
  ['$scope', '$location', '$firebaseSimpleLogin', '$firebase', 'statsfcService',
    function($scope, $location, $firebaseSimpleLogin, $firebase, statsfcService) {

    //Firebase members data collection
    var dataRef = new Firebase('https://soccerdashboard.firebaseio.com/members');
    $scope.members = $firebase(dataRef);

    //Firebase/Github Authentication
    $scope.loginObj = $firebaseSimpleLogin(dataRef);

    //Listening to login
    $scope.$on("$firebaseSimpleLogin:login", function(evt, user) {

      console.log("User " + user.id + " successfully logged in!");

      //Load the teams detailed data when user has logged in
      statsfcService.getLeague('premier-league','2013/2014')
      .then(function(data) {
        $scope.teams = data;
      });

      //Add current user to the scope
      $scope.user = user;

      //Test if the new user does already exist in the app members
      var userRef = new Firebase('https://soccerdashboard.firebaseio.com/members/' + user['id']);
      //Listen to the 'value' event only once, the event is triggered when async data is received from Firebase
      userRef.once('value', function(snapshot) {
        //If it is a new user, create a firebase member and set its new attribute to true
        //The new attribute will be used to decide if the 'Select a fav team' pop up must be displayed
        if(snapshot.val() === null) {
          console.log('User ' + user['id'] + ' does not exist.');
          //Create a new member
          $scope.members[user['id']] = user;
          $scope.members.$save(user['id']);
          //When a user is new, redirect him to the '/select''
          $location.path("/select");
          //If it is an existing user, get the fav team, set the curr team, get the fav team results and redirect him to '/'
        } else {
          console.log('The user does already exists:' + user['id']);
          console.log('snapshot', snapshot);
          //The favorite team is based on Firebase snapshop data and inserted in the $scope.user object
          console.log('snapshot.val().favoriteTeam', snapshot.val().favoriteTeam);
          $scope.user.favoriteTeam = snapshot.val().favoriteTeam;
          //Set the current team as the favorite team
          $scope.currentTeam = snapshot.val().favoriteTeam;
          console.log('$scope.currentTeam.teamshort', $scope.currentTeam.teamshort);
          //Get the results of the current team
          fetchResult($scope.currentTeam);
          //When a user already exists, redirect him to the '/''
          $location.path("/");

        }
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

    //Store the favorite team in the user object and in the Firebase member data
    $scope.selectFavoriteTeam = function(team) {
      $scope.user.favoriteTeam = team;
      $scope.members[$scope.user.id].favoriteTeam = team;
      $scope.members.$save($scope.user.id);
      //Set the current team as the favorite team when logging in the first time and selecting your fav team
      $scope.currentTeam = team;
      //Get the results of the new current team
      fetchResult(team);
    };

    //Select another current team
    // $scope.favorite = "Liverpool";
    // $scope.currTeam = "liverpool";
    $scope.selectCurrentTeam = function(team) {
      $scope.currentTeam = team;
      fetchResult(team);
    };

    //Moved from the controller 'RecentResult'
    var fetchResult = function(team) {
      statsfcService.getResult(team.teamshort)
      .then(function(data) {
        $scope.resultData = data;

        $scope.date = statsfcService.formatDate(data[0].dateiso);
        
        $scope.homeTeam = data[0].home; 
        $scope.awayTeam = data[0].away; 
        
        $scope.homeScore = data[0].fulltime[0];
        $scope.awayScore = data[0].fulltime[1];

        $scope.homeGoals = [];
        $scope.awayGoals = [];

        for(var i = 0; i < data[0]['incidents'].length; i++) {
          if($scope.homeTeam === data[0]['incidents'][i]['team']) {
            $scope.homeGoals.push(data[0]['incidents'][i]);
          }else {
            $scope.awayGoals.push(data[0]['incidents'][i]);
          }
        }
      });
    };

}]);

soccerDashControllers.controller('HomeController',
 ['$scope', function($scope){

}]);

soccerDashControllers.controller("LoginController",
  ["$scope", function($scope){

}]);

soccerDashControllers.controller("SelectController",
  ["$scope", function($scope){

}]);

// soccerDashControllers.controller("MiniLeagueCtrl", ["$rootScope", "$scope", 

// 	function($rootScope, $scope){  
// 		//Copy the data from 'teams' to 'favoriteTeam' for 
// 		//the miniLeague Page 
// 		var teams = $rootScope.league;
//   	for (var n in teams) {
//     	if (teams[n].team === $scope.user.favoriteTeam){
//     		$scope.favoriteTeam = teams[n];
//     	}
//   	}
//     console.log('fav', $scope.favorite, $scope.favoriteTeam) 
// }]);
soccerDashControllers.controller("MiniLeagueCtrl",
  ["$scope", function($scope){
  //The favorite team is now available in the user object
  //The teams detailed info (league) is available in the scope of IndexController


}]);


// Recent Results (small) Controller
soccerDashControllers.controller("RecentResult", ["$rootScope", "$scope", "statsfcService", function($rootScope, $scope, statsfcService) {

  //Ben, I had to move this code in the IndexController because it needs to run when the current team is known and when it changes
  //i.e. when a user has logged in. I don't like to have everything in the IndexController but I don't see another solution...
  // var teamName = $scope.currentTeam;

  // statsfcService.getResult(teamName)
  //   .then(function(data) {
  //     $scope.resultData = data;

  //     $scope.date = statsfcService.formatDate(data[0].dateiso);
      
  //     $scope.homeTeam = data[0].home; 
  //     $scope.awayTeam = data[0].away; 
      
  //     $scope.homeScore = data[0].fulltime[0];
  //     $scope.awayScore = data[0].fulltime[1];

  //     $scope.homeGoals = [];
  //     $scope.awayGoals = [];

  //     for(var i = 0; i < data[0]['incidents'].length; i++) {
  //       if($scope.homeTeam === data[0]['incidents'][i]['team']) {
  //         $scope.homeGoals.push(data[0]['incidents'][i]);
  //       }else {
  //         $scope.awayGoals.push(data[0]['incidents'][i]);
  //       }
  //     }
  // })
}]);

// Specific Team Results controller
soccerDashControllers.controller("TeamResultsController", ["$rootScope", "$scope", "statsfcService", function($rootScope, $scope, statsfcService) {
  var teamName = $scope.currentTeam.teamshort;

  statsfcService.getTeamResults(teamName)
    .then(function(data) {
      for(var i = 0; i < data.length; i++){
        data[i].dateiso = statsfcService.formatDate(data[i].dateiso); // change dates using helper function
      }
      $scope.resultData = data;

      // re-create the match incidents to be split by home / away team
      for(var i = 0; i < data.length; i++) {
        var homeIncidents = [];
        var awayIncidents = [];
        for(var k = 0; k < data[i]['incidents'].length; k++) {
          if(data[i]['home'] === data[i]['incidents'][k]['team']) {
            homeIncidents.push(data[i]['incidents'][k]);
          }else {
            awayIncidents.push(data[i]['incidents'][k]);  
          }              
        }
        data[i]['incidents'] = []; // delete the existing incidents array and replace with newly formed arrays
        data[i]['incidents'].push(homeIncidents);
        data[i]['incidents'].push(awayIncidents);
      }      
  })
}]);


// Full League Results controller
soccerDashControllers.controller("LeagueResultsController", ["$rootScope", "$scope", "statsfcService", function($rootScope, $scope, statsfcService) {

  statsfcService.getLeagueResults()
    .then(function(data) {
      $scope.resultsData = data;

      for(var i = 0; i < $scope.resultsData.length; i++) {
        $scope.resultsData[i].dateiso = statsfcService.formatDate($scope.resultsData[i].dateiso); // change dates using helper function
      }

      $scope.allResults = [];

      var date = $scope.resultsData[0].dateiso; // set target date to date of first match
      var matchDateArray = []; // array to place all matches of same date 

      for(var i = 0; i < $scope.resultsData.length; i++) {
        if($scope.resultsData[i].dateiso === date) {
          matchDateArray.push($scope.resultsData[i]);
        }else {
          var matchObj = {};
          matchObj['date'] = date;
          matchObj['matches'] = matchDateArray;
          $scope.allResults.push(matchObj);
          matchObj = {};
          matchDateArray = []; // reset to empty array
          date = $scope.resultsData[i].dateiso;
          matchDateArray.push($scope.resultsData[i]);
        }
      }
    })
}]);


soccerDashControllers.controller('TeamSttsCtrl', function($scope) {
  $scope.favPo = TeamPo[$scope.favorite];
});

//Modal controller
soccerDashControllers.controller('ModalCtrl', function($scope) {
  $scope.modalShown= false;
  $scope.toggleModal = function(){
    $scope.modalShown = !$scope.modalShown;
  };
});

// Team Top Scorers Controller
soccerDashControllers.controller("TeamTopScorersController", ["$rootScope", "$scope", "statsfcService", function($rootScope, $scope, statsfcService) {

  $scope.goalData = [];
  for(var i = 0; i < 8; i++) { // this appears to stop the widget container from appearing - refactor in drective? 
    $scope.goalData.push($rootScope.goalData[i])
  }

}]);


