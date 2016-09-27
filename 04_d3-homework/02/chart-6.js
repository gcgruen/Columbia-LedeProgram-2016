// Gianna-Carina Gruen
// 2016-09-19
// Create an ordinal column from a quantitative column,
// like you planned in the prep section.

// Create a new dataset, where each data point has three attributes:
// the type of animal, the type of (whatever your ordinal column is),
// and the number of those animals in that ordinal category.

// Let's make another graphic that involves 3 variables:
// 	2 planar to describe your ordinal column and animal type
// 	1 retinal to describe the number of animals in that category (your choice)

(function() {
	// Insert your data here
	var data = [
		{"animal":"cat", "age_group":"young", "members": 1},
		{"animal":"cat", "age_group":"adult", "members": 2},
		{"animal":"dog", "age_group":"young", "members": 3},
		{"animal":"dog", "age_group":"adult", "members": 1},
	];

	var margin = { top: 30, left: 30, right: 30, bottom: 30},
		height = 400 - margin.top - margin.bottom,
		width = 780 - margin.left - margin.right;

	console.log("Building chart 6");

	var svg = d3.select("#chart-6")
				.append("svg")
				.attr("height", height)
				.attr("width", width)
				.append("g")
				.attr("translate", "transform(" + margin.top + "," + margin.left + ")");

	// Create any scales you might need

	var xScale = d3.scalePoint()
								.domain(["young", "adult"])
								.range([200,500]);

	var yScale = d3.scalePoint()
								.domain(["cat", "dog"])
								.range([100,200]);

	var colorScale = d3.scaleLinear()
											.domain([1, 3])
											.range(['beige', 'red'])

	// Create and style your elements

	svg.selectAll("cirle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cy", function(d){
			return yScale(d.animal);
		})
		.attr("cx", function(d){
			return xScale(d.age_group);
		})
		.attr("fill", function(d){
			return colorScale(d.members)
		})
		.attr("r", 10);

	svg.selectAll(".animal-label")
		.data(data)
		.enter()
		.append("text")
		.attr("class", "animal-label")
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

	svg.selectAll(".age-label")
		.data(data)
		.enter()
		.append("text")
		.attr("class", "age-label")
		.attr("text-anchor", "middle")
		.attr("y", 240)
		.attr("r", 10)
		.attr("x", function(d){
			if(d.age_group === "young"){
				return 200
			} else {
				return 500
			}
			})
		.text(function(d){
			if(d.age_group === "young"){
				return "young"
			} else {
				return "adult"
			}
			})

})();
