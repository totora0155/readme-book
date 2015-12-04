const gulp = require('gulp'),
      eslint = require('gulp-eslint');

const eslintrc = require('./.eslintrc');

files = [
  '**/*.js',
  '!node_modules/**/*.js'
];

gulp.task('eslint', () => {
  gulp.src(files).pipe(eslint(eslintrc))
    .pipe(eslint.format());
    // .pipe(eslint.failAfterError());
});

gulp.task('lint', ['eslint'], (e) => {
  if (e.type !== 'deleted') {
    gulp.watch(files, ['eslint']);
  }
});
