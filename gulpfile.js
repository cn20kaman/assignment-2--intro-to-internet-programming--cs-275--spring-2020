const { src, watch, dest, series } = require(`gulp`);
const browserSync = require(`browser-sync`);
const reload = browserSync.reload;
const htmlValidator = require(`gulp-html`);
const cssLinter = require(`gulp-stylelint`);
const jsLinter = require(`gulp-eslint`);
const babel = require(`gulp-babel`);
const htmlCompressor = require(`gulp-htmlmin`);
const jsCompressor = require(`gulp-uglify`);
const cssCompressor = require(`gulp-uglifycss`);


let validateHTML = () => {
    return src(`html/*.html`)
        .pipe(htmlValidator());
};

let lintCSS = () => {
    return src(`css/*.css`)
        .pipe(cssLinter({
            failAfterError: true,
            reporters: [
                {formatter: `verbose`, console: true}
            ]
        }));
};

let lintJS = () => {
    return src(`js/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`, process.stderr));
};
//Prod Only
let compressHTML = () => {
    return src(`html/*.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};
//Prod Only
let compressJS = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js/`));
};
//Prod Only
let compressCSS = () => {
    return src(`css/*.css`)
        .pipe(cssCompressor())
        .pipe(dest(`prod/css/`));
};

let copyCSSForDev = () => {
    return src(`css/*.css`)
        .pipe(dest(`temp/css/`));
};

let transpileJSForDev = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/js/`));
};
//Prod Only
let transpileJSForProd = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js/`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 0, // A delay is sometimes helpful when reloading at the
        server: {       // end of a series of tasks.
            baseDir: [
                `html`,
                `temp`
            ]
        }
    });

    watch(`js/*.js`, series(lintJS, transpileJSForDev)).on(`change`, reload);
    watch(`css/*.css`, series(lintCSS, copyCSSForDev)).on(`change`, reload);
    watch(`html/**/*.html`, series(validateHTML)).on(`change`, reload);
};



exports.validateHTML = validateHTML;
exports.lintCSS = lintCSS;
exports.lintJS = lintJS;
exports.compressHTML = compressHTML;
exports.compressJS = compressJS;
exports.compressCSS = compressCSS;
exports.copyCSSForDev = copyCSSForDev;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;
exports.dev=series(validateHTML, lintCSS, lintJS, copyCSSForDev,
    transpileJSForDev, serve);
exports.build=series(compressHTML, compressCSS, compressJS, transpileJSForProd);
exports.default = serve;
