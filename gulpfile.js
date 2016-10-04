// npm install gulp gulp-mocha

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('build', function () {
  var tsResult = tsProject
    .src()
    .pipe(tsProject());

  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('test', ['build'], function () {
  return gulp.src(['test/*.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec',
      globals: {
        //should: require('should')
      }
    }));
});

gulp.task('default', ['build']);