/// Directive to plot charts
soccerDashApp.directive('ngPochart', function(){
	return{
		restrict: 'EA',
		template: '<div><div ng-transclude>Position Change </div>',
		transclude: true,
		controller:  ['$scope', function($scope){
			$scope.favPo = TeamPo[$scope.favorite];
		}],

		link: function(scope, iElement, iAttrs){
			var poArr = scope.favPo;
			window.onresize = function() {
        scope.$apply();
      };
	    scope.$watch(function() {
	      return angular.element(window)[0].innerWidth;
	    }, function() {
	      scope.render();
	    });

	    scope.render = function() {
				plotChart(poArr, iElement,iAttrs);
			}
		}
	}
});

var plotChart= function(data, ele, domAttr){
	var width = domAttr.width || 300;
	var height = domAttr.height || 300;
	var padding = domAttr.padding || 30;
	var maxY = 20;

	var svg = dimple.newSvg(ele[0], width, height);

	console.log(true)

	var dataCon = [];
	data.forEach(function (d, ind) {
		var temp ={}
    temp["Position"] = d;
    temp["Week"] = ind+1;
    // temp["Value"] = 1;
    dataCon.push(temp)
  }, this);

    // Create the chart area
    var myChart = new dimple.chart(svg, dataCon);
    // myChart.setBounds(70, 40, 490, 320);
    
    // Add the x axises 
    var x = myChart.addCategoryAxis("x", "Week");

    // x.addOrderRule("Week");
    var y = myChart.addMeasureAxis("y", "Position");
    
    // Setting min and max dates requires them to be set
    // as actual javascript date objects
    x.overrideMin = 0;
    x.overrideMax = 30;
    y.overrideMin = 21;
    y.overrideMax = 1;
s
    // Add the bubble series for shift values first so that it is
    // drawn behind the lines
    myChart.addSeries(null, dimple.plot.bubble);

    // Add the line series on top of the bubbles.  The bubbles
    // and line points will naturally fall in the same places
    var s = myChart.addSeries(null, dimple.plot.line);

    // Add line markers to the line because it looks nice
    s.lineMarkers = true;

    // Draw everything
    myChart.draw();
};

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

      var chart = d3.select(element[0])
        chart.append("div").attr("class", "chart")
        .selectAll('div')
        .data(scope.data)
        .enter().append('div')

        .append('span')
        .text(function(d) { return d.player + ": " + d.goals; })
        .classed('player-name', true)
        
        .append('div')
        .style('width', function(d) { return (96 / maxGoals) * d.goals + '%'})
        .classed('data-rep', true)
    } 
	};
  return directiveDefinitionObject;
})

