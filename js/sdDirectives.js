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
			console.log(iAttrs)
			plotChart(poArr, iElement,iAttrs);
		}
	}
});

var plotChart= function(data, ele, domAttr){
	
	//Setting the frame

	var width = domAttr.width || 300;
	var height = domAttr.height || 300;
	var padding = domAttr.padding || 30;
	var maxY = 20;

	//Creating co-ordinations (x,y)
	var x = d3.scale.linear()
						.domain([0, data.length])
						.range([0, width]);

	var y = d3.scale.linear()
						.domain([maxY, 0])
						.range([height, 0]);

	//Putting co-or into a line
	var line = d3.svg.line()
								.x(function(d, i){return x(i);})

								.y(function(d){return y(d);});

	//Adding d3 object into the DOM
	var svg = d3.select(ele[0])
						.append('svg:svg')
						.attr('width', width)
						.attr('height', height)
						.append('g')
							.attr('transform', 'translate('+padding+', '+padding+')');


	//Creating the axises
	var xAxis = d3.svg.axis().scale(x)
    						.orient("top") 
    						.tickSize(-height)
    						.ticks(5);

	var yAxis = d3.svg.axis().scale(y)
								.orient('left')
								.ticks(5);
	
	//Appending the axises
	svg.append('g')
			.attr('class','xaxis')
			//Move the x-axis from the top of the chart (default) to the bottom
			.attr("transform", "translate(0," + height*0.9 + ")")
			.call(xAxis);								
	
	svg.append('g')
			.attr('class','yaxis')
			.call(yAxis);


	//Adding the 'path'(chart line) into the graph
	svg.append('path')
			.data([data])
			.attr('d', line)
			.attr("class", "line")
			.attr('stroke-width', '20');

};

/// Directive to open modal
soccerDashApp.directive('modalDialog', function(){
	return {
		restrict: 'EA',
		// templateUrl: 'partials/modal.html',
		scope: { 
			show: '='
		},
		replace: true,
		transclude: true,

		link: function(scope, iElement, iAttrs){
			console.log('in modal')
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

