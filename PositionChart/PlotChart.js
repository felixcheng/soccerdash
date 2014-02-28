
var plotChart= function(ele, domAttr, data){
  //Slice data from arguments
  var args = Array.prototype.slice.call(arguments);
  var data = args.slice(2);

  //Set up the area for svg
  var width = domAttr.width || 300;
  var height = domAttr.height || 300;
  var padding = domAttr.padding || 30;
  var maxY = 20;
  var svg = dimple.newSvg(ele[0], width, height);

  //Convert the data for dimple
  var dataCon = convertData(data);

  // Set up chart area & axes
  var myChart = new dimple.chart(svg, dataCon);
  var x = myChart.addCategoryAxis("x", "week");
  var y = myChart.addMeasureAxis("y", "position");

  // Setting min and max dates requires them to be set
  // as actual javascript date objects
  x.overrideMin = 0;
  x.overrideMax = 30;
  y.overrideMin = 21;
  y.overrideMax = 1;

  // Add the bubble series for shift values before the line 
  // so that it is shown behind the lines
  myChart.addSeries("team", dimple.plot.bubble);
  var s = myChart.addSeries("team", dimple.plot.line);

  s.lineMarkers = true;
  myChart.addLegend(180, 10, 360, 20, "right");
  myChart.draw();
};

//Convert the data for dimple
var convertData = function(data){
  var result = [];
  for (var n in data){
    for (var m in data[n]) {
      for (var i = 0; i < data[n][m].length; i++) {
        var temp ={};
        temp.position = data[n][m][i];
        temp.week = i+1;
        temp.team = m;
        result.push(temp);
      };
    };
  };

  return result; 
}
