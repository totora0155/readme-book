const readmeBook = require('..'),
  fs = require('fs'),
  cheerio = require('cheerio');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('readme-book suites', () => {

  it('stdout result', (done) => {
    readmeBook({
      urls: [
        'https://github.com/totora0155/readme-book/blob/master/samples/a.md',
        'https://github.com/totora0155/readme-book/blob/master/samples/b.md',
        'https://github.com/totora0155/readme-book/blob/master/samples/c.md'
      ],
      output: false
    }, (result) => {
      const $result = cheerio.load(result);
      expect($result('h1').length).toEqual(1);
      expect($result('h2').length).toEqual(2);
      setTimeout(() => {
        done();
      }, 1000);
    });
  });

  it('created .html', (done) => {
    readmeBook({
      urls: [
        'https://github.com/totora0155/readme-book/blob/master/samples/a.md'
      ],
      output: './test/test.html'
    }, () => {
      setTimeout(() => {
        const stat = fs.statSync('./test/test.html');
        expect(stat.isFile()).toBe(true);
        done();
      }, 1000);
    });
  });

  it('created .pdf', (done) => {
    readmeBook({
      urls: [
        'https://github.com/totora0155/readme-book/blob/master/samples/a.md'
      ],
      output: './test/test.pdf'
    }, () => {
      setTimeout(() => {
        const stat = fs.statSync('./test/test.pdf');
        expect(stat.isFile()).toBe(true);
        done();
      }, 1000);
      done();
    });
  });

});
