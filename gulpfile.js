var gulp = require('gulp');
//requires the gulp-sass plugin
var sass = require('gulp-sass');
//require browser Sync
var browserSync = require('browser-sync').create();


//converts sass to css
gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss') //gets all files ending with .scss in app/scss and children dirs
    .pipe(sass()) //converts sass file to css
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

//watch for changes in files
gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  //other watchers
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});
