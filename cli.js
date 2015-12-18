'use strict';

const readmeBook = require('./index.js'),
      opts = require('minimist')(process.argv.slice(2));

if (isValid(opts)) {
  readmeBook(opts);
} else if (opts.h || opts.help) {
  showHelp();
} else {
  showHelp();
}

function isValid(opts) {
  return opts.urls || opts['config-file'];
}

function showHelp() {
  console.error('Usage:');
  console.error("    readme-book --urls http://xxx.com, http://xxx.com");
  console.error("    readme-book --config-file ./readme-book.json");
  console.error("    readme-book -h[elp]");
  process.exit(1);
}
