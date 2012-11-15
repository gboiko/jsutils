#JSUtils
Simple js functions for convenience

## isFunction,isArray,isObject,isString
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
