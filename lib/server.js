'use strict';

const fs = require('fs');
const X = require('xlsx');
const _ = require('xutil');
const koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const router = require('koa-router');
const detectPort = require('detect-port');
const requestSync = require('sync-request');

var start_date = _.moment().day(-7).format('YYYY-MM-DD');
var end_date = _.moment().format('YYYY-MM-DD');
var config = require('./config');

var pkg = require('../package');

var download = function(url, name) {
  //console.log(url);
  var distDir = path.join(__dirname, '..', '.temp');
  _.mkdir(distDir);
  var filePath = path.join(distDir, `${name}.xls`);

  if (!_.isExistedFile(filePath)) {
    const result = requestSync('GET', url);
    fs.writeFileSync(filePath, result.getBody());
  }
};

var to_json = workbook => {
  var result = {};
  workbook.SheetNames.forEach(function(sheetName) {
    var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
    if(roa.length > 0){
      result[sheetName] = roa;
    }
  });
  return result;
};

const dataAdatptor = data => {
  data = JSON
    .stringify(data)
    .replace(/日期/g, 'date')
    .replace(/-{3}/g, '0');
  data = JSON.parse(data);
  const firstSheetKey = Object.keys(data)[0];
  var tempData = data[firstSheetKey];
  tempData.pop();

  tempData = _.sortBy(tempData, item => {
    return item.date;
  });

  var res = {};
  tempData.forEach(item => {
    for (var i in item) {
      if (!res[i]) {
        res[i] = [];
      }
      res[i].push(item[i]);
    }
  });

  return res;
};

module.exports = options => {

  const app = koa();
  const p = path.join(__dirname, '..', 'public');
  app.use(serve(p));
  app.use(router(app));

  app.get('/', function *() {
    var start = this.query.start;
    var end = this.query.end;
    var file = path.join(__dirname, '..', 'index.html');
    var content = fs.readFileSync(file, 'utf8');
    content = content
      .replace('<#start_date#>', start || start_date)
      .replace('<#end_date#>', end || end_date);
    this.body = content;
    this.type = 'text/html';
  });

  app.get('/api/dayfx', function *() {
    var type = this.query.type;
    var start = this.query.start;
    var end = this.query.end;

    if (type === 'aux') {
      this.body = {
        success: true,
        data: `${config.goldHistorySearch}`
      };
    } else {
      var url = `${config.historyParityExport}?startDate=${start}&endDate=${end}`;
      var name = `${start}-${end}`;
      download(url, name);
      var wb = X.readFile(path.join(__dirname, '..', '.temp', `${name}.xls`));
      var json = to_json(wb);
      json = dataAdatptor(json);
      this.body = {
        success: true,
        data: json
      };
    }
  });

  detectPort(9001, function(err, port) {
    app.listen(port, function() {
      options.callback(port, start_date, end_date);
    });
  });
};
