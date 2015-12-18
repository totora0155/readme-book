'use strict';

const fs = require('fs'),
      path = require('path');

const co = require('co'),
      request = require('request'),
      cheerio = require('cheerio'),
      pdf = require('html-pdf');

const readmeBook = function readmeBook(opts, cb) {
  function readFile(filepath, cb) {
    return new Promise((resolve, reject) => {
      fs.readFile(filepath, 'utf-8', (err, data) => {
        if (err) return reject(err);
        return cb ? resolve(cb(data)) : resolve(data);
      });
    });
  };

  function getReadme (url) {
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
      outputPath = (function() {
        if (opts.o || opts.output) {
          return opts.o || opts.output;
        } else {
          if (opts.o == false || opts.output == false) {
            return '';
          } else {
            return './readme-book.pdf';
          }
        }
      })();

    var urls = null,
      data = null;

    if (opts['config-file']) {
      const config = yield readFile(opts['config-file'], (data) => { return JSON.parse(data); });
      urls = config.urls
    } else if (opts.urls) {
      if (Array.isArray(opts.urls)) {
        urls = opts.urls;
      } else {
        urls = opts.urls.split(',');
      }
    }

    data = yield urls.map(getReadme);

    $base('head').append(`<style>${style}</style>`)
    data.forEach((aa) => {
      $base('body').append(`<section>${aa}</section>`);
    });

    if (outputPath.indexOf('.html') > -1 ) {
      fs.writeFile(outputPath, $base.html(), (err) => {
        console.log('Created! ' + path.basename(outputPath));
      });
    } else if (outputPath.indexOf('.pdf') > -1) {
      pdf.create($base.html()).toFile(outputPath, function(err, res) {
        console.log('Created! ' + path.basename(outputPath));
      });
    } else {
      const result = $base('.rb__body').html();
      console.log(result);
      return cb(result)
    }

    return cb !== undefined ? cb() : null;

  }).catch(onerror);

  function onerror(err) {
    console.error(err);
  };

};

module.exports = readmeBook;
