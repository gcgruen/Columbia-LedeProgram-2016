(function() {
  var height = 400,
      width = 800;

  // What is this???
  var svg = d3.select("#chart-1")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .append("g")
        .attr("transform", "translate(" + width / 2 +"," + height / 2 + ")");

  var radiusscale = d3.scaleSqrt().domain([6,90]).range([5,30])

  var defs = svg.append("defs")

  var forceX = d3.forceX().strength(0.05)
  var forceY = d3.forceY().strength(0.05)
  var forceCollide = d3.forceCollide(function(d){
      return radiusscale(d.net) + 1
    })

  var simulation = d3.forceSimulation()
    .force("x", forceX)
    .force("y", forceY)
    .force("collide", forceCollide)

  d3.queue()
    .defer(d3.csv, "billionaires_complete.csv")
    .await(ready)

  function ready(error, datapoints) {

  // net_min = d3.min(datapoints, function(d) { return d.net })
  // net_max = d3.max(datapoints, function(d) { return d.net })
  // radiusscale.domain([net_min, net_max])


  var patterns = defs.selectAll(".billionaire-pattern")
    .data(datapoints)
    .enter().append("pattern")
    .attr("class", "billionaire-pattern")
    .attr("id", function(d){
      return "a-" + d.name.toLowerCase().replace(/ /g, "-")
    })
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUnits", "objectBoundingBox")
  
  // Give the patterns a default background color
  patterns.append("rect")
    .attr("height", 1)
    .attr("width", 1)
    .attr("fill", "lightblue")

  // Then draw the images on top of it
  patterns.append("image")
    .attr("height", 1)
    .attr("width", 1)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", function (d){
      return "images/"+ d.name.toLowerCase().replace(/ /g, "-") + ".jpeg"
    })


  var nodes = svg.selectAll(".billionaire")
    .data(datapoints)
    .enter().append("circle")
    .attr("class", "billionaire")
    .attr("r", function(d){
      return radiusscale(d.net)
    })
    .attr("fill", function(d){
      return "url(#a-" + d.name.toLowerCase().replace(/ /g, "-") + ")"
      })
    .attr("stroke", "lightblue")
    // .attr("fill", "lightblue")


  simulation.nodes(datapoints)
    .on("tick", ticked)


  function ticked() {
    nodes
      .attr("cx", function(d) {
        return d.x
      })
      .attr("cy", function(d) {
        return d.y
      })
  }


  }
})();