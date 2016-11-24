// use require instead of import with d3 and css so that webpack will handle them right
require('!style-loader!css-loader!./pitkisTrending.css');
const d3 = require('d3');

import createGraph from './simpleGraph.js'

// based on https://bl.ocks.org/mbostock/3885304

const url = 'https://cproxy.veikkaus.fi/trending';

// initialization code. prepares Dom and scales
const svg = d3.select("#app"),
    margin = {top: 30, right: 30, bottom: 40, left: 80},
    elementWidth = +svg.attr("width") - margin.left - margin.right,
    elementHeight = +svg.attr("height") - margin.top - margin.bottom;

//adds svg group to svg node
const container = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// initializes draw function
const draw = createGraph(container)
    .width(elementWidth)
    .height(elementHeight);

d3.json(url)
    .get((error, data)=> {
        if (error) throw error;
        draw(data);
    });

