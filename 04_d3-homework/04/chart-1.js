(function() {
    var margin = { top: 30, left: 30, right: 30, bottom: 30},
    height = 400 - margin.top - margin.bottom,
    width = 780 - margin.left - margin.right;

  // What is this???
  var svg = d3.select("#chart-1")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var colorScale = d3.scaleOrdinal().range(['#404e7c', '#fe5f55', '#e8d245'])

  var radius = 100;

  var arc = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);

  var pie = d3.pie()
    .value( function(d){
      return d.minutes;
    })

  var labelArc = d3.arc()
    .outerRadius(radius + 20)
    .innerRadius(radius + 20);

  d3.queue()
    .defer(d3.csv, "data/time-breakdown.csv")
    .await(ready)

  function ready(error, datapoints) {

  var pieContainer = svg.append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

  pieContainer.selectAll("path")
      .data(pie(datapoints))
      .enter().append("path")
      .attr("d", arc)
      .attr("fill", function(d){
        return colorScale(d.data.task);
      })

  pieContainer.selectAll("text")
      .data(pie(datapoints))
      .enter().append("text")
      .text(function(d){
        return d.data.task
      })
      .attr("text-anchor", function(d) {
        if(d.startAngle > Math.PI) {
          return "end"
        } else {
          return "start"
        }
      })
      .attr("x", function(d){
        return labelArc.centroid(d)[0]
      })
      .attr("y", function(d){
        return labelArc.centroid(d)[1]
      })

   
  // var pieces = svg.selectAll("g")
  //   .data(pie(datapoints))
  //   .enter().append('g')
  //   .attr("transform", function(d) { 
    //   return "translate(" + labelArc.centroid(d) + ")"
    // })

  // pieces.each( function(d){
    
  //   d3.select(this).append('text')
  //     .text(function(d){
  //       return d.data.task
  //     })


  // // hint for positioning the data
  //     .attr("text-anchor", function(d) {
  //       if(d.startAngle > Math.PI) {
  //         return "end"
  //       } else {
  //         return "start"
  //       }
  //     });
  //   })
   

  }

})();

  // var labelContainer = svg.enter().append("g")
  //     .attr("transform", function(d) { 
  //       return "translate(" + labelArc.centroid(d) + ")"
  //     })

  // labelContainer.selectAll("text")
  //     .data(pie(datapoints))
  //     .enter().append('text')
  //     .text(function(d) {
  //       return d.data.task
  //     })
  // // hint for positioning the data
  //     .attr("text-anchor", function(d) {
  //       if(d.startAngle > Math.PI) {
  //         return "end"
  //       } else {
  //         return "start"
  //       }
  //     });



