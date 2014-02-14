var soccerDashControllers  = angular.module('soccerDashControllers ', ['soccerDashServices', 'firebase']);

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


}]);