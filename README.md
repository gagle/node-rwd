rwd
===

_Node.js project_

#### Warns if the process has been started with the wrong cwd ####

Version: 0.2.0

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

If you execute the main script with a relative path like the above example (`$ node dir/app.js`), very bad things could happen and it's nearly impossible to detect why your code is not working as expected. This is a _feature_ found on all the programming languages because it's a thing related with the OS, not with the programming language itself.

`$ node dir/app` behaves different than `$ cd dir && node app`.

The following example illustrates a very ingenuous script, but depending on how you execute it, very dangerous things could happen:

```javascript
//$ node dir/app.js
var fs = require ("fs");
if (fs.existsSync ("settings.json")){
	doSomethingUseful ();
}else{
	//Warning!!
	saveToDatabaseDefaultSettings ();
}
```

This can be easily fixed changing the cwd at runtime, but it's discouraged. The best way to ensure that the application is started correctly, simply require the `rwd`. I recommend to put the require in the very first line of your main file:

```javascript
//app.js
require ("rwd");
```

Then, if you start the process with a relative path, eg: `$ node dir/app.js`, a message will be printed and the process will exit, something similar to this:

```
The process has been started this way:

  $ node dir/app.js

Better alternatives:

  $ cd dir && node app.js
  $ node <absolute_path>/dir/app.js
```

This way, you don't need to prefix the paths with `__dirname` because if the process doesn't exit it means that the cwd is the same as the directory of the main file.

#### Installation ####

```
npm install rwd
```

#### Alternatives ####

If you prefer the ugly and archaic `__dirname` approach rather than warning and exiting the process, you don't need to install any module. For your convenience you can create a global variable similar to `__dirname` which can be used safely from any module (`__dirname` is local to the file). For example, you can run this snippet in the main file:

```javascript
var path = require ("path");
global.__root = path.dirname (process.mainModule.filename);
```

Then, every time you need to use a relative path from the root, you can prefix it with `__root`:

```javascript
var fs = require ("fs");
if (fs.existsSync (__root + "/settings.json")){
	doSomethingUseful ();
}
```