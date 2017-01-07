(function($) {

  var getQueryParameters = function(str) {
    return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n=n.split("="),this[n[0]]=n[1],this;}.bind({}))[0];
  };

  var myChart = echarts.init($('#main')[0]);

  myChart.showLoading();

  var render = function(data) {

    var getSelected = function(arr) {
      var res = {};
      Object.keys(data).forEach(item => {
        if (!~arr.indexOf(item)) {
          res[item] = false;
        } else {
          res[item] = true;
        }
      });
      return res;
    };
    var dates = data.date;
    delete data.date;
    myChart.hideLoading();

    var currencyPairs = [];
    var series = [];

    $.each(data, function(key, val) {
      var serie = {};
      serie.name = key;
      serie.data = val;
      serie.type= 'line';
      series.push(serie);
      currencyPairs.push({
        name: key,
        icon: 'circle',
        textStyle: {
          color: '#fff'
        }
      });
    });

    var option = {
      textStyle: {
        color: '#fff'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: currencyPairs,
        orient: 'horizontal',
        left: '150',
        right: '150',
        top: '20',
        padding: [0, 0, 0, 0],
        selected: getSelected(['USD/CNY']),
      },
      toolbox: {
        feature: {
          magicType : {
            show: true,
            type: ['line', 'bar', 'stack', 'tiled']
          }
        }
      },
      grid: {
        bottom: '0',
        top: '100',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap : false,
        data: dates
      }],
      yAxis: [{
        type : 'value',
        scale: true,
        boundaryGap: [0.01, 0.01],
        splitArea: {
          show: true
        }
      }],
      dataZoom: [{
        type: 'inside',
        start: 0,
        end: 100
      }, {
        start: 0,
        end: 100,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '60%',
        handleStyle: {
          color: '#FA8072',
          shadowBlur: 1,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 1,
          shadowOffsetY: 1
        }
      }],
      series: series
    };

    myChart.setOption(option);
  };

  $.ajax({
    url: '/api/dayfx',
    data: {
      start: getQueryParameters().start,
      end: getQueryParameters().end
    },
    method: 'get',
    success: function(res) {
      if (res.success) {
        render(res.data);
      }
    }
  });

  $.ajax({
    url: '/api/dayfx?type=aux',
    data: {
      start: getQueryParameters().start,
      end: getQueryParameters().end
    },
    method: 'get',
    success: function(res) {
      if (res.success) {
        console.log(res.data);
      }
    }
  });

  $('.datepicker').on('change', function(e) {
    var id = e.target.id;
    var value = e.target.value;

    if (id === 'start') {
      var url = `${location.protocol}//${location.host}/?start=${value}&end=${$('#end').val()}`;
    } else {
      var url = `${location.protocol}//${location.host}/?start=${$('#start').val()}&end=${value}`;
    }

    location.href = url;
  });

})(jQuery);
