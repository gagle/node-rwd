"use strict";

var assert = require ("assert");
var fs = require ("fs");

var file = "same-cwd.js";

//cwd == rwd
assert.ok (fs.existsSync (file));
require ("../lib");
assert.ok (fs.existsSync (file));