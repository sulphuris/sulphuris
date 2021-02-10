'use strict';

const argv                 = require('yargs').argv;
const gulp                 = require('gulp');
const gulpif               = require('gulp-if');
const cache                = require('gulp-cached');
const connect              = require('gulp-connect');
const autoprefixer         = require('gulp-autoprefixer');
const sass                 = require('gulp-sass');
sass.compiler              = require('node-sass');
const stripCssComments  = require('gulp-strip-css-comments');
const stylelint            = require('gulp-stylelint');
const cleanCSS             = require('gulp-clean-css');
const sourcemaps           = require('gulp-sourcemaps');
const rename               = require("gulp-rename");
const rollup               = require('rollup');
const rollup_typescript    = require('@rollup/plugin-typescript');
const rollup_commonjs      = require('@rollup/plugin-commonjs');
const rollup_resolve       = require('@rollup/plugin-node-resolve');
const rollup_terser        = require('rollup-plugin-terser');
const jshint               = require('gulp-jshint');

// ### Rollup
// `gulp rollup`
gulp.task('rollup', async function () {
  const bundle = await rollup.rollup({
    input: './src/js/main.ts',
    context: 'window',
    plugins: [
      rollup_resolve.nodeResolve({
        main: false,
        mainFields: ['browser', 'module'],
        extensions: ['.js', '.ts'],
        customResolveoptsions: {
          package: {},
          moduleDirectory: ['node_modules']
        }
      }),
      rollup_typescript(),
      rollup_commonjs({
        include: 'node_modules/**'
      }),
      argv.production && rollup_terser.terser()
    ]
  });

  let opts = {
    file: './dist/js/sulphuris-bundle.js',
    format: 'iife',
    sourcemap: false
  };

  if (argv.production) {
    opts.file = './dist/js/sulphuris-bundle.min.js';
  }

  if (argv.sourcemap) {
    opts.sourcemap = true;
  }

  await bundle.write(opts).then(() => {
    gulp.series('reload');
  });
});

// ### SASS
// `gulp sass`
gulp.task('sass', function () {
  let opts = {
    includePaths: ['node_modules']
  };

/*
  if (argv.production) {
    opts.outputStyle = 'compressed';
    // unfortunately it appears that node-sass 's opts outFile and sourceMap don't work in gulp-sass context :(
    // it's such a shame to have to use minify-css and gulp-rename
  }
*/

  return gulp.src(['./src/scss/main.scss'])
    .pipe(sass(opts).on('error', sass.logError))
    .pipe(autoprefixer(
      [
        'last 2 version',
        'safari 5',
        'ie 11',
        'ff 17',
        'opera 12.1',
        'ios 6',
        'android 4'
      ]
    ))
    .pipe(rename({ basename: 'sulphuris' }))
    .pipe(gulpif(argv.sourcemap, sourcemaps.init()))
    .pipe(gulpif(argv.production, cleanCSS()))
    .pipe(gulpif(argv.sourcemap, sourcemaps.write()))
    .pipe(gulpif(argv.production, rename({ suffix: '.min' })))
    .pipe(stripCssComments())
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
});

// ### JSHint
// `gulp jshint`
gulp.task('lint-js', function() {
  return gulp.src(['./src/js/**/*.js'])
    .pipe(cache('lint-js'))
    .pipe(jshint({
      "esversion": 10
    }))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('lint-css', function lintCssTask() {
  return gulp.src('./src/**/*.scss')
    .pipe(cache('lint-css'))
    .pipe(stylelint({
      failAfterError: false,
      reporters: [
        { formatter: 'string', console: true }
      ]
    }));
});

gulp.task('reload', function () {
  return gulp.src([
    './**/*.html',
    './**/*.png',
    './**/*.jpg',
    './**/*.jpeg',
    './**/*.svg'])
    .pipe(connect.reload());
});

gulp.task('server', async function () {
  connect.server({
    port: 4040,
    livereload: true
  });
});

gulp.task('watch', async function () {
  gulp.watch(['./src/**/*.scss'], gulp.series('lint-css', 'sass'));
  gulp.watch(['./src/**/*.ts', './src/**/*.js'], gulp.series('lint-js', 'rollup'));
  gulp.watch([
    './**/*.html',
    './**/*.png',
    './**/*.jpg',
    './**/*.jpeg',
    './**/*.svg'
  ], gulp.series('reload'));
});

// ### Build
// `gulp build`
gulp.task('build', gulp.series('rollup','sass'));

// ### Serve
// `gulp serve`
gulp.task('serve', gulp.series('lint-js', 'rollup', 'lint-css', 'sass', 'server', 'watch'));

gulp.task('default', gulp.series('serve'));
