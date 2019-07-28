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
            gulp.src(params.path.src.js + "/" + params.project.info.slug + ".js")
                .pipe(plugins.babel({
                    presets: ['@babel/env']
                }))
                .pipe(plugins.newer({
                    dest: params.path.src.js,
                    ext: "/**/*.js"
                }))
                .pipe(gulp.dest(params.path.dist.js))
                .pipe(plugins.browserSync.stream());

            gulp.src(params.path.src.js + "/plugins/*.js")
                .pipe(gulp.dest(params.path.dist.js_plugins))
                .pipe(plugins.browserSync.stream());
        }

    }

    return scripts.init();
};
