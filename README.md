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
//["name", "value", "some"]
```
## values(obj)
return values of given object

```js
var obj = {name: '1',value: '2', some: '3'};
$u.values(obj);
//["1", "2", "3"]
```
## Class.extend
simple js inheritance 

```js
var Dog = $u.Class.extend({
  init: function(name){
    this.name = name;
  },
  get_name: function (){
    return this.name;
  }
});

var Dog_1 = Dog.extend({
  init: function(name){
    this._super(name);
  }
});

var d = new Dog('d');
var d_1 = new Dog_1('d_1');
d.get_name();
//"d"
d_1.get_name();
//"d_1"
```
