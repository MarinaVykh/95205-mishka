"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgmin = require("gulp-svgmin");
var jsmin = require("gulp-uglify");
var run = require("run-sequence");
var del = require("del");


gulp.task("serve", function() {
  server.init({
    server: "build",
    notify: false,
    open: true,
    cors: true,
    ui: false

  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html").on("change", server.reload);

});


gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]}),

      mqpacker({
        sort: true
      })

    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream())
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));

});


gulp.task("images", function () {
  return gulp.src("build/img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      })
    ]))
    .pipe(gulp.dest("build/img"));

});


gulp.task("svgimages", function () {
  return gulp.src("build/img/*.svg")
    .pipe(svgmin())
    .pipe(gulp.dest("build/img"));

});


gulp.task("jsmin", function () {
  gulp.src("js/javascript.js")
    .pipe(jsmin())
    .pipe(rename("javascript.min.js"))
    .pipe(gulp.dest("build/js"));
  gulp.src("js/map.js")
    .pipe(jsmin())
    .pipe(rename("map.min.js"))
    .pipe(gulp.dest("build/js"));

});


gulp.task("build", function (fn) {
  run("clean", "copy", "style", "images", "svgimages", "jsmin", fn)

});


gulp.task("copy", function () {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    "js/**",
    "*.html"
  ], {
    base: "."
  })
    .pipe(gulp.dest("build"));

});


gulp.task("clean", function () {
  return del("build");

});
