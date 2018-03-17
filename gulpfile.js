var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

var reload = browserSync.reload;

var paths = {
    html: {
        in: ['src/**/*.html'],
        out: 'dest/'
    },
    js: {
        in: 'src/js/**/*.js',
        out: 'dest/js/'
    }
};

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});

gulp.task('scripts', function () {
    return gulp.src(paths.js.in)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.js.out))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.out))
        .pipe(reload({stream: true}));
});

gulp.task('html', function () {
    return gulp.src(paths.html.in)
        .pipe(gulp.dest(paths.html.out))
        .pipe(reload({stream: true}));
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(paths.html.in, ['html']);
    gulp.watch(paths.js.in, ['scripts']);
});
gulp.task('default', ['scripts', 'html']);
