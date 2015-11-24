var gulp = require('gulp');

gulp.task('default', function() {
  gulp.src('app/**/*.js')
  .pipe(minify())
  .pipe(gulp.dest('build'));
});