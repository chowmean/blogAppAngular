/**
 * Created by chowmean on 7/5/16.
 */
/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename');

// create a default task and just log a message
gulp.task('default', function() {
    return gutil.log('Gulp is running!')
});


gulp.task('build-js', function() {
    return gulp.src('app/app.js')
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        //only uglify if gulp is ran with '--type production'
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app'));
});


gulp.task('build-css', function() {
        return gulp.src('app/app.css')
            .pipe(minifyCss({compatibility: 'ie8', keepBreaks:false}))
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest('app'));
});

gulp.task('build-blogjs', function() {
    return gulp.src('app/viewBlog/viewBlog.js')
        .pipe(sourcemaps.init())
        .pipe(concat('viewBlog.min.js'))
        //only uglify if gulp is ran with '--type production'
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/viewBlog/'));
});