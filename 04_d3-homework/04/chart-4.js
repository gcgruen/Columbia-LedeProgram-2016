(function() {
    var margin = { top: 30, left: 30, right: 30, bottom: 30},
    height = 400 - margin.top - margin.bottom,
    width = 780 - margin.left - margin.right;

  // What is this???
  var svg = d3.select("#chart-4")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var radius = 100;

  var radiusScale = d3.scaleLinear()
    .domain([0,100])
    .range([0,radius]);

// each segment of the circle represents one month
  var angleScale = d3.scalePoint()
    .domain(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'Blah'])
    .range([0, Math.PI * 2]);

  var radialArea = d3.radialArea()
    .angle(function(d){
      return angleScale(d.month)
    })
    .innerRadius(function(d){
      return radiusScale(d.low * 1.5 + 20)
    })
    .outerRadius(function(d){
      return radiusScale(d.high * 1.5 + 20)
    })

  d3.queue()
    .defer(d3.csv, "ny-temps.csv", function (d){
      d.low = +d.low
      d.high = +d.high
      return d
    })
    .await(ready)

  function ready(error, datapoints) {

    svg.append("text")
      .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")")
      .attr("text-anchor", "middle")
      .attr("font-weight", "bold")
      .style("font-size", "30px")
      .text("NYC")

    var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // make the gap between end of Dec and beginning of Jan data disappear
    datapoints.push(datapoints[0]);

    // drawing the circlular axis
    g.selectAll("circle")
      .data([20,30,40,50,60,70,80,90])
      .enter().append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", function(d){
        return radiusScale(d * 1.5 + 20)
      })
      .attr("fill", "none")
      .attr("stroke", "grey");

    g.selectAll(".temp-labels")
      .data([30,50,70,90])
      .enter().append("text")
      .text(function(d) {
        return d + "°"
      })
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("y", function(d){
        return radiusScale(d * 1.5 + 25) * -1
      });


    // drawing the data as area (range shows min and max temp per month) and 
    g.append("path")
      .datum(datapoints)
      .attr("d", radialArea)
      .attr("stroke", "none")
      .attr("stroke-width", 1)
      .attr("fill", "#404e7c")
      .attr("fill-opacity", 0.75)
      // console.log("radialArea4", radialArea)
  }
})();