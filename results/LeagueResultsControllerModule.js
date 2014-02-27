angular.module('leagueResultsControllerModule', ['soccerDashServices'])

.controller('LeagueResultsController',
  ['$scope', 'statsfcService',
    function($scope, statsfcService) {

  $scope.showLeagueResults = false;
  statsfcService.getLeagueResults()
  .then(function(data) {
    $scope.resultsData = [];  

    for(var i = 0; i < data.length; i++) {
      if(data[i]['status'] === 'Finished') {
        $scope.resultsData.push(data[i]);     
      }
    }

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
    $scope.showLeagueResults = true;
  });


}]);
