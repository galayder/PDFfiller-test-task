var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    postcss      = require('gulp-postcss'),
    browserSync  = require('browser-sync'),
    cssnano      = require('gulp-cssnano'),
    autoprefixer = require('autoprefixer'),
    sourcemaps   = require('gulp-sourcemaps'),
    iconfont     = require("gulp-iconfont"),
    consolidate  = require("gulp-consolidate"),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    pug          = require('gulp-pug');


gulp.task('sass', function(){
    return gulp.src('src/themes/sass/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({}
        ))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('src/themes/css'))
        .pipe(browserSync.reload({
        stream: true
    }))
});

// Compile pug to html
gulp.task('pug', function() {
    return gulp.src('src/templates/**/*.pug')
        .pipe(pug({
          pretty: true
        }))
        .pipe(gulp.dest('src'));
});

// Build icon font
gulp.task("build:icons", function() {
   return gulp.src(["src/assets/font-icons/*.svg"])//path to svg icons
     .pipe(iconfont({
       fontName: "myicons",
       formats: ["ttf", "eot", "woff", "svg"],
       centerHorizontally: true,
       fixedWidth: true,
       normalize: true
     }))
     .on("glyphs", function (glyphs) {

       gulp.src("src/assets/font-icons/util/*.scss") // Template for scss files
           .pipe(consolidate("lodash", {
               glyphs: glyphs,
               fontName: "myicons",
               fontPath: "../fonts/"
           }))
           .pipe(gulp.dest("src/themes/sass"));//generated scss files with classes
     })
     .pipe(gulp.dest("src/assets/fonts/"));//icon font destination
});

// Start browserSync
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        },
        port: 3000,
        open: true,
        notify: true,
        browser: "chrome.exe"
    })
})

// Minify css for build
gulp.task('css-libs', ['sass'], function() {
    return gulp.src('src/themes/css/*/**') // Choose style to minify
        .pipe(cssnano()) // Minifying
        .pipe(rename({suffix: '.min'})) // Adding suffix .min
        .pipe(gulp.dest('public/css')); // Load to destination
});

// Watching changes
gulp.task('default', ['watch']);
gulp.task('watch', ['browserSync', 'sass', 'pug'], function(){
    gulp.watch('src/templates/**/*.pug', ['pug']);
    gulp.watch('src/themes/sass/**/*.sass', ['sass']);
    gulp.watch('src/**/*.html').on('change', browserSync.reload);
})

// Clear Gulp cache
gulp.task('clear', function () {
    return cache.clearAll();
})

// Clear dist before build
gulp.task('clean', function() {
    return del.sync('public');
});

// Optimize images
gulp.task('img', function() {
    return gulp.src('src/assets/img/**/*') // Берем все изображения
        .pipe(cache(imagemin({ // Сжимаем их с наилучшими настройками
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('public/img')); // Выгружаем на продакшен
});

// Build to dist
gulp.task('build', ['img', 'sass'], function() {

    var buildCss = gulp.src([ // Put css to production
        'src/themes/css/*.css',
        'src/themes/libs.min.css'
        ])
    .pipe(gulp.dest('public/css'))

    var buildFonts = gulp.src('src/assets/fonts/**/*') // Put fonts to production
    .pipe(gulp.dest('public/fonts'))

    var buildJs = gulp.src('src/scripts/**/*') // Put scripts to production
    .pipe(gulp.dest('public/scripts'))

    var buildHtml = gulp.src('src/*.html') // Put html to production
    .pipe(gulp.dest('public'));

});
