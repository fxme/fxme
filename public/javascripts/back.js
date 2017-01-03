
  /*
  var draw = function(gdata) {
    console.log(gdata);
    return;
    var data = [];
    var pos;
    var xdomain = gdata.length;
    var colors = ['red', 'green'];

    var margin = {
      top: 40,
      right: 40,
      bottom: 50,
      left: 60
    };
    var width = 760 - margin.left - margin.right;
    var height = 450 - margin.top - margin.bottom;
    var d1 = [];
    var d2 = [];

    for (var i = 0; i < xdomain; i++) {
      //console.log(gdata[i])
      d1.push([i, parseFloat(gdata[i]['USD/CNY'])]);
      //d2.push([i, parseFloat(gdata[i]['EUR/CNY'])]);
    }

    data.push(d1);
    //data.push(d2);

   // console.log(data);

  function mouseOverArc(i, e) {
    console.log(i)
    console.log(e)
  };

  function mouseMoveArc(i, e) {
    //console.log(e)
  };

  function mouseOutArc(i, e) {
    //console.log(e)
  };

    var svg = d3
      .select('#content .chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    var x = d3
      .scale
      .linear()
      .range([0, width])
      .domain([0, xdomain]);

    var y = d3
      .scale
      .linear()
      .range([height, 0])
      .domain([6.64, 6.7]);

    var xAxis = d3
      .svg
      .axis()
      .scale(x)
      .orient('bottom');

    var yAxis = d3
      .svg
      .axis()
      .scale(y)
      .orient('left');

    var line = d3
      .svg
      .line()
      .x(function(d) {
        return x(d[0]);
      })
      .y(function(d) {
        return y(d[1]);
      })


    svg
      .append('g')
      .call(xAxis)
      .attr('transform', 'translate(0,' + height + ')');

    svg.append('g')
      .call(yAxis);

    for (idx in data) {
      svg
        .append('path')
        .datum(data[idx])
        .style('stroke', 'white')
        .style('fill', 'transparent')
        .attr('d', line)
        //.on("mouseover", mouseOverArc)
        //.on("mousemove", mouseMoveArc)
        //.on("mouseout", mouseOutArc);

    }
  };

  var initBrush = function(date) {
    var totalWidth = $('#content .timePickerOuter').width();
    var dateWidth = 50 * date.length <= totalWidth ? totalWidth / date.length : 50;
    var svg = d3
      .select('#content .timePickerOuter')
      .append('svg')
      .attr({
        width: dateWidth * date.length,
        height: $('#content .timePickerOuter').height()
      })
      .append('g');

    var brushXScale = d3
      .scale
      .ordinal()
      .rangeRoundBands([0, dateWidth * date.length])
      .domain(date);

    var xAxis = d3
      .svg
      .axis()
      .scale(brushXScale);

    var brush = d3
      .svg
      .brush()
      .x(brushXScale)
      .extent([1, 2]);

    svg.append('g').call(xAxis);
    var g = svg
      .append('g')
      .attr('name', 'brush')
      .call(brush)
      .call(brush.event)
      .selectAll('rect')
      .attr({
        height: 50,
      })

    brush.on('brushend', function() {
      var e = brush.extent();
      var startPixel = e[0];
      var endPixel = e[1];

      var range = [];
      date.forEach(function(d) {
        var coordinate = brushXScale(d) + brushXScale.rangeBand() / 2;
        //console.log(d);
        if (coordinate >= startPixel && coordinate <= endPixel) {
          range.push(d);
        }
        //
      });
      console.log(range);
    });
  };
*/
