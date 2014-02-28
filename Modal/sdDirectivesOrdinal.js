/// Directive to change numbers to ordinal
soccerDashApp.directive('ngOrdinal', function(){
	return{
		restrict: 'EA',

		scope: { 
			show: '='
		},
		template: '<h4 ng-if="show">Current A Position: {{currentTeam.position}} </h4>', 

		controller:  ['$scope', function($scope){

			$scope.$watch($scope.currentTeam, function(){
				if ($scope.currentTeam){
					$scope.position = $scope.currentTeam.position;
					var teamPo = $scope.currentTeam.position

					if (teamPo == 1){
						teamPo = teamPo + " st"
					} else if (teamPo == 2){
						teamPo = teamPo + " nd"
					} else if (teamPo == 3){
						teamPo = teamPo + " rd"
					} else {
						teamPo = teamPo + " th"				
					}
				}
			})
		}],
	}
	
});