var width = 800,
height = 1000;
    
  var geoCanvas = d3.select(".map-wrapper").append("svg")
    .attr("width", width)
    .attr("height", height)

  d3.json("https://data.cityofchicago.org/api/geospatial/sp34-6z76?method=export&format=GeoJSON", function(data) {
    wards = data.features;
  
    var group = geoCanvas.selectAll("g")      
      .data(data.features)
      .enter()
      .append("g").attr("class", "ward")
      group[0].forEach(function(g) {console.log("yo" + d3.select(g).data())})

var center = d3.geo.centroid(data)
      var scale  = 100;
      var offset = [width/3.5, height/3.5];
      var projection = d3.geo.mercator().scale(scale).center(center)
          .translate(offset);
          
    var path = d3.geo.path().projection(projection);
    
     // using the path determine the bounds of the current map and use 
      // these to determine better values for the scale and translation
      var bounds  = path.bounds(data);
      var hscale  = scale*width  / (bounds[1][0] - bounds[0][0]);
      var vscale  = scale*height / (bounds[1][1] - bounds[0][1]);
      var scale   = (hscale < vscale) ? hscale : vscale;
      var offset  = [width - (bounds[0][0] + bounds[1][0])/2,
                        height - (bounds[0][1] + bounds[1][1])/2];
    var count = 1;                
    projection = d3.geo.mercator().center(center)
        .scale(scale).translate(offset);
      path = path.projection(projection);
      console.log(group)
    var areas = group.append("path")
      .attr("d", path)
      .attr("class", "area")
      .style('opacity', 1)
      .attr("fill", "steelblue").attr("id", count)
      .style("stroke", "black")
      .style("stroke-width", 1);

  });