(function() {
	var margin = { top: 100, left: 100, right: 100, bottom: 100},
	height = 500 - margin.top - margin.bottom,
	width = 780 - margin.left - margin.right;

	console.log("Building chart 5");

	var svg = d3.select("#chart-5")
				.append("svg")
				.attr("height", height + margin.top + margin.bottom)
				.attr("width", width + margin.left + margin.right)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	// Tip: you're using different scales this time.
	// Once you're done, you'll notice it doesn't quite look right, the points
	// are smushed up against the axes. Maybe read the documentation to change it?
	// https://github.com/d3/d3-scale#point-scales

	var xScale = d3.scalePoint()
		.domain(["cat", "dog", "mouse"])
		.range([0, width])
		.padding(0.75);
	var yScale = d3.scalePoint()
		.domain(["small", "medium", "large"])
		.range([height, 0])
		.padding(0.75);
	var circleRadiusScale = d3.scaleSqrt().domain([0,55]).range([0,40])

	d3.queue()
		.defer(d3.csv, "animal-sizes.csv", function(d){
			d.amount = +d.amount
			return d
		})
		.await(ready);

	function ready(error, datapoints) {

		// Add your circles

		svg.selectAll("cirle")
		.data(datapoints)
		.enter().append("circle")
		.attr("cy", function(d){
			return yScale(d.size);
		})
		.attr("cx", function(d){
			return xScale(d.breed);
		})
		.attr("r", function(d) {
			return circleRadiusScale(d.amount);
		});

		// You might need to adjust transform/translate of your axes
		// along with the margins up top to put your axes in the right place!
	
	var xAxis = d3.axisBottom(xScale);
      svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)

	 var yAxis = d3.axisLeft(yScale);
     svg.append("g")
        .attr("class", "axis y-axis")
        .call(yAxis);

	}
})();