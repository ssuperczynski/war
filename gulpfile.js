var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('src/Main/FrontendBundle/Resources/public/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/Main/FrontendBundle/Resources/public/css'));
});