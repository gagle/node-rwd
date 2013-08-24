rwd
===

_Node.js project_

#### Changes the cwd to the real working directory ####

Version: 0.1.0

_rwd_ means real working directory.  
Global modules don't need the `rwd` module.

Did you know why the people prefix `__dirname` before a path?

```javascript
var fs = require ("fs");
fs.existsSync (__dirname + "/file");
```

It's because the `process.cwd()` function returns the shell's current working directory instead of the directory where lives the main script of your application.

Look at this example:

```
$ pwd
/home/user1
$ mkdir dir
$ cat > dir/app.js
console.log (process.cwd ());
$ node dir/app.js
/home/user1
```

You probably expect the path `/home/user1/dir`. If you execute the main script with a relative path like the above example, very bad things could happen and nearly impossible to detect why your code is not working as expected.

The following example illustrates a very ingenuous script, but depending on how you execute it very dangerous things will happen:

```javascript
//app.js
var fs = require ("fs");
if (fs.existsSync ("settings.json")){
	doSomethingUseful ();
}else{
	//Warning!!
	saveToDatabaseDefaultSettings ();
}
```

```
# Warning!! "settings.json" doesn't exist in ".".
node app/app.js
```

In order to fix this issue simply require the `rwd` module and execute the returned function. I recommend to put the require in the very first line of your main script:

```javascript
//app.js
require ("rwd")();
```

#### Installation ####

```
npm install rwd
```

#### Functions ####

- [rwd([obj]) : String](#rwd)

---

<a name="rwd"></a>
___module_([obj]) : String__

The module returns a function that needs to be called in order the fix the cwd. If you pass an object with an `error` property set to true an error will be thrown when the cwd is not correct. Use this option if you don't like to change the cwd when the process is running. If no object is passed the cwd will be fixed automatically.

```javascript
//If the process is atarted with an incorrect relative path, ie. node dir/app.js it will throw an error
require ("rwd")({ error: true });
```

You can also get at any time the relative path between the cwd and the rwd.

```javascript
var rel = require ("rwd")();
```

On global installed modules the `rwd` module is no-op. It returns null.