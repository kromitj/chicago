


$(document).ready(function() {
  canvas = d3.select(".d3-wrapper").append("svg").attr("width", 2500).attr("height", 200).attr("class", "svg-wrapper");

 $(".see-by-crime-count").on("click", function(event) {
  event.preventDefault();
  var $link = $(this);
  var url = $link.attr("href");
  var ajaxRequest = $.ajax({
      url: url,
      type: 'get'
    });

    ajaxRequest.done(function (jsonWardCrimeData) {
      var sorted = sortIncremental(jsonWardCrimeData);
      createBubbles(sorted);
    });

 }) // end click event for seeing the bubbles by

 $(".see-by-ward").on("click", function(event) {
  event.preventDefault();
  var $link = $(this);
  var url = $link.attr("href");
  var ajaxRequest = $.ajax({
      url: url,
      type: 'get'
    });

    ajaxRequest.done(function (jsonWardCrimeData) {
      var wardObjs = jsonToWardObj(jsonWardCrimeData);
      createBubbles(wardObjs);
    });

 }) // end click event for seeing the bubbles by

// click event for all circles
 $('body').on("click", 'circle', function() {
        var $clicked_circle = $(this);
        var $id = $clicked_circle.attr('id');
        var url = $('.ward-link' + $id).attr("href");
        $('.ward-info').html("<div class='ward-data'><h1>" + $id + "th ward</h1><br><h2>" + $(this).attr("crimes") + " crimes commited, scary!</h2></div>");

        var ajaxRequest = $.ajax({
          url: url,
          type: 'get'
        });

        ajaxRequest.done(function (jsonWardCrimeData) {
          $('.specific-data').html(jsonWardCrimeData);
        });

  });

 $('.specific-data').on('click', '.case-link', function(event) {
    event.preventDefault();
    var url = $(this).attr("href");
    var ajaxRequest = $.ajax({
      url: url,
      type: 'get'
    });

    ajaxRequest.done(function (caseFullDetailsPartial) {
      // This isn't working, no idea

      var $link = $(this);
      $link.html(caseFullDetailsPartial);
      var $_case = $(this).attr("case-link");
      var $span_wrapper = $(".case-span" + $_case)
      console.log(caseFullDetailsPartial);
      $span_wrapper.html(caseFullDetailsPartial);
    });

 })

  var createBubbles = function(wardObj) {
   // takes in wardObj [{ ward: X, crimeCount: X}]
   var past_position_x = 50;
    var past_position_y = 100;
    canvas.html("");
    var nextWardObj = 0;
    for (var index = 0; index < wardObj.length; index++) {
      var currentWardObj = wardObj[index];
      if (index < wardObj.length - 1) {
        var nextWardObj = wardObj[index + 1];
      };

       canvas.insert("a").attr("href", "wards/" + currentWardObj.ward).attr("class", "ward-link" + currentWardObj.ward);
       var circle = canvas.append("circle").attr("cx", past_position_x).attr("cy", past_position_y).attr("r", currentWardObj.crimeCount).attr("fill", "red").attr("id", currentWardObj.ward).attr("class", "ward").attr("crimes", currentWardObj.crimeCount);

       past_position_x += (currentWardObj.crimeCount) + (nextWardObj.crimeCount) - 0;
    }
  } // end createBubbles


  var jsonToWardObj = function(data) {
    // takes in json returns an array of wardObjs: [{ ward: X, crimeCount: X}]
    var array = [];
    for (wardNumber in data) {
      var crimeCount = data[wardNumber];
      array.push({ward: wardNumber, crimeCount: crimeCount});
    }
    return array;
  } // end sortIncremental

  var sortIncremental = function(data) {
    // takes in json returns an array of wardObjs: [{ ward: X, crimeCount: X}]
    var array = jsonToWardObj(data);
    return array.sort(function (wardObj1, wardObj2) {
      return wardObj1.crimeCount - wardObj2.crimeCount;
    })
  } // end sortIncremental

}); // end document ready


