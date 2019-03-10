'use strict';

module.exports = function (gulp, params, plugins, methods) {

    var scripts = {

        init: function() {
            if (methods) {
                for (var i = 0; i < methods.length; i++) {
                    this[methods[i]]();
                }
            }
            if (!methods) {
                this.scriptsJs();
            }
        },

        scriptsJs: function() {
            gulp.src(params.path.dist.js + "**/*.js")
                .pipe(plugins.newer({
                    dest: params.path.dist.js,
                    ext: "/**/*.js"
                }))
                .pipe(gulp.dest(params.path.src.js))
                .pipe(plugins.browserSync.stream());
        }

    }

    return scripts.init();
};
