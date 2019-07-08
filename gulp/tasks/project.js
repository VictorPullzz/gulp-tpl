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
                this.createDevelopScript();
                this.createIndexPage();
                this.createLayoutsPage();
                this.createStartPage();
            }
        },

        // create information about project
        createInfoAboutProject() {
            let json = {};

            for (var key in params.answers) {
                let parse = key.split('_');

                if (! json.hasOwnProperty(parse[0])) {
                    json[parse[0]] = {}
                }

                if (parse[0] !== 'pages') {
                    json[parse[0]][parse[1]] = params.answers[key];

                    if (parse[0] == 'info' && parse[1] == 'name') {
                        json[parse[0]]['slug'] = params.answers[key].toLowerCase()
                            .replace(/ /g,'_')
                            .replace(/[^\w-]+/g,'');
                    }
                } else {
                    var pages = [],
                        arPages = params.answers[key].replace(/[ ,]+/, ',').split(',');

                    for (var page = 0; page < arPages.length; page++) {
                        pages.push({
                            "name": arPages[page].replace(/[ ,]+/, '').replace(/^\w/, c => c.toUpperCase()),
                            "code": arPages[page].replace(/[ ,]+/, '').toLowerCase()
                        })
                    } ;

                    json[parse[0]] = pages;
                }
            }

            return plugins.jsonfile.writeFileSync(params.path.gulp.project_info, json, { spaces: 4 });
        },

        // create structure project
        createDevelopStructure() {
            for (let key in params.path.src) {
                if(!plugins.fs.existsSync(params.path.src[key])) {
                    plugins.fs.mkdirSync(params.path.src[key]);
                }
            }
        },

        // create starting styles files
        createDevelopStyle() {
        	var settingsCss = params.path.gulp.styles + 'setting.styl',
                templateCss = params.path.gulp.styles + 'template.styl',
                templateCssResponsive = params.path.gulp.styles + 'template.responsive.styl',
                fileCss = params.path.src.styles + params.project.info.slug + '.styl',
                fileCssResponsive = params.path.src.styles + params.project.info.slug + '.responsive.styl';

            gulp.src(settingsCss)
                .pipe(gulp.dest(params.path.src.styles_settings));

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

        // create starting styles files
        createDevelopScript() {
        	var fileJs = params.path.src.js + params.project.info.slug + '.js';

            if(!plugins.fs.existsSync(fileJs)) {
        		plugins.fs.writeFile(fileJs, '`Your project: ' + params.project.name + '`', (err) => {
                    if (err) throw err;
                });
            }
        },

        // create index page
        createIndexPage() {
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
        		.pipe(gulp.dest(params.path.dist.base));
        },

        // create holder page
        createLayoutsPage() {
            gulp.src(params.path.gulp.pages + "layouts.jade")
         		.pipe(plugins.rename('template.jade'))
        		.pipe(gulp.dest(params.path.src.pages_layouts));
        },

        // create starting page
        createStartPage() {
            plugins.jsonfile.readFile(params.path.gulp.project_info, function (err, data) {
                if (err) console.error(err)

                data.pages.forEach((page) => {
                    var p = params.path.src.pages + page.code + '.jade';
                    if(!plugins.fs.existsSync(p)) {
                		plugins.fs.writeFile(p, 'extends ./layouts/template \n\nblock content', (err) => {
                            if (err) throw err;
                        });
                    }
                });

            });
        }
    }

    return project.init();

};
