
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

    // Create the chart area
    var myChart = new dimple.chart(svg, dataCon);
    
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

//Convert the data for dimple
var convertData = function(data){
    var result = [];
    for (var n in data){
        for (var m in data[n]) {
            for (var i = 0; i < data[n][m].length; i++) {
            var temp ={};
            temp["Position"] = data[n][m][i];
            temp["Week"] = i+1;
            temp["Team"] = m;
            result.push(temp);
            };
        };
    };

    return result; 
}
