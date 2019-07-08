'use strict';

module.exports = function (gulp, params, plugins, methods) {

    var styles = {

        init: function() {
            if (methods) {
                for (var i = 0; i < methods.length; i++) {
                    this[methods[i]]();
                }
            }
            if (!methods) {
                this.stylesCss();
            }
        },

        stylesCss: function() {
            gulp.src([
                    params.path.src.styles + params.project.info.slug + '.styl',
                    params.path.src.styles_components + '/**/*.styl'
                ])
                .pipe(plugins.newer({
                    dest: params.path.src.styles,
                    ext: "/**/*.styl"
                }))
                .pipe(plugins.stylus({
                    use: [plugins.nib()]
                }))
                .pipe(plugins.autoprefixer({
                    browsers: ['last 2 versions'],
                    cascade: false
                }))
                .pipe(plugins.concat(params.project.info.slug + '.css'))
                .pipe(plugins.csscomb())
                .pipe(gulp.dest(params.path.dist.styles))
                .pipe(plugins.browserSync.stream());

            gulp.src(params.path.src.styles + params.project.info.slug + '.responsive.styl')
                .pipe(plugins.newer({
                    dest: params.path.src.styles,
                    ext: "/**/*.styl"
                }))
                .pipe(plugins.stylus({
                    use: [plugins.nib()]
                }))
                .pipe(plugins.autoprefixer({
                    browsers: ['last 2 versions'],
                    cascade: false
                }))
                .pipe(plugins.csscomb())
                .pipe(gulp.dest(params.path.dist.styles))
                .pipe(plugins.browserSync.stream());

            gulp.src(params.path.src.styles_addons + "*.css")
                .pipe(plugins.newer({
                    dest: params.path.dist.styles_addons,
                    ext: ".css"
                }))
                .pipe(plugins.autoprefixer({
                    browsers: ['last 2 versions'],
                    cascade: false
                }))
                .pipe(gulp.dest(params.path.dist.styles_addons))
                .pipe(plugins.browserSync.stream());
        }

    }

    return styles.init();
};
