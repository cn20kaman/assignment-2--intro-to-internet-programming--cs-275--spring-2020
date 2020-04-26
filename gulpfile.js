const { src, watch, dest, series } = require(`gulp`);
const browserSync = require(`browser-sync`);
const reload = browserSync.reload;
const htmlValidator = require(`gulp-html`);
const cssLinter = require(`gulp-stylelint`);
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

    watch([`html/**/*.html`,`css/*.css`,`js/*.js`]).on(`change`, reload);
};
exports.validateHTML = validateHTML;
exports.lintCSS = lintCSS;
exports.default = serve;