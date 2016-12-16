(function() {
  var margin = { top: 50, left: 50, right: 50, bottom: 50},
    height = 600 - margin.top - margin.bottom,
    width = 1260 - margin.left - margin.right;

  // What is this???
  var svg = d3.select("#chart-3")
        .append("svg")
        // .attr("height", height)
        // .attr("width", width)
        // .append("g")
        // .attr("transform", "translate(" + width / 2 +"," + height / 2 + ")");;
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var xPositionScale = d3.scaleLinear().domain([25,100]).range([0, width])
  var yPositionScale = d3.scaleLinear().domain([0, 90]).range([height, 0])

  var colourScale = d3.scaleOrdinal(d3.schemeCategory20b)

  var countries = ["United States","Germany","Russia","China","France","India","Hong Kong","Sweden","Italy","Brazil","Indonesia","Japan","Saudi Arabia","Canada","Mexico","Australia","Colombia","United Kingdom","Spain","South Korea","Thailand","Switzerland","Austria","Israel","New Zealand","Philippines","Czech Republic","Denmark","Nigeria","Netherlands","Chile","Monaco","Cyprus","Malaysia","Singapore"]

  var countryScale = d3.scalePoint()
    .domain(countries)
    .range([10, width])

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return d.name + " | Industry: " + d.industry + " | Net worth: " + d.net + " billion US$" + " | Country: " + d.place
      // return "<strong>Frequency:</strong> <span style='color:red'>" + d.name + "</span>";
    })

  svg.call(tip)

  d3.queue()
    // .defer(d3.json, "billionaires_complete.json")
    .defer(d3.csv, "billionaires_complete.csv")
    .await(ready)

  function ready(error, datapoints) {

// drawing scattered circles, spun up between age (x) and net worth(y)
  var circles = svg.selectAll(".billionaire_circle")
      .data(datapoints)
      .enter().append("circle")
      .attr("class", "billionaire_circle")
      .attr("r", 4)
      .attr("cx", function(d){
        return xPositionScale(d.age)
      })
      .attr("cy", function(d){
        return yPositionScale(d.net)
      })
      .attr("fill", function(d){
        return colourScale(d.industry)
      } )
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)


// Drawing x and y axis
  var xAxis = d3.axisBottom(xPositionScale);

    svg.append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(0," + (height) + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .attr("fill", "black")
      .attr("text-anchor", "end")
      .text("Age");

    var yAxis = d3.axisLeft(yPositionScale);

    svg.append("g")
      .attr("class", "axis y-axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("x", 0)
      .attr("y", 12)
      .attr("text-anchor", "end")
      .attr("fill", "black")
      .text("Net worth (Billion US$)");


   var simulation = d3.forceSimulation()
        .force("y", d3.forceY(height/2).strength(0.05))
        .force("collide", d3.forceCollide(5))

// when country button is clicked, resort circles and group them by country
    d3.select("#countries")
      .on("click", function(){

        var countrysplitforce = d3.forceX(function(d){
          return countryScale(d.place)
        })
        .strength(0.33)

        simulation.force("x", countrysplitforce)
          .alphaTarget(0.1125)
          .restart()

        simulation.nodes(datapoints)
         .on("tick", ticked)

// make axes disappear
        svg.selectAll(".axis")
          .remove()


        var nested = d3.nest()
          .key(function(d){
            return d.place
          })
          .entries(datapoints);

// make country labels appear
        svg.selectAll(".country-label")
          .data(nested)
          .enter().append("text")
          .attr("class", "country-label")
          .attr("text-anchor", "middle")
          .attr("x", function(d){
            return countryScale(d.key)
          })
          .attr("y", 350)
          .text(function(d){
            return d.key
          })
          .attr("transform", function(d){
            return "rotate(-90 "+ countryScale(d.key) +" 350)"
        })
      })


    function ticked() {
        circles
        .attr("cx", function(d) {
          return d.x
        })
        .attr("cy", function(d) {
          return d.y
        })
       }

// go back to scatterplot when reverse button is clicked clicked
  d3.select("#reverse")
    .on('click', function(){

      simulation.stop()

      console.log("reverse button clicked")

      svg.selectAll(".billionaire_circle")
        .attr("cx", function(d){
          return xPositionScale(d.age)
        })
        .attr("cy", function(d){
          return yPositionScale(d.net)
        })
    

      svg.selectAll(".axis")
        .remove()

      svg.selectAll(".country-label")
        .remove()

      var xAxis = d3.axisBottom(xPositionScale);

      svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(0," + (height) + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .attr("fill", "black")
        .attr("text-anchor", "end")
        .text("Age");

      var yAxis = d3.axisLeft(yPositionScale);

      svg.append("g")
        .attr("class", "axis y-axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("x", 0)
        .attr("y", 12)
        .attr("text-anchor", "end")
        .attr("fill", "black")
        .text("Net worth (Billion US$)");


    })

    
  }

  // d3.queue()
  //   .defer(d3.json, "billionaire.json")
  //   .await(resorting)

  // function resorting(error, graph){




    
  // }
})();