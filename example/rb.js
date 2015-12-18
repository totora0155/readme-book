const readmeBook = require('..');

readmeBook({
  urls: [
    'https://github.com/totora0155/readme-book/blob/master/samples/a.md',
    'https://github.com/totora0155/readme-book/blob/master/samples/b.md',
    'https://github.com/totora0155/readme-book/blob/master/samples/c.md'
  ],
  output: './hoge.pdf'
});
