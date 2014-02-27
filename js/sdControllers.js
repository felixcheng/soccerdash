var soccerDashControllers = angular.module('soccerDashControllers', ['soccerDashServices', 'firebase', 'ngAnimate']);

soccerDashControllers.controller('HomeController',
  ['$scope', function($scope){

}]);

soccerDashControllers.controller("LoginController",
  ["$scope", function($scope){

}]);

soccerDashControllers.controller("SelectController",
  ["$scope", function($scope){

}]);

soccerDashControllers.controller("ProfileController",
  ["$scope", function($scope){

}]);

soccerDashControllers.controller("MiniLeagueCtrl",
  ["$scope", function($scope){

}]);

soccerDashControllers.controller("LeagueTblCtrl", ["$scope",
  function($scope){

}]);

// Team Top Scorers Controller
// soccerDashControllers.controller('TeamTopScorersController', ['$scope', 'statsfcService',
//   function($scope, statsfcService) {

//   $scope.$watch('currentTeam', function(newVal, oldVal, scope) {
//     if(newVal) {
//       $scope.showGoal = false;

//       statsfcService.getTeamTopScorers(newVal.teampath)
//       .then(function(data) {
//         $scope.goalData = [];
//         for(var i = 0; i < 8; i++) { 
//           $scope.goalData.push(data[i]);
//         }
//         $scope.showGoal = true;
//       });
//     }
//   });

// }]);

