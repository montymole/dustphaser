 var site = require('./config.json'),
     path = require('path'),
     gulp = require('gulp'),
     gutil = require('gulp-util'),
     gulpif = require('gulp-if'),
     rename = require('gulp-rename'),
     sass = require('gulp-sass'),
     minifycss = require('gulp-minify-css'),
     base64 = require('gulp-base64'),
     concat = require('gulp-concat'),
     jsValidate = require('gulp-jsvalidate'),
     uglify = require('gulp-uglify'),
     insert = require('gulp-insert'),

     //path wars
     tmp_dir = path.join(__dirname, 'tmp'),
     pub_dir = path.join(__dirname, site.pub_dir),
     src_dir = path.join(__dirname, site.src_dir);


 gulp.task('default', function() {
     // place code for your default task here
 });

 gulp.task('watch', function() {
     gulp.watch(src_dir + '/js/*.js', ['js']);
     gulp.watch(src_dir + '/js/lib/*.js', ['lib']);
     gulp.watch(src_dir + '/scss/*.scss', ['css']);
     gulp.watch(src_dir + '/scss/**/*.scss', ['css']);
 });

 /*--------------------------------------*/
 /*  CSS processing    */
 /*--------------------------------------*/
 gulp.task('css', function() {
     return gulp.src(src_dir + '/scss/app.scss')
         .pipe(sass().on('error', gutil.log))
         .pipe(gulpif(site.inline_images, base64({
             baseDir: 'public',
             extensions: ['svg', 'png'],
             debug: true
         })))
         .pipe(gulpif(site.minify_css, minifycss()))
         .pipe(rename({
             suffix: '.min'
         }))
         .pipe(gulp.dest(pub_dir + '/css'));
 });

 /*--------------------------------------*/
 /*  Javascript processing    */
 /*--------------------------------------*/
 gulp.task('js', function() {

     var jsPrepend = 'var console={log:function(){},error:function(){}};(function(){',
         jsAppend = '})();';

     return gulp.src(src_dir + '/js/*.js')
         .pipe(concat('app.js'))
         .pipe(jsValidate().on('error', gutil.log))
         .pipe(gulpif(site.uglify_js, uglify()))
         //wrap into anonymous
         .pipe(gulpif(site.scope_js, insert.wrap(jsPrepend, jsAppend)))
         .pipe(rename({
             suffix: '.min'
         }))
         .pipe(gulp.dest(pub_dir + '/js'));
 });

 /*--------------------------------------*/
/*  Pack lib to one file    */
/*--------------------------------------*/
gulp.task('lib', function() {
    return gulp.src(src_dir + '/js/lib/*.js')
        .pipe(concat('_lib.js')) //add slash to name so its included as first
        .pipe(gulp.dest(src_dir + '/js'));

});
