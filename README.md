# nocb

nocb stands for "no callbacks" and it was written with the intention of help keeping the code linear with the business logic. It is very efficient and will only wait (using yield) if all the results were not yet gathered.

## Usage:
### With --harmony-destructuring
```js
var yourFunc = nocb(function* ([yourArg1, yourArg2, ...], getResults, saveResults) {
```
Single operation: (omit the arg to `saveResults()`)
```js
    getSomeData(someParms, saveResults());
    var [err, res] = yield* getResults();
```
`saveResults()` will return the callback function


Parallel operation: (you cannot omit the arg to `saveResults()`)
```js
    getSomeData(saveResults('d1'));
    getSomeData(saveResults('d2'));
    var {d1:[err, res],
         d2:resarr} = yield* getResults();
```
Additional: multiple callbacks, only 1 is expected to be called
```js
    getSomeData(saveResults('success'), saveResults('error', true /* redundancy */ ), saveResults('other', true));
    var {success: results, error: err, other: o} = yield* getResults();
```
Note about destructuring: `var {err: [err, msg], success... }` will fail if err is not returned, because it is undefined.
Solution:
```js
    var {err: err, success: success, other: other} = yield* getResults();
    if (err) msg = err.msg, err = err.err;
```
### Without --harmony-destructuring
```js
var yourFunc = nocb(function* (args, getResults, saveResults) {
var yourArg1 = args[0];
var yourArg2 = args[1];
```
Single operation: (omit the arg to `saveResults()`)
```js
    getSomeData(someParms, saveResults());
    var r = yield* getResults();
    var err = r.err;
    var res = r.res;
```
`saveResults()` will return the callback function


Parallel operation: (you cannot omit the arg to `saveResults()`)
```js
    getSomeData(saveResults('d1'));
    getSomeData(saveResults('d2'));
    var r = yield* getResults();
    var err = r.d1.err;
    var res = r.d1.res;
    var resarr = r.d2;
```
Additional: multiple callbacks, only 1 is expected to be called
```js
    getSomeData(saveResults('success'), saveResults('error', true /* redundancy */ ), saveResults('other', true));
    var r = yield* getResults();
    var results = r.success;
    var err = r.error;
    var o = r.other;
```

License
----

MIT


**Free Software, Hell Yeah!**

