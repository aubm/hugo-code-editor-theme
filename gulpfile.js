var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('fonts', function() {
    gulp.src('./node_modules/bootstrap-sass/assets/fonts/bootstrap/*')
        .pipe(gulp.dest('./public/fonts'));
});

gulp.task('serve', ['fonts', 'sass'] , function () {
    browserSync.init({ server: { baseDir: "./public" } });
    gulp.watch("public/**/*.scss", ['sass']);
    gulp.watch("public/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("./public/**/*.scss")
        .pipe(sass().on('error', handleError))
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.stream());
});

function handleError(err) {
    gutil.log(err);
    this.emit('end');
}
