(function() {
  var margin = { top: 30, left: 100, right: 30, bottom: 30},
  height = 400 - margin.top - margin.bottom,
  width = 780 - margin.left - margin.right;

  console.log("Building chart 1");

  var svg = d3.select("#chart-1")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Create a time parser
  var parse = d3.timeParse("%Y-%m-%d")

  // Create your scales, but ONLY give them a range    
  // (you'll set the domain once you read in your data)
  var xPositionScale = d3.scaleLinear().range([0, width]);
  var yPositionScale = d3.scaleLinear().range([height, 0]);

  // Create a d3.line function that uses your scales to
  // determine the x and y of the line
  // Make it curve a little if you're feeling fun. I personally like d3.curveMonotoneX
  var line = d3.line()
    .x(function(d){ return xPositionScale(d.datetime); })
    .y(function(d){ return yPositionScale(d.Close); })
    .curve(d3.curveMonotoneX)

  d3.queue()
    .defer(d3.csv, "AAPL.csv", function(d) {
      // While we're reading the data in, parse each date
      // into a datetime object so it isn't just a string
      // save it as 'd.datetime'
      // d.datetime is now your 'useful' date, you can ignore
      // d.Date. Feel free to use console.log to check it out.
      d.datetime = parse(d.Date);
      d.Close = +d.Close;
      return d;
    })
    .await(ready);

  function ready(error, datapoints) {
    // Get the max and min of datetime and Close,
    // then use that to set the domain of your scale

    // NOTE:I've done it for the datetime, you do it for the close price
    var minDatetime = d3.min(datapoints, function(d) { return d.datetime });
    var maxDatetime = d3.max(datapoints, function(d) { return d.datetime });
    xPositionScale.domain([minDatetime, maxDatetime])

    var minClose = d3.min(datapoints, function(d) {return d.Close});
    var maxClose = d3.max(datapoints, function(d) {return d.Close});
    yPositionScale.domain([minClose, maxClose])


    // Draw your dots

    svg.selectAll(".aapl-stock-price")
      .data(datapoints)
      .enter().append("circle")
      .attr("r", 2)
      .attr("class", "stock-price")
      .attr("cx", function(d){
        return xPositionScale(d.datetime)
      })
      .attr("cy", function(d) {
        return yPositionScale(d.Close)
      });

    // Draw your SINGLE line (but remember it isn't called a line)

    svg.append("path")
      .datum(datapoints)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "green")

    // Add your axes - I've added the x axis for you
    // Notice that xAxis gets a .tickFormat to format the dates!
    // You won't use this again unless you're doing time again.
      var xAxis = d3.axisBottom(xPositionScale).tickFormat(d3.timeFormat("%m/%d/%y"));
      svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      var yAxis = d3.axisLeft(yPositionScale);
      svg.append("g")
        .attr("class", "axis y-axis")
        .call(yAxis);

    }
})();