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
            }
        },

        assetsFonts: function() {
            return  gulp.src(params.path.dist.fonts + "*.ttf")
                        .pipe(plugins.ttf2woff())
                        .pipe(gulp.dest(params.path.src.fonts));
        },

        assetsImg: function() {
            return  gulp.src([
                        params.path.dist.img + "*",
                        params.path.dist.img + "**"
                    ])
                    .pipe(gulp.dest(params.path.src.img));
        },

        assetsSvg: function() {
            return  gulp.src([params.path.dist.svg + "*.svg", params.path.dist.svg + "**/*.svg"])
                    .pipe(plugins.newer({
                        dest: params.path.dist.svg,
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
            					removeAttrs: {
            						attrs: ["id", "class"]
            					}
            				}, {
            					removeStyleElement: true
            				}, {
            					removeViewBox: true
            				}
            			]
                    }))
                    .pipe(gulp.dest(params.path.src.svg));
        }

    }

    return assets.init();
};
