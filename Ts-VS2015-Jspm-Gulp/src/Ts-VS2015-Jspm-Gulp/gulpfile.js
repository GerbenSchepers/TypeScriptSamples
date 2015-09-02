var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('clean', require('./build/tasks/clean')(gulp, plugins));
gulp.task('process-html', require('./build/tasks/process-html')(gulp, plugins));
gulp.task('process-css', require('./build/tasks/process-css')(gulp, plugins));
gulp.task('compile-typescript', require('./build/tasks/compile-typescript')(gulp, plugins));
gulp.task('copy-jspm', require('./build/tasks/copy-jspm')(gulp, plugins));
//gulp.task('build', ['clean', 'process-css', 'process-html', 'compile-typescript']);
