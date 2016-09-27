(function() {
	var margin = { top: 30, left: 30, right: 30, bottom: 30},
	height = 400 - margin.top - margin.bottom,
	width = 780 - margin.left - margin.right;

	console.log("Building chart 2");

	var svg = d3.select("#chart-2")
				.append("svg")
				.attr("height", height + margin.top + margin.bottom)
				.attr("width", width + margin.left + margin.right)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Create your scales	
	var xPositionScale = d3.scaleLinear().range([0, width]);
  	var yPositionScale = d3.scaleLinear().range([height, 0]);

  	var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

	// Create a d3.line function
	var line = d3.line()
    .x(function(d){ return xPositionScale(d.TIME); })
    .y(function(d){ return yPositionScale(d.Value); })
    .curve(d3.curveMonotoneX)

	// Import your data file using d3.queue()
	d3.queue()
		.defer(d3.csv, "alcohol-consumption.csv", function(d){
			d.Value = +d.Value;
			return d;
		})
		.await(ready);

	// Fix up the function definition! It doesn't just get an error...
	function ready(error, datapoints) {

	var minYear = d3.min(datapoints, function(d) { return d.TIME });
    var maxYear = d3.max(datapoints, function(d) { return d.TIME });
    xPositionScale.domain([minYear, maxYear])

    var minValue = d3.min(datapoints, function(d) {return d.Value});
    var maxValue = d3.max(datapoints, function(d) {return d.Value});
    yPositionScale.domain([minValue, maxValue])

		// Draw your dots
	svg.selectAll(".alcohol-values")
		.data(datapoints)
		.enter().append("circle")
		.attr("r", 2)
		.attr("class", "alcohol-values")
		.attr("fill", function(d){
			return colorScale(d.LOCATION)
		})
		.attr("cx", function (d){
			return xPositionScale(d.TIME)
		})
		.attr("cy", function(d){
			return yPositionScale(d.Value)
		});

		// You have many, many datapoints but only need a few lines...
		// how do you group them together?
	var nested = d3.nest()
		.key(function(d){
			return d.LOCATION
		})
		.entries(datapoints)

	svg.selectAll(".alcohol-lines")
		.data(nested)
		.enter().append("path")
		.attr("d", function(d){
			return line(d.values);
		})
		.attr("fill", "none")
		.attr("stroke", function(d){
			return colorScale(d.key);
		})


		// Add your axes
	  var xAxis = d3.axisBottom(xPositionScale).tickFormat(d3.format('.0f'));
      svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      var yAxis = d3.axisLeft(yPositionScale);
      svg.append("g")
        .attr("class", "axis y-axis")
        .call(yAxis);
	}
})();