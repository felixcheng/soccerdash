var soccerDashControllers  = angular.module('soccerDashControllers', ['soccerDashServices', /*'firebase'*/]);

soccerDashControllers.controller("LeagueTblCtrl", ["$scope", "$http",
	function($scope, $http){      
		$http({
      url: "http://api.statsfc.com/table.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k&competition=premier-league&year=2013/2014",    
      method: "GET",
      }).success(function (data, status) {
      		$scope.teams = data; 
        }).error(function (data, status) {
          $scope.status = status;
        });

    $scope.isFavorite= function(){
    	if ($scope.teams.team === $scope.favorite){
    		$scope.teams.team.favorite = true; 
    	}
    }

	}
	function($scope, $http){


}]);

soccerDashControllers.controller("HeaderCtrl", ["$scope", function($scope){
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