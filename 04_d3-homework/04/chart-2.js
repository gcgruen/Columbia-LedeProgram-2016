(function() {
    var margin = { top: 30, left: 30, right: 30, bottom: 30},
    height = 400 - margin.top - margin.bottom,
    width = 780 - margin.left - margin.right;

  // What is this???
  var svg = d3.select("#chart-2")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var colorScale = d3.scaleOrdinal().range(['#404e7c', '#fe5f55', '#e8d245'])

  var xPositionScale = d3.scalePoint().domain(["Project 1", "Project 2", "Project 3", "Project 4"])
    .range([0, width])
    .padding(50)

  var radius = 60;

  var arc = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);

  var pie = d3.pie()
    .value( function(d){
      return d.minutes;
    })

  d3.queue()
    .defer(d3.csv, "data/time-breakdown-all.csv")
    .await(ready)

  function ready(error, datapoints) {

    var nested = d3.nest()
      .key( function(d) {
        return d.project;
      })
      .entries(datapoints);

    var multiples = svg.selectAll("g")
      .data(nested)
      .enter().append("g")
      .attr("transform", function(d) {
        var xPos = xPositionScale(d.key);
        return "translate(" + xPos + ",100)"
      })

    multiples.append("circle")
      .attr('r', 10)

    multiples.each( function (d) {

      d3.select(this).append('text')
        .text(d.key)
        .attr("y", +100)
        .attr("text-anchor", "middle")

      d3.select(this).selectAll("path")
      .data(pie(d.values))
      .enter().append("path")
      .attr("d", arc)
      .attr("fill", function(d){
        return colorScale(d.data.task);
      })


    })

  }

})();



