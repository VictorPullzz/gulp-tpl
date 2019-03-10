'use strict';

module.exports = function (gulp, params, plugins, methods) {

    var server = {

        init: function() {
            if (methods) {
                for (var i = 0; i < methods.length; i++) {
                    this[methods[i]]();
                }
            }
            if (!methods) {
                this.browserSyncServer();
            }
        },

        // web server
        browserSyncServer: function() {
            plugins.browserSync.init({
                server: {
                    baseDir: [
                        params.path.gulp.index,
                        params.path.src.pages,
                        params.path.src.base
                    ],
                },
                port: 3030,
                open: true,
                browser: params.path.gulp.browser,
            });
        }
    }

    return server.init();
};
