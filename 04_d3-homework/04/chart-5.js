(function() {
    var margin = { top: 30, left: 30, right: 30, bottom: 30},
    height = 450 - margin.top - margin.bottom,
    width = 1080 - margin.left - margin.right;

  // What is this???
  var svg = d3.select("#chart-5")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var angleScale = d3.scalePoint()
    .domain(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'Blah'])
    .range([0, Math.PI * 2]);

  var radialArea = d3.radialArea()
    .angle(function(d){
      return angleScale(d.month)
    })
    .innerRadius(function(d){
      return radiusScale(d.low * 1.5 + 80)
    })
    .outerRadius(function(d){
      return radiusScale(d.high * 1.5 + 80)
    })

  var cityNames = ['NYC', 'Tuscon', 'Lima', 'Beijing', 'Melbourne', 'Stockholm'];

  var xPositionScale = d3.scalePoint()
    .domain(cityNames)
    .range([0,width])
    .padding(0.35);

  var radius = 30;

  var radiusScale = d3.scaleLinear()
    .domain([0,100])
    .range([0,radius]);

  d3.queue()
    .defer(d3.csv, "data/all-temps.csv", function(d){
      d.low = +d.low
      d.high = +d.high
      return d
    })
    .await(ready)

  function ready(error, datapoints) {

   var nested = d3.nest()
    .key(function(d){
      return d.city;
    })
    .entries(datapoints);

    var charts = svg.selectAll(".charts")
      .data(nested)
      .enter().append("g")
      .attr("transform", function(d){
        var yPos = 150
        var xPos = xPositionScale(d.key)
        return "translate(" + xPos + "," + yPos + ")"
      })

    charts.each(function(d){
      var monthlyData = d.values;
      var g = d3.select(this);

      monthlyData.push(monthlyData[0]);

      g.append("path")
        .datum(monthlyData)
        .attr("d", radialArea)
        .attr("stroke", "none")
        .attr("stroke-width", 1)
        .attr("fill", "#C45A61")
        .attr("fill-opacity", 0.75)

      g.selectAll("circle")
        .data([20,40,60,80,100])
        .enter().append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", function(d){
          return radiusScale(d * 1.5 + 80)
        })
        .attr("fill", "none")
        .attr("stroke", "grey");

      g.selectAll(".temp-labels")
        .data([20,60,100])
        .enter().append("text")
        .text(function(d) {
          return d + "°"
        })
        .attr("font-size", 8)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("y", function(d){
          return radiusScale(d * 1.5 + 90) * -1
        });
    
     });

    charts.append("text")
      .attr("x", 0)
      .attr("y", 4)
      .attr("text-anchor", "middle")
      .attr("font-weight", "bold")
      .style("font-size", "12px")
      .text(function(d){
        return d.key
      })
      
}
})();





