//定义依赖和插件
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect');//livereload
   
var jsSrc = 'src/js/*.js';
var jsDist = 'dist/js';

var htmlSrc = 'src/*.html';
var htmlDist = 'dist';

//定义名为js的任务
gulp.task('js', function () {

    gulp.src(jsSrc)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsDist))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(jsDist))
        .pipe(connect.reload())

});

//定义html任务
gulp.task('html', function () {

    gulp.src(htmlSrc)
        .pipe(gulp.dest(htmlDist))
        .pipe(connect.reload());

});

//定义livereload任务
gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});


//定义看守任务
gulp.task('watch', function () {

    gulp.watch('src/*.html', ['html']);

    gulp.watch('src/js/*.js', ['js']);
gulp.watch('src/css/*.css', []);
});


//定义默认任务
gulp.task('default', [ 'watch', 'connect']);