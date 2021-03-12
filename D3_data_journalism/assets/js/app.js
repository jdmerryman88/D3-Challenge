// @TODO: YOUR CODE HERE!
// Chart Params
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

});
