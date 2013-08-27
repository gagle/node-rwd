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
$ cd dir && node app.js
/home/user1/dir
```

You probably expect the path `/home/user1/dir`. If you execute the main script with a relative path like the above example, very bad things could happen and nearly impossible to detect why your code is not working as expected.

`node dir/app` behaves different than `cd dir && node app`.

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

Warning! `settings.json` doesn't exist in `.`, it's stored in `./dir`.

```
node dir/app.js
```

In order to fix this issue simply require the `rwd` module and execute the returned function. I recommend to put the require in the very first line of your main script:

```javascript
//app.js
require ("rwd")();
```

#### Alternatives ####

If you prefer the ugly and archaic `__dirname` approach rather than using a warning or changing the cwd at runtime, you don't need to install any module. For your convenience you can create a global variable similar to `__dirname` which can be used safely from any module (`__dirname` is local to the file). For example, you can run this snippet in the main file:

```javascript
var path = require ("path");
global.__root = path.dirname (process.mainModule.filename);
```

Then, every time you need to use a relative path from the project root, you can prefix it with `__root`:

```javascript
var fs = require ("fs");
if (fs.existsSync (__root + "/settings.json")){
	doSomethingUseful ();
}
```

#### Installation ####

```
npm install rwd
```

#### Functions ####

- [_module_([obj]) : String | null](#rwd)

---

<a name="rwd"></a>
___module_([obj]) : String | null__

The module returns a function that needs to be called in order the fix the cwd. If you pass an object with an `error` property set to true an error will be thrown when the cwd is not correct. Use this option if you don't like to change the cwd when the process is running. If no object is passed the cwd will be fixed automatically.

```javascript
//If the process is started with an incorrect relative path, ie. node dir/app.js it will throw an error
require ("rwd")({ error: true });
```

You can also get at any time the relative path between the cwd and the rwd.

```javascript
var rel = require ("rwd")();
```

On global installed modules the `rwd` module is no-op. It returns null.