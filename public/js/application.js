


$(document).ready(function() {
  canvas = d3.select(".d3-wrapper").append("svg").attr("width", 2000).attr("height", 200).attr("class", "svg-wrapper");
 $(".link-ward").on("click", function(event) {
  event.preventDefault();
  var $link = $(this);
  var url = $link.attr("href");
  var ajaxRequest = $.ajax({
      url: url,
      type: 'get'
    });

    ajaxRequest.done(function (jsonWardCrimeData) {
      $link.toggle();
      var sorted = sortIncremental(jsonWardCrimeData);
      console.log(sorted);
      createBubbles(sorted);
    });

 }) // end click event for seeing the bubbles

 $('body').on("click", 'circle', function() {
        var $clicked_circle = $(this);
        var $id = $clicked_circle.attr('id');
        var url = $('.ward-link' + $id).attr("href");
        console.log(url)
        $('.ward-info').html("<div class='ward-data'><h1>" + $id + "th ward</h1><br><h2>" + $(this).attr("crimes") + " crimes commited, scary!</h2></div>");

        var ajaxRequest = $.ajax({
          url: url,
          type: 'get'
        });

        ajaxRequest.done(function (jsonWardCrimeData) {
          console.log(jsonWardCrimeData);
          console.log("yop")
          $('.specific-data').html(jsonWardCrimeData);
        });

    });

  var createBubbles = function(jsonData) {
    // window.jsonData = jsonData;
    console.log(jsonData);
    var past_position_x = 50;
    var past_position_y = 100;

    var keys = Object.keys(jsonData);

    for (var index = 0; index < keys.length; index++) {
       canvas.insert("a").attr("href", "wards/" + keys[index]).attr("class", "ward-link" + keys[index]);
       var circle = canvas.append("circle").attr("cx", past_position_x).attr("cy", past_position_y).attr("r", jsonData[keys[index]]).attr("fill", "red").attr("id", keys[index]).attr("class", "ward").attr("crimes", jsonData[keys[index]]);
       console.log('#' + index);

       past_position_x += (jsonData[keys[index]]) * 2.25
    }
  } // end createBubbles

  var sortIncremental = function(data) {
    var array = []
    for (wardNumber in data) {
      var crimeCount = data[wardNumber]
      array[wardNumber] = {ward: wardNumber, crimeCount: crimeCount}
    }
    return array.sort(function (wardObj1, wardObj2) {
      return wardObj1.crimeCount - wardObj2.crimeCount
    })
  }

}); // end document ready


