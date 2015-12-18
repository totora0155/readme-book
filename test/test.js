const readmeBook = require('..'),
  cheerio = require('cheerio');

it('readme-book', (done) => {
  const result = readmeBook({
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
    done();
  });

});

// <section><h2><a id="user-cddontent-a" class="anchor" href="#a" aria-hidden="true"><span class="octicon octicon-link"></span></a>a</h2>
//
// <p>test</p>
// </section><section><h2><a id="user-content-b" class="anchor" href="#b" aria-hidden="true"><span class="octicon octicon-link"></span></a>b</h2>
//
// <p>test</p>
// </section><section><h2><a id="user-content-c" class="anchor" href="#c" aria-hidden="true"><span class="octicon octicon-link"></span></a>c</h2>
//
// <p>test</p>
// </section>
//
//
// <section><h2><a id="user-content-a" class="anchor" href="#a" aria-hidden="true"><span class="octicon octicon-link"></span></a>a</h2>
//
// <p>test</p>
// </section><section><h2><a id="user-content-b" class="anchor" href="#b" aria-hidden="true"><span class="octicon octicon-link"></span></a>b</h2>
//
// <p>test</p>
// </section><section><h2><a id="user-content-c" class="anchor" href="#c" aria-hidden="true"><span class="octicon octicon-link"></span></a>c</h2>
//
// <p>test</p>
// </section>
