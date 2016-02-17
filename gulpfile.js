var gulp = require('gulp');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var compass = require('gulp-compass');

var basePaths = {
    src: './',
    dest: './',
    bower: 'bower_components/'
};

var assets_path = {
    /*
     *    например, в корне сайта лежит папка views, и в ней все ресурсы, тогда путь будет такой
     *      styles_source: 'view/scss/',
     *      styles_destination: 'view/css/',
     *
     * */

    images_source: 'view/img/',

    scripts_source: 'view/javascript/',
    scripts_destination: 'view/js/',

    styles_source: 'view/scss/',
    styles_destination: 'view/css/',

    sprites: 'view/sprite/*',
    fonts: 'view/fonts'
};

var paths = {
    images: {
        src: basePaths.dest + assets_path.images_source
    },
    scripts: {
        src: basePaths.src + assets_path.scripts_source,
        dest: basePaths.dest + assets_path.scripts_destination
    },
    styles: {
        src: basePaths.src + assets_path.styles_source,
        dest: basePaths.dest + assets_path.styles_destination
    },
    sprite: {
        src: basePaths.src + assets_path.sprites
    }
};

var appFiles = {
    styles: [paths.styles.src + '**/*.scss'],
    scripts: [paths.scripts.src + '**/*.js']
};

var vendorFiles = {
    styles: '',
    scripts: ''
};

/*Если gulp запущен с ключом --prod - то и за стилями и за скриптами с сжатием, иначе - одни стили, в compact режиме*/
var sassStyle = 'compact';
var assets_target = [paths.styles.dest];

if (gutil.env.prod === true) {
    sassStyle = 'compressed';
    assets_target = [paths.styles.dest, paths.scripts.dest];
}

gulp.task('styles', function () {
    gulp.src(appFiles.styles)
        .pipe(compass({
            includePaths: [assets_path.styles_source],
            css: assets_path.styles_destination,
            sass: assets_path.styles_source,
            javascript: assets_path.scripts_destination,
            image: assets_path.images_source,
            font: assets_path.fonts,
            comments: 'false',
            style: sassStyle,
            //logging: 'false',
            //sourcemap: 'false',
            //time: 'false',
            //debug: 'false',
            //environment: 'development',
            //config_file: 'config.rb',
            require: ['susy']
        }))
        .on('error', function (error) {
            // Would like to catch the error here
            console.log(error);
            this.emit('end');
        })
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(livereload());

});

gulp.task('scripts', function () {
    gulp.src(appFiles.scripts)
        .pipe(concat('scripts.js'))
        .pipe(isProduction ? uglify() : gutil.noop())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();

    gulp.watch(appFiles.styles, ['styles']);
    gulp.watch(appFiles.scripts, ['scripts']);
    gulp.watch(assets_target, function (files) {
        livereload.changed(files)
    });
});
gulp.task('default', ['watch']);