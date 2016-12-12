(function() {
    var margin = { top: 50, left: 50, right: 50, bottom: 50},
    height = 600 - margin.top - margin.bottom,
    width = 960 - margin.left - margin.right;

  // What is this???
  var svg = d3.select("#chart-1")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xPositionScale = d3.scaleLinear().range([0, width]);
  var yPositionScale = d3.scaleLinear().range([height, 0]);

  var colourScale = d3.scaleOrdinal().domain(["Asia", "Europe", "Africa", "Oceania", "South-America", "North-America"]).range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33'])

  var radiusScale = d3.scaleLinear()
    .domain([Math.sqrt(0), Math.sqrt(1000000000)])
    .range([2, 30]);

  var dur_time = 350

  d3.queue()
    .defer(d3.csv, "le_gdp_pop-2010.csv", function(d){
      d.GDP_per_capita = +d.GDP_per_capita
      d.life_expectancy = +d.life_expectancy
      return d
    })
    .await(ready)


  function ready(error, datapoints) {

    svg.append("text")
      .attr("transform", "translate(300,-10)")
      .text("People in rich countries live longer")
      .attr("font-size", "22px")
      .attr("font-weight", "bold")

    xPositionScale.domain([0,(d3.max(datapoints, function(d){return d.GDP_per_capita}))]).nice()
    yPositionScale.domain([0,(d3.max(datapoints, function(d){return d.life_expectancy}))]).nice()

    var sorted = datapoints.sort(function(a,b){
      return b.Population - a.Population;
    });

    svg.selectAll("circle")
      .data(datapoints)
      .enter().append("circle")
      .attr("class", function(d){
        return d.Continent + " continent"
      })
      .classed("big-country", function(d){
        if(d.Population > 5000000) {
          return true
        }
      })
      .classed("not-big", function(d){
        if(d.Population < 5000000) {
          return true
        }
      })
      .classed("tiny-country", function(d){
        if (d.Population < 10000000) {
          return true}
      })
      .classed("not-tiny", function(d){
        if (d.Population > 10000000) {
          return true
        }
      })
      .attr("fill", function(d){
        return colourScale(d.Continent)
      })
      .on('mouseover', function(d){
        d3.select(this)
          .attr("fill", "#black")
        d3.select("#country-display")
          .style("display","inline")
        d3.select("#selected")
          .text(d.Country + ", " + d.Continent)
        d3.select("#population")
          .text("Population: " + d.Population)
        d3.select("#life-expectancy")
          .text("Life expectancy: " + d.life_expectancy + " years")
        d3.select("#gdp-pc")
          .text("GDP per capita: " + d.GDP_per_capita + " US dollar")
      })
      .on('mouseout', function(){
        d3.select(this)
          .attr("fill", function(d){
        return colourScale(d.Continent)
      })
        d3.select("#country-display")
          .style("display","none");
      })
      .attr("r", function(d) {
        return radiusScale(Math.sqrt(d.Population));
      })
      .attr("cx", function(d) {
        return xPositionScale(d.GDP_per_capita)
      })
      .attr("cy", function(d) {
        return yPositionScale(d.life_expectancy)
      })

    d3.select("#reset-button")
      .on('click', function(){
        d3.selectAll(".continent")
          .transition()
          .duration(dur_time)
          .attr("r", function(d) {
            return radiusScale(Math.sqrt(d.Population));
          })

      xPositionScale.domain([0,(d3.max(datapoints, function(d){return d.GDP_per_capita}))]).nice()
      yPositionScale.domain([0,(d3.max(datapoints, function(d){return d.life_expectancy}))]).nice()

      svg.selectAll(".continent")
          .attr("cx", function(d) {
            return xPositionScale(d.GDP_per_capita)
          })
          .attr("cy", function(d){
            return yPositionScale(d.life_expectancy)
          })

      svg.select(".x-axis")
        .transition()
        .duration(dur_time)
        .call(xAxis)

      svg.select(".y-axis")
        .transition()
        .duration(dur_time)
        .call(yAxis)

      })

  function showcontinent(selected_continent) {

    var subselection = datapoints.filter(function(d){
      return d.Continent == selected_continent})

    var maxGDP = d3.max(subselection, function(d) { return d.GDP_per_capita })
    var minlifeex = d3.min(subselection, function(d) { return d.life_expectancy })
    var maxlifeex = d3.max(subselection, function(d) { return d.life_expectancy })
    
    xPositionScale.domain([0, maxGDP]).nice()
    yPositionScale.domain([minlifeex,maxlifeex]).nice()


    svg.selectAll(".continent")
      .transition()
      .duration(dur_time)
      .attr("r",function(d) {
        if(d.Continent == selected_continent) {
          return radiusScale(Math.sqrt(d.Population));
        } else {
          return 0
        }
      })
      .attr("cx", function(d) {
        return xPositionScale(d.GDP_per_capita)
      })
      .attr("cy", function(d){
        return yPositionScale(d.life_expectancy)
      })

    svg.select(".x-axis")
      .transition()
      .duration(dur_time)
      .call(xAxis)

    svg.select(".y-axis")
      .transition()
      .duration(dur_time)
      .call(yAxis)

  }

    d3.select("#namerica-button")
      .on('click', function(){
        showcontinent("North-America")
      })

    d3.select("#europe-button")
      .on('click', function(){
        showcontinent("Europe")
      })


    d3.select("#asia-button")
      .on('click', function(){
        showcontinent("Asia")
      })

    d3.select("#africa-button")
      .on('click', function(){
        showcontinent("Africa")
      })

    d3.select("#samerica-button")
      .on('click', function(){
        showcontinent("South-America")
      })

    d3.select("#oceania-button")
      .on('click', function(){
        showcontinent("Oceania")
      })


    d3.select("#tiny-countries")
      .on('click', function(){
        svg.selectAll(".not-tiny")
          .attr("r", 0)
      //   svg.selectAll(".continent")
      //    .attr("r", 0)
        svg.selectAll(".tiny-country")
          .attr("r", function(d) {
            return radiusScale(Math.sqrt(d.Population));
          })

      xPositionScale.domain([0,(d3.max(datapoints, function(d){return d.GDP_per_capita}))]).nice()
      yPositionScale.domain([0,(d3.max(datapoints, function(d){return d.life_expectancy}))]).nice()

      svg.selectAll(".continent")
          .attr("cx", function(d) {
            return xPositionScale(d.GDP_per_capita)
          })
          .attr("cy", function(d){
            return yPositionScale(d.life_expectancy)
          })

      svg.select(".x-axis")
        .transition()
        .duration(dur_time)
        .call(xAxis)

      svg.select(".y-axis")
        .transition()
        .duration(dur_time)
        .call(yAxis)

      })

    d3.select("#big-countries")
      .on('click', function(){
        svg.selectAll(".not-big")
          .attr("r", 0)
        svg.selectAll(".big-country")
            .attr("r", function(d) {
              return radiusScale(Math.sqrt(d.Population));
          })

      xPositionScale.domain([0,(d3.max(datapoints, function(d){return d.GDP_per_capita}))]).nice()
      yPositionScale.domain([0,(d3.max(datapoints, function(d){return d.life_expectancy}))]).nice()

      svg.selectAll(".continent")
          .attr("cx", function(d) {
            return xPositionScale(d.GDP_per_capita)
          })
          .attr("cy", function(d){
            return yPositionScale(d.life_expectancy)
          })

      svg.select(".x-axis")
        .transition()
        .duration(dur_time)
        .call(xAxis)

      svg.select(".y-axis")
        .transition()
        .duration(dur_time)
        .call(yAxis)

      })

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
      .text("GDP per capita");

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
      .text("Life expectancy");

  }
})();