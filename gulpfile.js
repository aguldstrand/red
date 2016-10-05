const red = require('./src/main')
const gulp = require('gulp');

gulp.task('build', ['build'], function () {
  red('./test', {}, (err) => {
    console.log('banan');
  })
});

gulp.task('default', ['build']);