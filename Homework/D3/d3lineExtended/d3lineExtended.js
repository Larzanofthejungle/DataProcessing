var svg = d3.select("svg"),
    margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
    radius = 2,
    dataname = tem_2014;

var parseTime = d3.time.format("%Y%m%d");

var x = d3.time.scale().range([0, width]);

var y = d3.scale.linear().range([height, 0]),
    z = d3.scale.ordinal(d3.schemeCategory10);

var xAxis = d3.svg.axis()
    .orient("bottom")
  .scale(x)
    .ticks(d3.time.months);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(parseTime.parse(d.date)); })
    .y(function(d) { return y(d.temperature); });

var ids = ["tgem","tmin","tmax"];

var temp = ids.map(function(id) {
  return {
    id: id,
    values: dataname.map(function(d) {
      return {date: d.date, temperature: d[id] * 0.1};
    })
  };
});

var tgem = dataname.map(function(d) {
  return {date: d.date, temperature: d.tgem * 0.1};
});

var tmin = dataname.map(function(d) {
  return {date: d.date, temperature: d.tmin * 0.1};
});

var tmax = dataname.map(function(d) {
  return {date: d.date, temperature: d.tmax * 0.1};
});

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {return "<strong>Datum:</strong> <span style='color:red'>" + parseTime.parse(d.date) + "</span>";})
    .html(function(d) {return "<strong>Temperatuur:</strong> <span style='color:red'>" + d.temperature + " ºC</span>";})

g.call(tip);

x.domain(d3.extent(dataname, function(d) { return parseTime.parse(d.date); }));

y.domain([
  d3.min(temp, function(c) { return d3.min(c.values, function(d) { return d.temperature; }); }),
  d3.max(temp, function(c) { return d3.max(c.values, function(d) { return d.temperature; }); })
]);

z.domain(temp.map(function(c) { return c.id; }));

g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

g.append("g")
    .attr("class", "axis axis--y")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -100)
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("fill", "#000")
    .text("Temperature, ºC");

g.selectAll(".tgem")
    .data(tgem)
    .enter().append("circle")
      .attr("class", "tgem")
      .attr("cx", function(d) { return x(parseTime.parse(d.date)); })
      .attr("cy", function(d) { return y(d.temperature); })
      .attr("r", radius)
      .style("fill", "steelblue")
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

g.selectAll(".tmin")
    .data(tmin)
    .enter().append("circle")
      .attr("class", "tmin")
      .attr("cx", function(d) { return x(parseTime.parse(d.date)); })
      .attr("cy", function(d) { return y(d.temperature); })
      .attr("r", radius)
      .style("fill", "green")
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

g.selectAll(".tmax")
    .data(tmax)
    .enter().append("circle")
      .attr("class", "tmax")
      .attr("cx", function(d) { return x(parseTime.parse(d.date)); })
      .attr("cy", function(d) { return y(d.temperature); })
      .attr("r", radius)
      .style("fill", "red")
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

var tem = g.selectAll(".tem")
  .data(temp)
  .enter().append("g")
    .attr("class", "tem");

tem.append("path")
    .attr("class", function(d) { return d.id; })
    .attr("d", function(d) { return line(d.values); })
    .style("stroke", function(d) { return z(d.id); });

tem.append("text")
    .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
    .attr("transform", function(d) { return "translate(" + x(parseTime.parse(d.value.date)) + "," + y(d.value.temperature) + ")"; })
    .attr("x", 3)
    .attr("dy", "0.35em")
    .style("font", "10px sans-serif")
    .text(function(d) { return d.id; });


function updateData() {

    if (dataname == tem_2014) {
      document.location = "d3lineExtended.html" + "?dataname=tem_2015";
    }
    else {
      document.location = "d3lineExtended.html" + "?dataname=tem_2014";
    }


}
