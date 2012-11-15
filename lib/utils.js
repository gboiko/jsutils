(function() {
    var base = this;

    var nativeKeys         = Object.keys;

    var arrayProto       = Array.prototype,
        objProto         = Object.prototype,
        funcProto        = Function.prototype;

    var slice            = arrayProto.slice,
        concat           = arrayProto.concat,
        toString         = objProto.toString,
        hasOwnProperty   = objProto.hasOwnProperty;

    var fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

    var $loadScript = function (file,fn) {
        var head = document.getElementsByTagName('head')[0],
            script = document.createElement('script'),
            fn = fn || function(){};

        script.type = "text/javascript";
        script.src = file;

        script.onload = script.onreadystatechange = function(data) {
            var state = script.readyState, status = script.status;
            if ( !state || state === 'loaded' || state === 'complete' ||
                (state === 4 && status === 200) ) {
                fn();
                script.onload = script.onreadystatechange = function(){};
                head   = null;
                script = null;
            }
        };
        head.appendChild(script);
        return this;
    };

    var $isFunction = function (fn) {
        return toString.call(fn) === '[object Function]';
    };

    var $isArray = function (arr) {
        return toString.call(arr) === '[object Array]';
    };

    var $isObject = function (obj) {
        return toString.call(obj) === '[object Object]';
    };

    var $isString = function (str) {
        return toString.call(str) == '[object String]';
    };

    var $bind = function (fn,context) {
        var args = slice.call(arguments,2);
        return function () {
            if (!$isFunction(fn)) throw new TypeError;
            if (!context) { context = function(){}};
            return fn.apply(context,args.concat(slice.call(arguments)));
        }
    };

    var $trim = ''.trim
        ? function(s) { return s.trim(); }
        : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

    var $serialize = function (obj) {
        if (!$isObject(obj)) return obj;
        var pairs = [];
        for (var key in obj) {
            pairs.push(encodeURIComponent(key)
                + '=' + encodeURIComponent(obj[key]));
        }
        return pairs.join('&');
    };

    var $has = function(obj, key) {
        if (!$isObject(obj)) throw new TypeError('Invalid object');
        if (!key) throw new TypeError('Invalid key');
        return hasOwnProperty.call(obj, key);
    };

    var $keys = nativeKeys || function(obj) {
        if (!$isObject(obj)) throw new TypeError('Invalid object');
        var keys = [];
        for (var key in obj) {
            if ($has(obj, key)) keys[keys.length] = key;
        }
        return keys;
    };

    var $values = function(obj) {
        if (!$isObject(obj)) throw new TypeError('Invalid object');
        var values = [];
        for (var key in obj) {
            if ($has(obj, key)) values.push(obj[key]);
        }
        return values;
    };

    var $functions = function(obj) {
        var names = [];
        for (var key in obj) {
            if ($isFunction(obj[key])) names.push(key);
        }
        return names;
    };

    var $isEmpty = function(obj) {
        if (obj == null) return true;
        if ($isArray(obj) || $isString(obj)) return obj.length === 0;
        for (var key in obj) {
            if ($has(obj, key)) return false;
        }
        return true;
    };

    var $Class = function () {};

    $Class.extend = function(prop) {
        var _super = this.prototype;
        var prototype = new this();

        for (var name in prop) {
            prototype[name] = typeof prop[name] == "function" &&
                typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                (function(name, fn){
                    return function() {
                        var tmp = this._super;
                        this._super = _super[name];
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;
                        return ret;
                    };
                })(name, prop[name]) :
                prop[name];
        }

        function Class() {
            if (this.init)
                this.init.apply(this, arguments);
        }

        Class.prototype = prototype;
        Class.prototype.constructor = Class;
        Class.extend = arguments.callee;
        return Class;
    };

    var $u = {
        loadScript : $loadScript,
        isFunction : $isFunction,
        isArray    : $isArray,
        isObject   : $isObject,
        isString   : $isString,
        isEmpty    : $isEmpty,
        bind       : $bind,
        trim       : $trim,
        serialize  : $serialize,
        keys       : $keys,
        values     : $values,
        functions  : $functions,
        has        : $has,
        Class      : $Class
    };

    this.$u = this.$u || $u;


}).call(this);