angular.module('teamResultsControllerModule', ['soccerDashServices'])

.controller('TeamResultsController',
  ['$scope', 'statsfcService',
    function($scope, statsfcService) {

  $scope.showTeamResults = false;
  statsfcService.getTeamResults($scope.currentTeam.teampath)
  .then(function(data) {
    $scope.resultData = [];  

    for(var i = 0; i < data.length; i++) {
      if(data[i]['status'] === 'Finished') {
        $scope.resultData.push(data[i]);     
      }
    }

    for(var i = 0; i < $scope.resultData.length; i++){
      $scope.resultData[i].dateiso = statsfcService.formatDate($scope.resultData[i].dateiso); // change dates using helper function
    }

    // re-create the match incidents to be split by home / away team
    for(var i = 0; i < data.length; i++) {
      var homeIncidents = [];
      var awayIncidents = [];
      for(var k = 0; k < data[i]['incidents'].length; k++) {
        if(data[i]['home'] === data[i]['incidents'][k]['team']) {
          homeIncidents.push(data[i]['incidents'][k]);
        } else {
          awayIncidents.push(data[i]['incidents'][k]);  
        }
      }
      data[i]['incidents'] = []; // delete the existing incidents array and replace with newly formed arrays
      data[i]['incidents'].push(homeIncidents);
      data[i]['incidents'].push(awayIncidents);
    }
    $scope.showTeamResults = true;

  });


}]);
