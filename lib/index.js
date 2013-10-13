"use strict";

var isGlobal = require ("is-global");
var path = require ("path");

if (!isGlobal ()){
	var rel = path.relative (process.cwd (),
			path.dirname (process.mainModule.filename));
	
	if (rel){
		var script = path.basename (process.mainModule.filename);
		
		console.error ("The process has been started this way:\n\n" +
				"  $ node " + rel + path.sep + script + "\n\n" +
				"Better alternatives:\n\n" +
				"  $ cd " + rel + " && node " + script + "\n" +
				"  $ node " + process.mainModule.filename);
		
		process.exit (1);
	}
}

//Uncache the module, this is not needed anymore
delete require.cache[__dirname + path.sep + "index.js"];