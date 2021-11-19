//
// Variables ==============================
//

//
// Dependencies ===========================
//
const postCssDiscardComments = require('postcss-discard-comments');
const purgeCss = require('@fullhuman/postcss-purgecss');
const postCssImport = require('postcss-import');
const postCssNested = require('postcss-nested');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const browserify = require('browserify');
const npmdist = require('gulp-npm-dist');
const postcss = require('gulp-postcss');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const cssnano = require('cssnano');
const sass = require('gulp-sass');
const gulp = require('gulp');
const del = require('del');

//
// Paths ==================================
//

const paths = {
    base: {
        base: {
            dir: './'
        },
        node: {
            dir: './node_modules'
        },
        packageLock: {
            files: './package-lock.json'
        }
    },
    src: {
        base: {
            dir: './src',
            files: '.src/**/*'
        },
        js: {
            main: 'main.js',
            theme: 'theme.js',
            dir: './src/js',
            files: './src/js/**/*',
        },
        scss: {
            dir: './src/scss',
            files: './src/scss/**/*',
            main: './src/scss/theme.scss'
        },
        img: {
            dir: './src/img',
            files: './src/img/**/*'
        },
        fonts: {
            dir: './src/fonts',
            files: './src/fonts/**/*'
        },
        tailwind: {
            dir: './src/tailwind',
            files: './src/tailwind/**/*',
            main: './src/tailwind/main.css'
        }
    },
    dist: {
        base: {
            dir: './dist',
            files: './dist/**/*'
        },
        libs: {
            dir: './dist/libs',
            files: './dist/libs/**/*'
        },
        js: {
            dir: './dist/js',
            files: './dist/js/**/*',
        },
        css: {
            dir: './dist/css',
            files: './dist/css/**/*'
        },
        img: {
            dir: './dist/img',
            files: './dist/img/**/*'
        },
        fonts: {
            dir: './dist/fonts',
            files: './dist/fonts/**/*'
        }
    }
};

//
// Tasks ==================================
//

function css() {
    return gulp
        .src(paths.src.scss.main)
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: [paths.base.node.dir]}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dist.css.dir))
}

function cssBuild() {
    const processors = [
        purgeCss({
            content: ['../apps/users/templates/**/*.html']
        }),
        postCssDiscardComments({removeAll: true}),
        autoprefixer(),
        cssnano({presets: 'default'})
    ];
    return gulp
        .src(paths.src.scss.main)
        .pipe(sass({includePaths: [paths.base.node.dir]}).on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest(paths.dist.css.dir))
}

function cssTailwind() {
    const processors = [
        postCssImport(),
        postCssNested(),
        tailwindcss(),
        postCssDiscardComments({removeAll: true})
    ];
    return gulp
        .src(paths.src.tailwind.main)
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dist.css.dir));
}

function cssTailwindBuild() {
    const processors = [
        postCssImport(),
        postCssNested(),
        tailwindcss(),
        purgeCss({
            content: ['../apps/content/templates/content/**/*.html'],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
        }),
        postCssDiscardComments({removeAll: true}),
        autoprefixer(),
        cssnano({presets: 'default'})
    ];
    return gulp
        .src(paths.src.tailwind.main)
        .pipe(postcss(processors))
        .pipe(gulp.dest(paths.dist.css.dir))
}

function cssClean() {
    return del(paths.dist.css.files)
}

function js() {
    browserify({entries: paths.src.js.dir + '/' + paths.src.js.main, debug: true})
        .transform("babelify", {presets: ["@babel/env"]})
        .bundle()
        .pipe(source(paths.src.js.main))
        .pipe(gulp.dest(paths.dist.js.dir));
    return browserify({entries: paths.src.js.dir + '/' + paths.src.js.theme, debug: true})
        .transform("babelify", {presets: ["@babel/env"]})
        .bundle()
        .pipe(source(paths.src.js.theme))
        .pipe(gulp.dest(paths.dist.js.dir));
}

function jsBuild() {
    browserify({entries: paths.src.js.dir + '/' + paths.src.js.main, debug: true})
        .transform("babelify", {presets: ["@babel/env"]})
        .bundle()
        .pipe(source(paths.src.js.main))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist.js.dir));
    return browserify({entries: paths.src.js.dir + '/' + paths.src.js.theme, debug: true})
        .transform("babelify", {presets: ["@babel/env"]})
        .bundle()
        .pipe(source(paths.src.js.theme))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist.js.dir));
}

function jsClean() {
    return del(paths.dist.js.files)
}

function libs() {
    return gulp
        .src(npmdist(
            {
                excludes: [
                    'sandbox/**/*'
                ]
            }
        ), {base: paths.base.node.dir})
        .pipe(gulp.dest(paths.dist.libs.dir))
}

function libsClean() {
    return del(paths.dist.libs.files)
}

function img() {
    return gulp
        .src(paths.src.img.files)
        .pipe(gulp.dest(paths.dist.img.dir))
}

function imgClean() {
    return del(paths.dist.img.files)
}

function fonts() {
    return gulp
        .src(paths.src.fonts.files)
        .pipe(gulp.dest(paths.dist.fonts.dir))
}

function fontsClean() {
    return del(paths.dist.fonts.files)
}

//
// Exports ================================
//

exports.default = function () {
    gulp.parallel(css, js, cssTailwind, libs, img, fonts)();
    gulp.watch(paths.src.scss.files, css);
    gulp.watch(paths.src.js.files, js);
    gulp.watch(paths.src.tailwind.files, cssTailwind);
};

exports.build = gulp.series(
    gulp.parallel(cssClean, jsClean, imgClean, fontsClean, libsClean),
    gulp.parallel(img, fonts, libs, cssBuild, cssTailwindBuild, jsBuild)
);

exports.clean = gulp.parallel(cssClean, jsClean, imgClean, fontsClean, libsClean);

exports.dev = gulp.parallel(libs, img, fonts, css, js);

exports.js = gulp.series(js);
