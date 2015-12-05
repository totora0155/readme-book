const gulp = require('gulp'),
      eslint = require('gulp-eslint'),
      postcss = require('gulp-postcss'),
      cssvars = require('postcss-cson-cssvars'),
      namespace = require('postcss-namespace'),
      preref = require('postcss-preref'),
      stylelint = require('stylelint')
      reporter = require('postcss-reporter')
      cssnano = require('cssnano');

const eslintFiles = [
  '**/*.js',
  '!node_modules/**/*.js'
];

gulp.task('eslint', () => {
  gulp.src(eslintFiles).pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('postcss', () => {
  gulp.src('./src/*.css')
    .pipe(postcss([
      cssvars,
      namespace,
      preref,
      stylelint,
      reporter({clearMessages: true}),
      cssnano
    ]))
    .pipe(gulp.dest('./templates'));
});

gulp.task('default', ['eslint', 'postcss'], (e) => {
  if (e.type !== 'deleted') {
    gulp.watch('./src/*.css', ['postcss']);
    gulp.watch(esLintfiles, ['eslint']);
  }
});
