// @TODO: YOUR CODE HERE!
// Chart Params
function makeResponsive(){
let svgWidth = 960;
let svgHeight = 500;

let margin = {top : 20 , right: 40, bottom: 60, left: 50};

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

let svg = d3
    .select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

let chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Import data from an external CSV file
d3.csv("./assets/data/data.csv").then(function(csvData) {
    console.log(csvData);
    console.log([csvData]);

csvData.forEach(function(data){
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;

});
// Create scaling functions
let xScale = d3.scaleLinear()
    .domain([6, d3.max(csvData, d=> d.poverty)])
    .range([0, width]);

let yScale = d3.scaleLinear()
.domain([0, d3.max(csvData, d=> d.healthcare)])
.range([height, 0]);

// Create axis functions
let bottomAxis = d3.axisBottom(xScale);
let leftAxis = d3.axisLeft(yScale);

//Add x and y axis to chart
chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

chartGroup.append("g")
    .call(leftAxis);

let circlesGroup = chartGroup.selectAll("circle")
    .data(csvData)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.poverty))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", "40")
    .classed("stateCircle" , true)

chartGroup.selectAll(".text")
    .data(csvData)
    .enter()
    .append("text")
    .attr("x", (d) => xScale(d.poverty))
    .attr("y", d => yScale(d.healthcare))
    .text(d => d.abbr)
    .classed("stateText", true);

// Append axis titles
chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .text("Poverty (%)");

chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y" , 0-margin.left)
  .attr("x", 0 - (height/2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
    .text("Healthcare (%)");


}).catch(function(error) {
  console.log(error);

// let toolTip = d3.select('body').append("div")
//     .attr("class", "tooltip");

// circlesGroup.on('mouseover', function(event,d){
//     toolTip.style('display', 'block');
//     toolTip.html(`Test <strong>${d}</strong>`)
//         .style("left", event.pageX + "px")
//         .style("top", event.pageY + 'px');
// })    
// .on('mouseout', function(){
//     toolTip.style('display', 'none');
// })


});
}

makeResponsive();

d3.select(window).on("resize", makeResponsive);


