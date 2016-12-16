/*
  Lars Overwater
  10800077
  Data Processing
*/

var world = new Datamap({element: document.getElementById("container"),

    // invulkleuren (0-10% is lichtblauw, 90-100% is donkerblauw)
    fills: {'0-5L': '#fed98e',
            '5-10L': '#fe9929',
            '10-15L': '#d95f0e',
            '15-20L': '#993404',
            defaultFill: '#ffffd4'},

    // eigenschappen van iedere regio
    geographyConfig:{
        borderColor: '#429ddd',
        highlightBorderWidth: 1,
        highlightFillColor: '#5b9ec6',
        highlightBorderColor: '#8ecae1',
        popupTemplate: function(geo, data) {
            return ['<div class="hoverinfo"><strong>',
                'Pure alcohol drunk per capita per year in ' + geo.properties.name,
                ': ' + data.alcohol,
                ' L</strong></div>'].join('');
        }
    },

    done: function(datamap, geo, data) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geo, data) {
              for (i = 0; i < alcoholdata.length; i++) {
                if (alcoholdata[i].country == geo.id){
                  makePieChart(geo.properties.name, alcoholdata[i])
                }
              }
            });
    },

});

for (i = 0; i < alcoholmapdata.length; i++) {
  world.updateChoropleth(alcoholmapdata[i]);
}

world.legend();


function makePieChart(country_name, datapoint){

    d3.select(".piechart").remove();

    var data = [ 1 ];

    data = data.map(function(d) { return [
      {
        name: "Beer",
        percentage: datapoint.beer,
        fill: "#f79400"
      },
      {
        name: "Wine",
        percentage: datapoint.wine,
        fill: "#ce0a31"
      },
      {
        name: "Spirits",
        percentage: datapoint.spirits,
        fill:" #d7faf3"
      },
      {
        name: "Other",
        percentage: datapoint.other,
        fill: "#b9d48b"
      }
    ];});

    data = data[0];

    var width = 960,
        height = 300,
        radius = Math.min(width, height - 40) / 2;

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.percentage; });

    var svg = d3.select("body").append("svg")
        .attr("class", "piechart")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    d3.select(".piechart").append("text")
        .attr("y", height - 220)
        .text(function(d) { return "Alcohol consumption in " + country_name + " per category:"; });

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([100, 0])
        .html(function(d) {return "<strong>Percentage: </strong> <span>" + d.data.percentage + "%</span>";})

    var g = svg.selectAll(".arc")
        .data(pie(data))
      .enter().append("g")
        .attr("class", "arc");

    g.call(tip);

    g.append("path")
        .attr("class", function(d) { return d.data.name; })
        .attr("d", arc)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.data.name; });

}
