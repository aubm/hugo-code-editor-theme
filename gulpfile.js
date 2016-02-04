var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');

gulp.task('fonts', function() {
    gulp.src('./node_modules/bootstrap-sass/assets/fonts/bootstrap/*')
        .pipe(gulp.dest('./static/fonts'));
});

gulp.task('sass', function() {
    return gulp.src("./static/css/theme.scss")
        .pipe(sass().on('error', handleError))
        .pipe(gulp.dest('./static/css'));
});

gulp.task('watch', function() {
    gulp.watch('./static/**/*.scss', ['sass']);
});

gulp.task('default', function() {
    gulp.start('fonts', 'sass');
});

function handleError(err) {
    gutil.log(err);
    this.emit('end');
}
