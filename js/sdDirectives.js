/// Directive to plot charts
soccerDashApp.directive('ngPochart', function(){

	return{
		restrict: 'EA',
		template: '<div><div ng-transclude>Position Chart </div>',
		transclude: true,
		controller:  ['$scope', function($scope){
			$scope.favPo = TeamPo[$scope.user.favoriteTeam.team];
			console.log('ngPC', $scope.favPo)
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

	    scope.$watch(scope.favPo, function() {
	    	console.log('change D', scope.favPo, scope.currentTeam.team)
	      scope.render();
	    });
	    
	    scope.render = function() {
	    	iElement[0].innerHTML = "";
	    	var teamPicked = scope.user.favoriteTeam.team;
	    	var poArr = {};
		    poArr[teamPicked] = TeamPo[scope.user.favoriteTeam.team];

	    	if (scope.user.favoriteTeam.team !=scope.currentTeam.team){
					// plotChart(iElement, iAttrs, poArr);
	    // 	} else {
	    		var team2 = scope.currentTeam.team;
	    		poArr[team2] = TeamPo[scope.currentTeam.team];
	    	}
				plotChart(iElement, iAttrs, poArr);
			}
		}
	}
});

var plotChart= function(ele, domAttr, data){
	var args = Array.prototype.slice.call(arguments);
	var data = args.slice(2);
	console.log('p data', data.length, data)
	var width = domAttr.width || 300;
	var height = domAttr.height || 300;
	var padding = domAttr.padding || 30;
	var maxY = 20;

	var svg = dimple.newSvg(ele[0], width, height);

	var dataCon = [];
	for (var n in data){
		console.log('t', data[n]);
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
	console.log('dataCon', dataCon)

	// data.forEach(function (d, ind) {
	// 	var temp ={}
 //    temp["Position"] = d;
 //    temp["Week"] = ind+1;
 //    temp["Team"] = 1;
 //    dataCon.push(temp)
 //  }, this);

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
        .style('width', function(d) { return (96 / maxGoals) * d.goals + '%'})
        .classed('data-rep', true)
    } 
	};
  return directiveDefinitionObject;
})

