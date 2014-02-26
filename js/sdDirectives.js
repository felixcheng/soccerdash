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
			window.onresize = function() {
        scope.$apply();
      };

      //Watch for resizing of the browser for re-rendering
	    scope.$watch(function() {
	      return angular.element(window)[0].innerWidth;
	    }, function() {
	      scope.render();
	    });

	    //Watch for change of scope for re-rendering
	    scope.$watch(scope.favPo, function() {
	      scope.render();
	    });
	    
	    //Trigger the rendering of the position chart
	    scope.render = function() {
	    	iElement[0].innerHTML = "";
	    	var teamPicked = scope.user.favoriteTeam.team;
	    	var poArr = {};
		    poArr[teamPicked] = TeamPo[scope.user.favoriteTeam.team];

		    //Add another series to the data variable 
		    // in case there is a selected team other than the favorite
	    	if (scope.user.favoriteTeam.team !=scope.currentTeam.team){
	    		var team2 = scope.currentTeam.team;
	    		poArr[team2] = TeamPo[scope.currentTeam.team];
	    	}
				plotChart(iElement, iAttrs, poArr);
			}
		}
	}
});

var plotChart= function(ele, domAttr, data){
	// Set up framework for the svg/chart
	var args = Array.prototype.slice.call(arguments);
	var data = args.slice(2);
	var width = domAttr.width || 300;
	var height = domAttr.height || 300;
	var padding = domAttr.padding || 30;
	var maxY = 20;

	var svg = dimple.newSvg(ele[0], width, height);

	//Modify the data for the dimple.js
	var dataCon = [];
	for (var n in data){
		for (var m in data[n]) {
			for (var i = 0; i < data[n][m].length; i++) {
				var temp ={};
		    temp["Position"] = data[n][m][i];
		    temp["Week"] = i+1;
		    temp["Team"] = m;
		    dataCon.push(temp);
			};
		};
	};

	//Use dimple.js to draw the position chart
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

    // Add the bubble series for shift values first so that it is
    // drawn behind the lines
    myChart.addSeries("Team", dimple.plot.bubble);

    // Add the line series on top of the bubbles.  The bubbles
    // and line points will naturally fall in the same places
    var s = myChart.addSeries("Team", dimple.plot.line);

    // Add line markers to the line because it looks nice
    s.lineMarkers = true;

    // Show a legend
    myChart.addLegend(180, 10, 360, 20, "right");
    
    // Draw everything
    myChart.draw();
};

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
