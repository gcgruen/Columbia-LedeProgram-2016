(function() {
    var margin = { top: 30, left: 30, right: 30, bottom: 30},
    height = 400 - margin.top - margin.bottom,
    width = 780 - margin.left - margin.right;

  // What is this???
  var svg = d3.select("#chart-3")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var radius = 100;

  var colorScale = d3.scaleLinear()
    .domain([27,84])
    .range(["#404e7c", "#fe5f55"])

  var pie = d3.pie()
      .value(1/12)
      .sort(null)

  d3.queue()
    .defer(d3.csv, "ny-temps.csv", function (d){
      d.low = +d.low
      d.high = +d.high
      return d
    })
    .await(ready)

  function ready(error, datapoints) {

    // console.log(pie(datapoints))

    svg.append("text")
      .attr("transform", "translate(225,50)")
      .text("NYC monthly temperature maximum")

    var arc = d3.arc()
      .innerRadius(0)
      .outerRadius(function(d){
        return d.data.high
      })

    pieContainer = svg.append('g').attr("transform", "translate(350,150)")

    var g = pieContainer.selectAll(".arc")
      .data(pie(datapoints))
      .enter().append("g");

    g.append("path")
      .attr('d', arc)
      .attr("fill", function(d){
        return colorScale(d.data.low + (d.data.high - d.data.low)/2)
      })
 
  }
})();