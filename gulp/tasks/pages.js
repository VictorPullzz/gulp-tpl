'use strict';

module.exports = function (gulp, params, plugins, methods) {

    var pages = {

        init: function() {
            if (methods) {
                for (var i = 0; i < methods.length; i++) {
                    this[methods[i]]();
                }
            }
            if (!methods) {
                this.pagesJade();
            }
        },

        pagesJade: function() {
            gulp.src([
                    params.path.dist.pages + '**/*.jade',
                    '!' + params.path.dist.pages_layouts + '**'
                ])
        		.pipe(plugins.jade({
        			locals: {
        				params: params,
        			},
        			pretty: '\t'
        		}))
        		.pipe(gulp.dest(params.path.src.pages))
                .pipe(plugins.browserSync.stream());
        }

    }

    return pages.init();

};
