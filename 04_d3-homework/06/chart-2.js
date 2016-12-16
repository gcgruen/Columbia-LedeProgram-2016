(function() {

  var margin = { top: 50, left: 50, right: 50, bottom: 50},
    height = 600 - margin.top - margin.bottom,
    width = 1600 - margin.left - margin.right;

  var root = d3.select("#chart-2")
    .append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)

  var svg = root.append("g");

  var defs = svg.append("defs")

  var radiusScale = d3.scaleSqrt().domain([6,90]).range([5,30])

  var colourScale = d3.scaleOrdinal(d3.schemeCategory20b)
    
  var defs = svg.append("defs")

  var industryscale = d3.scalePoint().domain(["Technology","Diversified","Retail","Manufacturing","Finance","Real Estate","Food & Beverage","Media","Energy","Metals & Mining","Service","Medical","Telecommunications","Apparel"]).range([100,width])

  var forceX = d3.forceX(width/2).strength(0.04)
  var forceY = d3.forceY(height/2).strength(0.04)
  // var forceCenter = d3.forceCenter(0, 0)
  var forceCollide = d3.forceCollide(function(d){
    return radiusScale(d.net) + 4
  })

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return d.name + " | Industry: " + d.industry + " | Net worth: " + d.net + " billion US$"
    })

  svg.call(tip)

  var simulation = d3.forceSimulation()
    .force("x", forceX)
    .force("y", forceY)
    .force("collide", forceCollide)

  d3.queue()
    .defer(d3.csv, "billionaires_complete.csv")
    .await(ready)

  function ready(error, datapoints) {

    var patterns = defs.selectAll(".billionaire-pattern")
      .data(datapoints)
      .enter().append("pattern")
      .attr("class", "billionaire-pattern")
      .attr("id", function(d){
        return d.name.toLowerCase().replace(/ /g, "-")
      })
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("patternContentUnits", "objectBoundingBox")


    patterns.append("rect")
      .attr("height", 1)
      .attr("width", 1)
      .attr("fill", function(d){
        return colourScale(d.industry)
      })

    patterns.append("image")
      .attr("height", 1)
      .attr("width", 1)
      .attr("preserveAspectRatio", "none")
      .attr("xlns:xlink", "http://www.w3.org/1999/xlink")
      .attr("xlink:href", function (d){
        return "images/"+ d.name.toLowerCase().replace(/ /g, "-") + ".jpeg"
      })


    var nodes = svg.selectAll(".billionaire")
      .data(datapoints)
      .enter().append("circle")
      .attr("class", function(d){
        return "billionaire " + d.gender.toLowerCase() + " " + d.industry.toLowerCase().replace(/ /g, "-")
      })
      .attr("r", function (d){
        return radiusScale(d.net)
      })
      .attr("fill", function(d){
        return "url(#" + d.name.toLowerCase().replace(/ /g, "-") + ")"
      })
      .attr("stroke", function(d){
        return colourScale(d.industry)
      })
      .attr("stroke-width", "3px")
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

    simulation.nodes(datapoints)
      .on("tick", ticked)

    d3.select("#gender")
      .on('click', function(){
        simulation.force("x", d3.forceX(function(d){
          if (d.gender == "Male"){
            return (width/4) 
          }
          if (d.gender == "Female"){
            return (width/4) * 3
          }
        })
        .strength(0.1))
        .alphaTarget(0.1)
        .restart()
    })

    var nested = d3.nest()
        .key(function(d){
          return d.industry
         })
      .entries(datapoints);

    d3.select("#industry")
      .on("click", function(d){
        var anothersplitforce = d3.forceX(function(d){
          return industryscale(d.industry)
        })
        .strength(0.33)
    
        simulation.force("x", anothersplitforce)
          .alphaTarget(0.1125)
          .restart()

        svg.selectAll(".industry-label")
          // .data(datapoints)
          // how to not label for every datapoint, but only once
          .data(nested)
          // .data(["Technology","Diversified","Retail","Manufacturing","Finance","Real Estate","Food & Beverage","Media","Energy","Metals & Mining","Service","Medical","Telecommunications","Apparel"])
          .enter().append("text")
          .attr("class", "industry-label")
          .attr("x", function(d){
            return industryscale(d.key)
          })
          .attr("text-anchor", "middle")
          .attr("y", 450)
          .text(function(d){
            return d.key
          })

    })

    d3.select("#reset")
      .on('click', function(){
        simulation.force("x", d3.forceX(width/2)
          .strength(0.1))
          .alphaTarget(0.1)
          .restart()

      svg.selectAll(".industry-label")
        .text(" ")

      })


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