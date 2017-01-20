var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;
 
gulp.task('default', [], function () {
    console.log("Command:\n   serve - run live reload server");
});
 
gulp.task('serve', [], function () {
    browserSync({
        notify: false,
        server: {
            baseDir: '.'
        }
    });
 
    gulp.watch(['*.html'], reload);
    gulp.watch(['*.js'], reload);
});