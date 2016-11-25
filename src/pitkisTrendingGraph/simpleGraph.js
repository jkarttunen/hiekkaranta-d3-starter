const d3 = require('d3');

// reusable bar graph

// Takes in width, height, scales and container
// returns a function that draws or updates graph when it reveives a data.
// this should be in separate file in bigger projects, away from initialization code

export default function chart(container) {
  let width = 720; // default width
  let height = 80; // default height

  let xScale = d3.scaleBand().rangeRound([0, width]).padding(0.1);
  let yScale = d3.scaleLinear().rangeRound([height, 0]);

  function my(data) {
    xScale.domain(data.map(d => {return d.id;}));
    yScale.domain([0, d3.max(data, d => {return d.score;})]);

    container.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0,${height})`)

    container.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(yScale).ticks(10))
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Frequency');

    container.selectAll('.bar')
      .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => {return xScale(d.id);})
        .attr('y', d => {return yScale(d.score);})
        .attr('width', xScale.bandwidth())
        .attr('height', d => {return height - yScale(d.score);});
  }

  my.width = function setWidth(value) {
    if (!arguments.length) {return width;}
    width = value;
    xScale = d3.scaleBand().rangeRound([0, width]).padding(0.1)
    return my;
  };

  my.height = function setHeight(value) {
    if (!arguments.length) {return height;}
    height = value;
    yScale = d3.scaleLinear().rangeRound([height, 0])
    return my;
  };

  return my;
}
