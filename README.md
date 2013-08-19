rwd
===

_Node.js project_

#### Changes the cwd to the real working directory ####

Version: 0.0.1

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

In order to fix this issue simply require the `rwd` module. I recommend to put the require in the very first line of your main script:

```javascript
//app.js
require ("rwd");
```

#### Installation ####

```
npm install rwd
```

#### Functions ####

- [rwd() : String](#rwd)

---

<a name="rwd"></a>
__rwd() : String__

Simply requiring the module the cwd will be fixed but you can also get at any time the relative path between the cwd and the rwd.

```javascript
var rel = require ("rwd")();
```

On global installed modules it returns null.