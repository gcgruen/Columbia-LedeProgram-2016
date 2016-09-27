(function() {
	var margin = { top: 30, left: 30, right: 80, bottom: 30},
	height = 400 - margin.top - margin.bottom,
	width = 780 - margin.left - margin.right;

	console.log("Building chart 4");

	var svg = d3.select("#chart-4")
				.append("svg")
				.attr("height", height + margin.top + margin.bottom)
				.attr("width", width + margin.left + margin.right)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Create your scales
	var xPositionScale = d3.scaleLinear().range([0, width]);
  	var yPositionScale = d3.scaleLinear().range([height, 0]);

	// Do you need a d3.line function for this? Maybe something similar?
	var line = d3.line()
    .x(function(d){ return xPositionScale(d.Year); })
    .y(function(d){ return yPositionScale(d.Value); })
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
		// When coloring them, an if statement might come in handy!
	svg.selectAll(".emission-values")
		.data(datapoints)
		.enter().append("circle")
		.attr("r", function(d){
			if(d.Year === 2014 && d.Country === "France"){
				return 5
			} else {
				return 2
			}
		})
		.attr("class", "emission-values")
		.attr("fill", function(d){
			if(d.Country === "France"){
				return "blue"
			} else {
				return "grey"
			}
		})
		.attr("cx", function (d){
			return xPositionScale(d.Year)
		})
		.attr("cy", function(d){
			return yPositionScale(d.Value)
		})


		// Draw your lines
		// When coloring them, an if statement might come in handy!
	var nested = d3.nest()
		.key(function(d){
			return d.Country
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
			if(d.key === "France"){
				return "blue"
			} else {
				return "grey"
			}
		})
	svg.selectAll("text")
		.data(nested)
		.enter().append("text")
		.attr("text-anchor", "start" + 15)
		.text(function(d){
			if(d.key === "France"){
			return d.key
		} else {
			return ""
		}
		})
		.attr("x", function(d){
			lastDate = d.values[d.values.length - 1]
			 return xPositionScale(lastDate.Year)
		})
		.attr("y", function(d){
			lastValue = d.values[d.values.length - 1]
			 return yPositionScale(lastValue.Value)
		})
		.attr("dy", ".35em")
		.attr("dx", ".70em")
		.style("fill", "blue")
		.style("font-size", "12px");
		
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