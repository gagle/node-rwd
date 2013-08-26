"use strict";

var isGlobal = require ("is-global");
var path = require ("path");
var CWDError = require ("./error");

var rel = null;

if (!isGlobal ()){
	rel = path.relative (process.cwd (),
			path.dirname (process.mainModule.filename));
}

module.exports = function (o){
	if (rel){
		if (o && o.error){
			var script = path.basename (process.mainModule.filename);
			throw new CWDError ("If the main file is executed with a relative " +
					"path, it should be started from the same directory.\n\n" +
					"The process has been started this way:\n\n" +
					"  node " + rel + path.sep + script + "\n\n" +
					"Better alternatives:\n\n" +
					"  cd " + rel + " && node " + script + "\n" +
					"  node " + process.mainModule.filename + "\n");
		}else{
			process.chdir (rel);
		}
	}
	
	return rel;
}