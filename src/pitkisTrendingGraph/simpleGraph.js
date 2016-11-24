const d3 = require('d3');

// reusable bar graph
// Takes in width, height, scales and container
// returns a function that draws or updates graph when it reveives a data.
// this should be in separate file in bigger projects, away from initialization code
export default function createGraph(width, height, x, y, g){
    return function drawGraph(data) {
      x.domain(data.map(function(d) { return d.id; }));
      y.domain([0, d3.max(data, function(d) { return d.score; })]);

      g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")

      g.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(y).ticks(10))
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Frequency");

      g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.id); })
          .attr("y", function(d) { return y(d.score); })
          .attr("width", x.bandwidth())
          .attr("height", function(d) { return height - y(d.score); });
    }
}
