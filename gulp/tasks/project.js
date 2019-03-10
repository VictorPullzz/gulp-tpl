'use strict';

module.exports = function (gulp, params, plugins, methods) {

    var project = {

        init: function() {
            if (methods) {
                for (var i = 0; i < methods.length; i++) {
                    this[methods[i]]();
                }
            }
            if (!methods) {
                this.createDevelopStructure();
                this.createDevelopStyle();
                this.createIndexPage();
                this.createLayoutsPage();
            }
        },

        // create structure project
        createDevelopStructure: function() {
            for (let keyDist in params.path.dist) {
                if(!plugins.fs.existsSync(params.path.dist[keyDist])) {
                    plugins.fs.mkdirSync(params.path.dist[keyDist]);
                }
            }
        },

        // create starting styles files
        createDevelopStyle: function() {
        	var settingsCss = params.path.gulp.styles + 'setting.styl',
                templateCss = params.path.gulp.styles + 'template.styl',
                templateCssResponsive = params.path.gulp.styles + 'template.responsive.styl',
                fileCss = params.path.dist.styles + params.project.info.slug + '.styl',
                fileCssResponsive = params.path.dist.styles + params.project.info.slug + '.responsive.styl';

            gulp.src(settingsCss)
                .pipe(gulp.dest(params.path.dist.styles_settings));

        	if(!plugins.fs.existsSync(fileCss)) {
        		plugins.fs.writeFile(fileCss, plugins.fs.readFileSync(templateCss, "utf8"), (err) => {
                    if (err) throw err;
                });
        	}
        	if(!plugins.fs.existsSync(fileCssResponsive)) {
        		plugins.fs.writeFile(fileCssResponsive, plugins.fs.readFileSync(templateCssResponsive, "utf8"), (err) => {
                    if (err) throw err;
                });
            }
        },

        // create index page
        createIndexPage: function() {
            gulp.src(params.path.gulp.index + "index.jade")
        		.pipe(plugins.jade({
        			locals: {
        				params: params,
        			},
        			pretty: false
        		}))
        		.pipe(plugins.htmlmin({
        			collapseWhitespace: true,
        			removeComments: true,
        			minifyJS: true,
        			minifyCSS: true
        		}))
        		.pipe(gulp.dest(params.path.src.base));
        },

        // create index page
        createLayoutsPage: function() {
            gulp.src(params.path.gulp.pages + "layouts.jade")
         		.pipe(plugins.rename('template.jade'))
        		.pipe(gulp.dest(params.path.dist.pages_layouts));
        }
    }

    return project.init();

};
