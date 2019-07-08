'use strict';

// gulp
const gulp = require('gulp');

// params (path...)
const params ={};

// plugins
const plugins = {
    'fs': require("fs"),
    'nib': require('nib'),
    'jade': require("gulp-jade"),
    'watch': require("gulp-watch"),
    'newer': require('gulp-newer'),
    'clean': require('gulp-clean'),
    'svgmin': require("gulp-svgmin"),
    'concat': require('gulp-concat'),
    'stylus': require('gulp-stylus'),
    'rename': require('gulp-rename'),
    'csscomb': require('gulp-csscomb'),
    'plugins': require('gulp-load-plugins')(),
    'htmlmin': require("gulp-htmlmin"),
    'ttf2woff': require("gulp-ttf2woff"),
    'requireDir': require('require-dir'),
    'browserSync': require('browser-sync').create(),
    'autoprefixer': require('gulp-autoprefixer'),
    // 'interactive': require('gulp-interactive'),
    'inquirer': require('inquirer'),
    'jsonfile': require('jsonfile'),
    'babel': require('gulp-babel'),
}

// path for gulp work
params.path = require('./gulp/path.json');

try {
    params.project = require('./project.json');
}
catch(e){}

// file where store question about new project
var question = require('./gulp/question.json');

// join tasks
var tasks = plugins.requireDir(params.path.gulp.tasks);

// create file about project
gulp.task('project:information', gulp.series(function(done) {
    plugins.inquirer.prompt(question.qustions).then(function(answers) {
        params.answers = answers;
        tasks.project(gulp, params, plugins, ['createInfoAboutProject']);
        done()
    });
}));

// create index page
gulp.task('project:index', function(done) {
	done(tasks.project(gulp, params, plugins, ['createIndexPage']));
});

// create start structure
gulp.task('project', function(done) {
	done(tasks.project(gulp, params, plugins));
});

// assets ex: fonts, img ...
gulp.task('assets', function(done) {
	done(tasks.assets(gulp, params, plugins));
});

// styles
gulp.task('styles', function(done) {
    done(tasks.styles(gulp, params, plugins));
});

// scripts
gulp.task('scripts', function(done) {
    done(tasks.scripts(gulp, params, plugins));
});

// server
gulp.task('server', function(done) {
    done(tasks.server(gulp, params, plugins));
});

// pages
gulp.task('pages', function(done) {
    done(tasks.pages(gulp, params, plugins));
});

// pages
gulp.task('run', gulp.series('project:index', 'assets', 'styles', 'scripts', 'pages'));

// start gulp
gulp.task("default",  gulp.series('run', 'server', function() {

    // watch main index file
    plugins.watch(params.path.gulp.index + '**', gulp.series('project:index')).on('change', plugins.browserSync.reload);

    // watch assets
    plugins.watch(params.path.src.assets + '**', gulp.series('assets')).on('change', plugins.browserSync.reload);

    // watch styles
    plugins.watch(params.path.src.styles + '**', gulp.series('styles')).on('change', plugins.browserSync.reload);

    // watch scripts
    plugins.watch(params.path.src.js + '**', gulp.series('scripts')).on('change', plugins.browserSync.reload);

    // watch pages
    plugins.watch(params.path.src.pages + '**', gulp.series('pages')).on('change', plugins.browserSync.reload);

}));
