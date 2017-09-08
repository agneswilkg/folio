var gulp = require('gulp');
//requires the gulp-sass plugin
var sass = require('gulp-sass');
//require browser Sync
var browserSync = require('browser-sync').create();
//for merging different .js files in one
var useref = require('gulp-useref');
//necessary for minifying .js and .css files
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

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

//merges .js files into one
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    //minifies just if its JS files
    .pipe(gulpIf('*.js', uglify()))
    //and only if it's css file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});
