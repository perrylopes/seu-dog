const { series, src, dest, watch } = require("gulp");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const util = require("gulp-util");
// const uglifycss = require("gulp-uglifycss");
const scssCss = require("gulp-sass");
const concat = require("gulp-concat");

function html() {
  return src("./src/*.html").pipe(dest("./public"));
}

function scss() {
  return (
    src("./src/scss/*.scss")
      .pipe(scssCss())
      // .pipe(uglifycss({ uglifyComments: true }))
      .pipe(concat("enext-style.css"))
      .pipe(dest("./public/css"))
  );
}

function js() {
  return (
    src("./src/js/index.js")
      .pipe(concat("enext-script.js"))
      //.pipe(uglify())
      .pipe(dest("./public/js"))
  );
}

function img() {
  return src("./src/img/**/*").pipe(imagemin()).pipe(dest("./public/img"));
}

function observe() {
  watch("./src/scss/*.scss", scss);
  watch("./src/*.html", html);
  watch("./src/js/index.js", js);
}

if (util.env.product) {
  exports.default = series(scss, js, img);
} else {
  exports.default = series(scss, js, img, observe);
}
