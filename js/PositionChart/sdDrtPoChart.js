/// Directive to plot charts
soccerDashApp.directive('ngPochart', function(){
	return{
		restrict: 'EA',
		template: '<div><div ng-transclude>Position Chart </div>',
		transclude: true,
		controller:  ['$scope', function($scope){
			$scope.favPo = TeamPo[$scope.user.favoriteTeam.team];
		}],

		link: function(scope, iElement, iAttrs){
			var poArr = scope.favPo;

			//Force scope to reload data everytime the browser resize 
			window.onresize = function() {
        scope.$apply();
      };

      //Re-render the chart on the resizing of browser
	    scope.$watch(function() {
	      return angular.element(window)[0].innerWidth;
	    }, function() {
	      scope.render();
	    });

	    //Re-render the chart on the update of data
	    scope.$watch(scope.favPo, function() {
	      scope.render();
	    });

	    //Render the position chart
	    scope.render = function() {
	    	iElement[0].innerHTML = "";
	    	var teamPicked = scope.user.favoriteTeam.team;
	    	var poArr = {};
		    poArr[teamPicked] = TeamPo[scope.user.favoriteTeam.team];

		    //Add the data to the position chart in case 
		    //the selected team is different than the favorite
	    	if (scope.user.favoriteTeam.team !=scope.currentTeam.team){
	    		var team2 = scope.currentTeam.team;
	    		poArr[team2] = TeamPo[scope.currentTeam.team];
	    	}
	    	
				plotChart(iElement, iAttrs, poArr);
			}
		}
	}
});
	