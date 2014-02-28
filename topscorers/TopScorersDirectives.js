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
});
