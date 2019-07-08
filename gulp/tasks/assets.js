'use strict';

module.exports = function (gulp, params, plugins, methods) {

    var assets = {

        init: function() {
            if (methods) {
                for (var i = 0; i < methods.length; i++) {
                    this[methods[i]]();
                }
            }
            if (!methods) {
                this.assetsFonts();
                this.assetsImg();
                this.assetsSvg();
                this.assetsIcons();
                this.assetsMedia();
            }
        },

        assetsFonts: function() {
            return  gulp.src(params.path.src.fonts + "*.ttf")
                        .pipe(plugins.ttf2woff())
                        .pipe(gulp.dest(params.path.dist.fonts));
        },

        assetsImg: function() {
            return  gulp.src([
                        params.path.src.img + "*",
                        params.path.src.img + "**"
                    ])
                    .pipe(gulp.dest(params.path.dist.img));
        },

        assetsIcons: function() {
            return  gulp.src([
                        params.path.src.icon + "*",
                        params.path.src.icon + "**"
                    ])
                    .pipe(gulp.dest(params.path.dist.icon));
        },

        assetsMedia: function() {
            return  gulp.src([
                        params.path.src.media + "*",
                        params.path.src.media + "**"
                    ])
                    .pipe(gulp.dest(params.path.dist.media));
        },

        assetsSvg: function() {
            return  gulp.src([params.path.src.svg + "*.svg", params.path.src.svg + "**/*.svg"])
                    .pipe(plugins.newer({
                        dest: params.path.src.svg,
                        ext: "/**/*.svg"
                    }))
                    .pipe(plugins.svgmin({
                        plugins: [
            				{
            					removeDoctype: true,
            				}, {
            					removeComments: true
            				}, {
            					removeTitle: true
            				}, {
            					convertStyleToAttrs: true
            				}, {
            					removeStyleElements: true
            				}, {
            					cleanupIDs: true
            				}, {
            					removeDesc: true
            				}, {
            					removeMetadata: true
            				}, {
            					removeStyleElement: true
            				}, {
            					removeViewBox: true
            				}
            			]
                    }))
                    .pipe(gulp.dest(params.path.dist.svg));
        }

    }

    return assets.init();
};
