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
                    params.path.src.pages + '**/*.jade',
                    '!' + params.path.src.pages_layouts + '**'
                ])
                .pipe(plugins.data(function(file) {
        			return {
        				pageName: plugins.path.basename(file.path).replace(".jade", ""),
                        params: params
        			};
        		}))
        		.pipe(plugins.jade({
        			pretty: '\t'
        		}))
        		.pipe(gulp.dest(params.path.dist.pages))
                .pipe(plugins.browserSync.stream());
        }

    }

    return pages.init();

};
