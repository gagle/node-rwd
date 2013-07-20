"use strict";

var isGlobal = require ("is-global");
var path = require ("path");

var rel = null;

if (!isGlobal ()){
	var rel = path.relative (process.cwd (),
			path.dirname (process.mainModule.filename));
	if (rel) process.chdir (rel);
}

module.exports = function (){
	return rel;
}