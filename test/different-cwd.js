"use strict";

var assert = require ("assert");
var fs = require ("fs");

var file = "different-cwd.js";
process.chdir ("../..");

//cwd != rwd
/*
Simulates:
$ pwd
<rwd_project_dir>
$ node test/<file>
*/
assert.ok (!fs.existsSync (file));
require ("../lib")();
assert.ok (fs.existsSync (file));