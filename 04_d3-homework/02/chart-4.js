// Gianna-Carina Gruen
// 2016-09-19
// Let's make another graphic that involves 3 variables:
	// 2 planar to describe animal type and weight
	// 1 retinal to describe the times arrested (color/brightness)

(function() {
	var data = [
		{"name":"Susu","animal":"dog","favorite_food":"cats","age":4,"lbs":40,"times_arrested":3},
		{"name":"Puddin","animal":"dog","favorite_food":"pizza","age":10,"lbs":50,"times_arrested":2},
		{"name":"Max","animal":"dog","favorite_food":"cats","age":3,"lbs":7,"times_arrested":20},
		{"name":"Benny","animal":"cat","favorite_food":"cat food","age":1,"lbs":3,"times_arrested":0},
		{"name":"Mylo","animal":"cat","favorite_food":"cat food","age":10,"lbs":9,"times_arrested":1},
		{"name":"Mavis","animal":"cat","favorite_food":"pizza","age":13,"lbs":12,"times_arrested":1},
		{"name":"Libby","animal":"dog","favorite_food":"cat food","age":4,"lbs":10,"times_arrested":12}
	];

	var margin = { top: 30, left: 30, right: 30, bottom: 30},
		height = 400 - margin.top - margin.bottom,
		width = 780 - margin.left - margin.right;

	console.log("Building chart 4");

	var svg = d3.select("#chart-4")
				.append("svg")
				.attr("height", height)
				.attr("width", width)
				.append("g")
				.attr("translate", "transform(" + margin.top + "," + margin.left + ")");

	// Create any scales you might need
	var xScale = d3.scaleLinear()
									.domain([0,55])
									.range([100,600]);

	var yScale = d3.scalePoint()
								.domain(["cat", "dog"])
								.range([100,200]);

	var colorScale = d3.scaleLinear()
											.domain([0,24])
											.range(['beige', 'green']);
	// Create and style your elements

	svg.selectAll("cirle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cy", function(d){
			return yScale(d.animal);
		})
		.attr("cx", function(d){
			return xScale(d.lbs);
		})
		.attr("fill", function(d){
			return colorScale(d.times_arrested);
		})
		.attr("r", 10);

	svg.selectAll("text")
		.data(data)
		.enter()
		.append("text")
		.attr("text-anchor", "middle")
		.attr("y", function(d) {
			if(d.animal === "cat"){
				return 105
			} else {
				return 205
			}
		})
		.attr("r", 10)
		.attr("x", 80)
		.text(function(d){
			if(d.animal === "cat"){
				return "cats"
			} else {
				return "dogs"
			}
		})

})();
