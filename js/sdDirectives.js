/// Directive to open modal
soccerDashApp.directive('modalDialog', function(){
	return {
		restrict: 'EA',
		scope: { 
			show: '='
		},
		replace: true,
		transclude: true,

		link: function(scope, iElement, iAttrs){
 			scope.dialog ={};
 			if (iAttrs.width){
 				scope.dialog.width = iAttrs.width;
 			}
 			if (iAttrs.height){
 				scope.dialog.height = iAttrs.height;
 			}
 			scope.hideModal = function(){
 				scope.show = false;
 			}
		},

template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"


	}
});


// Directive for Bar Charts
soccerDashApp.directive('ngTopScorers', function($parse) {
	var directiveDefinitionObject = {
		restrict: 'EA',
		replace: false,
		scope: {data: '=chartData'},

    link: function (scope, element, attrs) {
      var maxGoals = scope.data[0]['goals'];
      element[0].innerHTML = "";
      var chart = d3.select(element[0])
        chart.append("div").attr("class", "chart")
        .selectAll('div')
        .data(scope.data)
        .enter().append('div')

        .append('span')
        .text(function(d) { return d.player + ": " + d.goals; })
        .classed('player-name', true)
        
        .append('div')
        .style('width', function(d) { return (100 / maxGoals) * d.goals + '%'})
        .classed('data-rep', true)
    } 
	};
  return directiveDefinitionObject;
})

