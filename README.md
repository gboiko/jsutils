#JSUtils
Simple js functions for convenience

## isFunction(func),isArray(arr),isObject(obj),isString(str)
Returns true if a given variable matche

```js
$u.isFunction(function(){});
//true
$u.isFunction('');
//false

$u.isArray([]);
//true
$u.isArray('');
//false

$u.isObject({});
//true
$u.isObject('');
//false

$u.isString('');
//true
$u.isString({});
//false
```
## bind(fn,context,*[arguments])
bind given function to context if given, and pass arguments if given

```js
var context = {name : 'test'},
    func = function(arg) { return "name: " + (this.name || arg); },
    _func = $u.bind(func, context);
_func();
//name: test

var func = function(arg) { return "name: " + arg; },
    _func = $u.bind(func, null, 'ling');
_func();
//name: ling
```
## keys(obj)
return keys of given object

```js
var obj = {name: '1',value: '2', some: '3'};
$u.keys(obj);
//["name", "value", "some"];
```
## values(obj)
return values of given object

```js
var obj = {name: '1',value: '2', some: '3'};
$u.values(obj);
//["1", "2", "3"];
```
