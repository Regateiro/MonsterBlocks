/* eslint-disable no-unused-vars */
/* global require exports*/
const Gulp = require("gulp");
const zip = require("gulp-zip");

function createRelease(cb) {
	return Gulp.src([
		"module.json",
		"monsterblock.js",
		"monsterblock.css",
		"actor-sheet.html",
		"scripts/**",
		"templates/**",
		"lang/*"
	], { base: ".", allowEmpty: true })
		.pipe(zip("monsterblock.zip"))
		.pipe(Gulp.dest("./"));
}

exports.zip = createRelease;
exports.default = createRelease;