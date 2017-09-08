var gulp = require('gulp');
//requires the gulp-sass plugin
var sass = require('gulp-sass');

//converts sass to css
gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss') //gets all files ending with .scss in app/scss and children dirs
    .pipe(sass()) //converts sass file to css
    .pipe(gulp.dest('app/css'))
});

//watch for changes in files
gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  //other watchers
})
