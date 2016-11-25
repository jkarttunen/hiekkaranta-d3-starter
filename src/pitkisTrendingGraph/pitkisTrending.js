import createGraph from './simpleGraph.js'

// use require instead of import with d3 and css so that webpack will handle them right
require('./pitkisTrending.css');
const d3 = require('d3');

export default function init(selector) {
  const svg = d3.select(selector);
  const margin = {top: 30, right: 30, bottom: 40, left: 80};
  const elementWidth = +svg.attr('width') - margin.left - margin.right;
  const elementHeight = +svg.attr('height') - margin.top - margin.bottom;

  // adds svg group to svg node
  const container = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

  // initializes draw function
  const draw = createGraph(container)
      .width(elementWidth)
      .height(elementHeight);

  const url = 'https://cproxy.veikkaus.fi/trending';
  d3.json(url)
      .get((error, data) => {
        if (error) {throw error;}
        draw(data);
      });
}
