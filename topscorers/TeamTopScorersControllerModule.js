angular.module('teamTopScorersControllerModule', ['soccerDashServices'])

.controller('TeamTopScorersController',
  ['$scope', 'statsfcService',
    function($scope, statsfcService) {

  $scope.$watch('currentTeam', function(newVal, oldVal, scope) {
    if(newVal) {
      $scope.showGoal = false;

      // statsfcService.getTeamTopScorers(newVal.teampath)
      statsfcService.fetchData('top-scorers', newVal.teampath)
      .then(function(data) {
        $scope.goalData = [];
        for(var i = 0; i < 8; i++) { 
          $scope.goalData.push(data[i]);
        }
        $scope.showGoal = true;
      });
    }
  });

}]);
