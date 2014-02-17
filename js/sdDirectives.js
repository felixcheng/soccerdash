soccerDashApp.directive('ngPochart', function(){
	return{
		restrict: 'EA',
		template: '<div>Position Change </div>',
		controller:  ['$scope', function($scope){
			$scope.getData = function(team){
				$scope.data = TeamPo[$scope.favorite];
			}
		}],

	}
});


		// template: '<div class="TeamPoChart"><h4>Position Change for{{ngTeam}}</h4><div class="chart"></div></div>',