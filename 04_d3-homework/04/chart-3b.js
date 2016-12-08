(function() {
    var margin = { top: 30, left: 30, right: 30, bottom: 30},
    height = 400 - margin.top - margin.bottom,
    width = 1080 - margin.left - margin.right;

  // What is this???
  var svg = d3.select("#chart-3b")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var cityNames = ['NYC', 'Tuscon', 'Lima', 'Beijing', 'Melbourne', 'Stockholm'];

  var xPositionScale = d3.scalePoint()
    .domain(cityNames)
    .range([0,width])
    .padding(0.5);

  var radius = 100;

  var colorScale = d3.scaleLinear()
    .domain([27,84])
    .range(["#404e7c", "#fe5f55"])

  var pie = d3.pie()
      .value(1/12)
      .sort(null)

  d3.queue()
    .defer(d3.csv, "data/all-temps.csv", function (d){
      d.low = +d.low
      d.high = +d.high
      return d
    })
    .await(ready)

  function ready(error, datapoints) {

    var nested = d3.nest()
      .key(function(d){
        return d.city
      })
      .entries(datapoints);

    var arc = d3.arc()
      .innerRadius(0)
      .outerRadius(function(d){
        return d.data.high
      })

    // pieContainer = svg.append('g').attr("transform", "translate(350,150)")

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

    g.selectAll("path")
      .data(pie(monthlyData))
      .enter().append("path")
      .attr('d', arc)
      .attr("fill", function(d){
        return colorScale(d.data.low + (d.data.high - d.data.low)/2)
      })
    })

   charts.append("text")
    .attr("x", 0)
    .attr("y", 150)
    .attr("text-anchor", "middle")
    .text(function(d){
      return d.key
    })

}
})();