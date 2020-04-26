const { src, watch, dest, series } = require(`gulp`);
const browserSync = require(`browser-sync`);
const reload = browserSync.reload;
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
exports.default = serve;