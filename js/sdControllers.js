var soccerDashControllers  = angular.module('soccerDashControllers', ['soccerDashServices', /*'firebase'*/]);

soccerDashControllers.controller("LeagueTblCtrl", ["$scope", "$http",
	function($scope, $http){


}]);

soccerDashControllers.controller("HeaderCtrl", ["$scope",
  function($scope){
    $scope.team = {
      name: "Liverpool FC"
    }
}]);