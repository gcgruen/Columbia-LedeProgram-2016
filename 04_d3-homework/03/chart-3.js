(function() {
	var margin = { top: 30, left: 30, right: 30, bottom: 30},
	height = 400 - margin.top - margin.bottom,
	width = 780 - margin.left - margin.right;

	console.log("Building chart 3");

	var svg = d3.select("#chart-3")
				.append("svg")
				.attr("height", height + margin.top + margin.bottom)
				.attr("width", width + margin.left + margin.right)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Create your scales
	var xPositionScale = d3.scaleLinear().range([0, width]);
  	var yPositionScale = d3.scaleLinear().range([height, 0]);

  	var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

	// Do you need a d3.line function for this? Maybe something similar?

	var line = d3.area()
		.x(function(d){
			return xPositionScale(d.Year)
		})
		.y0(function(d){
			return yPositionScale(d.Value)
		})
		.y1(height)
		.curve(d3.curveMonotoneX)

	// Import your data file using d3.queue()
	d3.queue()
		.defer(d3.csv, "air-emissions.csv", function (d){
			d.Year = +d.Year;
			d.Value = +d.Value;
			return d;
		})
		.await(ready);

	// Fix up the function definition! It doesn't just get an error...
	function ready(error, datapoints) {

	var minYear = d3.min(datapoints, function(d) { return d.Year });
    var maxYear = d3.max(datapoints, function(d) { return d.Year });
    xPositionScale.domain([minYear, maxYear])

    var minValue = d3.min(datapoints, function(d) {return d.Value});
    var maxValue = d3.max(datapoints, function(d) {return d.Value});
    yPositionScale.domain([minValue, maxValue])

		// Draw your dots
	svg.selectAll(".emission-values")
		.data(datapoints)
		.enter().append("circle")
		.attr("r", 2)
		.attr("class", "emission-values")
		.attr("fill", function(d){
			return colorScale(d.Country)
		})
		.attr("cx", function (d){
			return xPositionScale(d.Year)
		})
		.attr("cy", function(d){
			return yPositionScale(d.Value)
		});

		// Draw your areas (make sure you can see through them a little!)

	var nested = d3.nest()
		.key(function(d){
			return d.Country
		})
		.entries(datapoints)

	svg.selectAll(".emission-lines")
      .data(nested)
      .enter().append("path")
      .attr("d", function(d) {
        return line(d.values);
      })
      .attr("stroke", "none")
      .attr("fill", function(d) {
        return colorScale(d.key);
      })
      .attr("opacity", "0.4")

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