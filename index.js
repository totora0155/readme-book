'use strict';

const fs = require('fs'),
      path = require('path');



const co = require('co'),
      request = require('request'),
      cheerio = require('cheerio'),
      pdf = require('html-pdf');

const github = require('./libs/github'),
      store = require('./libs/store');


function readFile(filePath, cb) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) return reject(err);
      return cb ? resolve(cb(data)) : resolve(data);
    });
  });
};

function getReadme (url) {
  console.log(123);
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err && res.statusCode != 200) return reject(err);

      const $body = cheerio.load(body);
      resolve($body('.markdown-body').html());
    });
  });
};

co(function* () {
  const base = yield readFile(path.join(__dirname, 'templates/base.html')),
        $base = cheerio.load(base),
        style = yield readFile(path.join(__dirname, 'templates/style.css')),
        config = yield readFile('./readme-book.json', (data) => {
          return JSON.parse(data);
        }),
        data = yield config.urls.map(getReadme);

  $base('head').append(`<style>${style}</style>`)
  data.forEach((aa) => {
    $base('body').append(`<section>${aa}</section>`);
  });
  // console.log($base.html());
  fs.writeFile('index.html', $base.html(), (err) => {
    console.log('Save! index.html');
  });
  pdf.create($base.html()).toFile('./test.pdf', function(err, res) {
  });

}).catch(onerror);

function onerror(err) {
  console.error(err);
};
// var $base = co.wrap(function* (){
  // const html = yield Promise.resolve(true);
  //  const html = yield new Promise((resolve, reject) => {
    //  fs.readFile('./templates/base.html', 'utf-8', (data) => {
        // resolve(data);
    //  });
  //  });
// });

// console.log(fn);

  // const = fs.readFileSync('./templates/base.html', 'utf-8');

// pdf.create(html).toFile('./test.pdf', function(err, res) {
//   if (err) return console.log(err);
//   console.log('Created! ' + res.filename);
// });


// const content = '/gulpjs/gulp'
// request(github.get(content), function(err, res, html) {
//   if (!err && res.statusCode == 200) {
//     let $ = cheerio.load(html);
//
//     const body = $('.markdown-body').html();
//     store.set({content, body});
//
//     console.log(store.get());
//   }
// });


// var req = https.request(option, function(res) {
//   // console.log("statusCode: ", res.statusCode);
//   // console.log("headers: ", res.headers);
//
//   res.on('data', function(d) {
//     html += d
//     // process.stdout.write(d);
//   });
//
//   res.on('end')
// });
// req.end();
//
// req.on('error', function(e) {
//   console.error(e);
// });
