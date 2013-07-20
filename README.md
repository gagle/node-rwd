rwd
===

_Node.js project_

#### Changes the cwd to the real working directory ####

Version: 0.0.1

Did you know why the people prefix `__dirname` before a path?

```javascript
var fs = require ("fs");
fs.existsSync (__dirname + "file");
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



#### Installation ####

```
npm install rwd
```

