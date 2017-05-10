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
    cache        = require('gulp-cache');


gulp.task('sass', function(){
    return gulp.src('app/sass/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({}
        ))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task("build:icons", function() {
   return gulp.src(["assets/icons/*.svg"])//path to svg icons
     .pipe(iconfont({
       fontName: "myicons",
       formats: ["ttf", "eot", "woff", "svg"],
       centerHorizontally: true,
       fixedWidth: true,
       normalize: true
     }))
     .on("glyphs", function (glyphs) {

       gulp.src("assets/icons/util/*.scss") // Template for scss files
           .pipe(consolidate("lodash", {
               glyphs: glyphs,
               fontName: "myicons",
               fontPath: "../fonts/"
           }))
           .pipe(gulp.dest("app/sass"));//generated scss files with classes
     })
     .pipe(gulp.dest("app/fonts/"));//icon font destination
});

// Start browserSync
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
        port: 3000,
        open: true,
        notify: true,
        browser: "chrome.exe"
    })
})

// Minify css for build
gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/*/**') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

// Watching changes
gulp.task('default', ['watch']);
gulp.task('watch', ['browserSync', 'sass'], function(){
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/**/*.html').on('change', browser.reload);
})

// Clear Gulp cache
gulp.task('clear', function () {
    return cache.clearAll();
})

// Clear dist before build
gulp.task('clean', function() {
    return del.sync('dist');
});

// Optimize images
gulp.task('img', function() {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({ // Сжимаем их с наилучшими настройками
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

// Build to dist
gulp.task('build', ['img', 'sass'], function() {

    var buildCss = gulp.src([ // Переносим CSS стили в продакшен
        'app/css/base.css',
        'app/css/libs.min.css'
        ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));

});
