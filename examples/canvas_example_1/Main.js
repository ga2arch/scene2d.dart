function Isolate() {}
init();

var $ = Isolate.$isolateProperties;
Isolate.$defineClass("ExceptionImplementation", "Object", ["_msg"], {
 toString$0: function() {
  if (this._msg === (void 0)) {
    var t0 = 'Exception';
  } else {
    t0 = 'Exception: ' + $.stringToString(this._msg);
  }
  return t0;
 }
});

Isolate.$defineClass("FutureImpl", "Object", ["_exceptionHandlers", "_listeners", "_exceptionHandled", "_exception", "_value", "_isComplete"], {
 _setException$1: function(exception) {
  if (exception === (void 0)) {
    throw $.captureStackTrace($.IllegalArgumentException$1((void 0)));
  }
  if (this._isComplete === true) {
    throw $.captureStackTrace($.FutureAlreadyCompleteException$0());
  }
  this._exception = exception;
  this._complete$0();
 },
 _setValue$1: function(value) {
  if (this._isComplete === true) {
    throw $.captureStackTrace($.FutureAlreadyCompleteException$0());
  }
  this._value = value;
  this._complete$0();
 },
 _complete$0: function() {
  this._isComplete = true;
  if (!(this._exception === (void 0))) {
    for (var t0 = $.iterator(this._exceptionHandlers); t0.hasNext$0() === true; ) {
      if ($.eqB(t0.next$0().$call$1(this._exception), true)) {
        this._exceptionHandled = true;
        break;
      }
    }
  }
  if (this.get$hasValue() === true) {
    for (var t1 = $.iterator(this._listeners); t1.hasNext$0() === true; ) {
      t1.next$0().$call$1(this.get$value());
    }
  } else {
    if (this._exceptionHandled !== true && $.gtB($.get$length(this._listeners), 0)) {
      throw $.captureStackTrace(this._exception);
    }
  }
 },
 get$hasValue: function() {
  return this.get$isComplete() === true && this._exception === (void 0);
 },
 get$isComplete: function() {
  return this._isComplete;
 },
 get$exception: function() {
  if (this.get$isComplete() !== true) {
    throw $.captureStackTrace($.FutureNotCompleteException$0());
  }
  return this._exception;
 },
 get$value: function() {
  if (this.get$isComplete() !== true) {
    throw $.captureStackTrace($.FutureNotCompleteException$0());
  }
  if (!(this._exception === (void 0))) {
    throw $.captureStackTrace(this._exception);
  }
  return this._value;
 }
});

Isolate.$defineClass("CompleterImpl", "Object", ["_futureImpl"], {
 completeException$1: function(exception) {
  this._futureImpl._setException$1(exception);
 },
 complete$1: function(value) {
  this._futureImpl._setValue$1(value);
 },
 get$future: function() {
  return this._futureImpl;
 }
});

Isolate.$defineClass("HashMapImplementation", "Object", ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_keys?"], {
 toString$0: function() {
  return $.mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
 },
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.forEach$1$bailout(f, 1, length$);
  for (var i = 0; i < length$; i = i + 1) {
    var key = $.index(this._keys, i);
    if (!(key === (void 0)) && !(key === $.CTC3)) {
      f.$call$2(key, $.index(this._values, i));
    }
  }
 },
 forEach$1$bailout: function(f, state, env0) {
  switch (state) {
    case 1:
      length$ = env0;
      break;
  }
  switch (state) {
    case 0:
      var length$ = $.get$length(this._keys);
    case 1:
      state = 0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, length$)) break L0;
        var key = $.index(this._keys, i);
        if (!(key === (void 0)) && !(key === $.CTC3)) {
          f.$call$2(key, $.index(this._values, i));
        }
        i = i + 1;
      }
  }
 },
 get$length: function() {
  return this._numberOfEntries;
 },
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
 },
 remove$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.geB(index, 0)) {
    this._numberOfEntries = $.sub(this._numberOfEntries, 1);
    var value = $.index(this._values, index);
    $.indexSet(this._values, index, (void 0));
    $.indexSet(this._keys, index, $.CTC3);
    this._numberOfDeleted = $.add(this._numberOfDeleted, 1);
    return value;
  }
  return;
 },
 putIfAbsent$2: function(key, ifAbsent) {
  var index = this._probeForLookup$1(key);
  if ($.geB(index, 0)) {
    return $.index(this._values, index);
  }
  var value = ifAbsent.$call$0();
  this.operator$indexSet$2(key, value);
  return value;
 },
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0)) {
    return;
  }
  return $.index(this._values, index);
 },
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  if ($.index(this._keys, index) === (void 0) || $.index(this._keys, index) === $.CTC3) {
    this._numberOfEntries = $.add(this._numberOfEntries, 1);
  }
  $.indexSet(this._keys, index, key);
  $.indexSet(this._values, index, value);
 },
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; i = i + 1) {
    $.indexSet(this._keys, i, (void 0));
    $.indexSet(this._values, i, (void 0));
  }
 },
 clear$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      length$ = env0;
      break;
  }
  switch (state) {
    case 0:
      this._numberOfEntries = 0;
      this._numberOfDeleted = 0;
      var length$ = $.get$length(this._keys);
    case 1:
      state = 0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, length$)) break L0;
        $.indexSet(this._keys, i, (void 0));
        $.indexSet(this._values, i, (void 0));
        i = i + 1;
      }
  }
 },
 _grow$1: function(newCapacity) {
  $.assert($._isPowerOfTwo(newCapacity));
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number') return this._grow$1$bailout(newCapacity, 1, capacity);
  this._loadLimit = $._computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object'||oldKeys.constructor !== Array)) return this._grow$1$bailout(newCapacity, 2, capacity, oldKeys);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object'||oldValues.constructor !== Array)) return this._grow$1$bailout(newCapacity, 3, capacity, oldKeys, oldValues);
  this._keys = $.List(newCapacity);
  var t0 = $.List(newCapacity);
  $.setRuntimeTypeInfo(t0, ({E: 'V'}));
  this._values = t0;
  for (var i = 0; i < capacity; i = i + 1) {
    var t1 = oldKeys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = oldKeys[i];
    if (t2 === (void 0) || t2 === $.CTC3) {
      continue;
    }
    var t3 = oldValues.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    var t4 = oldValues[i];
    var newIndex = this._probeForAdding$1(t2);
    $.indexSet(this._keys, newIndex, t2);
    $.indexSet(this._values, newIndex, t4);
  }
  this._numberOfDeleted = 0;
 },
 _grow$1$bailout: function(newCapacity, state, env0, env1, env2) {
  switch (state) {
    case 1:
      capacity = env0;
      break;
    case 2:
      capacity = env0;
      oldKeys = env1;
      break;
    case 3:
      capacity = env0;
      oldKeys = env1;
      oldValues = env2;
      break;
  }
  switch (state) {
    case 0:
      $.assert($._isPowerOfTwo(newCapacity));
      var capacity = $.get$length(this._keys);
    case 1:
      state = 0;
      this._loadLimit = $._computeLoadLimit(newCapacity);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.List(newCapacity);
      var t0 = $.List(newCapacity);
      $.setRuntimeTypeInfo(t0, ({E: 'V'}));
      this._values = t0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, capacity)) break L0;
        c$0:{
          var key = $.index(oldKeys, i);
          if (key === (void 0) || key === $.CTC3) {
            break c$0;
          }
          var value = $.index(oldValues, i);
          var newIndex = this._probeForAdding$1(key);
          $.indexSet(this._keys, newIndex, key);
          $.indexSet(this._values, newIndex, value);
        }
        i = i + 1;
      }
      this._numberOfDeleted = 0;
  }
 },
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  if ($.gtB(this._numberOfDeleted, numberOfFree)) {
    this._grow$1($.get$length(this._keys));
  }
 },
 _probeForLookup$1: function(key) {
  for (var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys)), numberOfProbes = 1; true; hash = hash0, numberOfProbes = numberOfProbes0) {
    var numberOfProbes0 = numberOfProbes;
    var hash0 = hash;
    var existingKey = $.index(this._keys, hash);
    if (existingKey === (void 0)) {
      return -1;
    }
    if ($.eqB(existingKey, key)) {
      return hash;
    }
    var numberOfProbes1 = numberOfProbes + 1;
    var hash1 = $._nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes0 = numberOfProbes1;
    hash0 = hash1;
  }
 },
 _probeForAdding$1: function(key) {
  var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys));
  if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(key, 1, hash);
  for (var numberOfProbes = 1, hash0 = hash, insertionIndex = -1; true; numberOfProbes = numberOfProbes0, hash0 = hash1, insertionIndex = insertionIndex0) {
    var numberOfProbes0 = numberOfProbes;
    var hash1 = hash0;
    var insertionIndex0 = insertionIndex;
    var existingKey = $.index(this._keys, hash0);
    if (existingKey === (void 0)) {
      if ($.ltB(insertionIndex, 0)) {
        return hash0;
      }
      return insertionIndex;
    } else {
      if ($.eqB(existingKey, key)) {
        return hash0;
      } else {
        insertionIndex0 = insertionIndex;
        if ($.ltB(insertionIndex, 0) && $.CTC3 === existingKey) {
          insertionIndex0 = hash0;
        }
        var numberOfProbes1 = numberOfProbes + 1;
      }
    }
    var hash2 = $._nextProbe(hash0, numberOfProbes, $.get$length(this._keys));
    numberOfProbes0 = numberOfProbes1;
    hash1 = hash2;
  }
 },
 _probeForAdding$1$bailout: function(key, state, env0) {
  switch (state) {
    case 1:
      hash = env0;
      break;
  }
  switch (state) {
    case 0:
      var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var hash0 = hash;
      var insertionIndex = -1;
      L0: while (true) {
        if (!true) break L0;
        var numberOfProbes0 = numberOfProbes;
        var hash1 = hash0;
        var insertionIndex0 = insertionIndex;
        var existingKey = $.index(this._keys, hash0);
        if (existingKey === (void 0)) {
          if ($.ltB(insertionIndex, 0)) {
            return hash0;
          }
          return insertionIndex;
        } else {
          if ($.eqB(existingKey, key)) {
            return hash0;
          } else {
            insertionIndex0 = insertionIndex;
            if ($.ltB(insertionIndex, 0) && $.CTC3 === existingKey) {
              insertionIndex0 = hash0;
            }
            var numberOfProbes1 = numberOfProbes + 1;
          }
        }
        var hash2 = $._nextProbe(hash0, numberOfProbes, $.get$length(this._keys));
        numberOfProbes0 = numberOfProbes1;
        hash1 = hash2;
        numberOfProbes = numberOfProbes0;
        hash0 = hash1;
        insertionIndex = insertionIndex0;
      }
  }
 },
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $._computeLoadLimit(8);
  this._keys = $.List(8);
  var t0 = $.List(8);
  $.setRuntimeTypeInfo(t0, ({E: 'V'}));
  this._values = t0;
 },
 is$Map: function() { return true; }
});

Isolate.$defineClass("HashSetImplementation", "Object", ["_backingMap?"], {
 toString$0: function() {
  return $.collectionToString(this);
 },
 iterator$0: function() {
  var t0 = $.HashSetIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({E: 'E'}));
  return t0;
 },
 get$length: function() {
  return $.get$length(this._backingMap);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
 },
 forEach$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  $.forEach(this._backingMap, new $.Closure18(t0));
 },
 remove$1: function(value) {
  if (this._backingMap.containsKey$1(value) !== true) {
    return false;
  }
  this._backingMap.remove$1(value);
  return true;
 },
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  $.indexSet(this._backingMap, value, value);
 },
 clear$0: function() {
  $.clear(this._backingMap);
 },
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$0();
 },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("HashSetIterator", "Object", ["_nextValidIndex", "_entries"], {
 _advance$0: function() {
  var length$ = $.get$length(this._entries);
  if (typeof length$ !== 'number') return this._advance$0$bailout(1, length$);
  var entry = (void 0);
  do {
    var t0 = $.add(this._nextValidIndex, 1);
    this._nextValidIndex = t0;
    if ($.geB(t0, length$)) {
      break;
    }
    entry = $.index(this._entries, this._nextValidIndex);
  } while (entry === (void 0) || entry === $.CTC3);
 },
 _advance$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      length$ = env0;
      break;
  }
  switch (state) {
    case 0:
      var length$ = $.get$length(this._entries);
    case 1:
      state = 0;
      var entry = (void 0);
      L0: while (true) {
        var t0 = $.add(this._nextValidIndex, 1);
        this._nextValidIndex = t0;
        if ($.geB(t0, length$)) {
          break;
        }
        entry = $.index(this._entries, this._nextValidIndex);
        if (!(entry === (void 0) || entry === $.CTC3)) break L0;
      }
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  }
  var res = $.index(this._entries, this._nextValidIndex);
  this._advance$0();
  return res;
 },
 hasNext$0: function() {
  if ($.geB(this._nextValidIndex, $.get$length(this._entries))) {
    return false;
  }
  if ($.index(this._entries, this._nextValidIndex) === $.CTC3) {
    this._advance$0();
  }
  return $.lt(this._nextValidIndex, $.get$length(this._entries));
 },
 HashSetIterator$1: function(set_) {
  this._advance$0();
 }
});

Isolate.$defineClass("_DeletedKeySentinel", "Object", [], {
});

Isolate.$defineClass("StringBufferImpl", "Object", ["_length", "_buffer"], {
 toString$0: function() {
  if ($.get$length(this._buffer) === 0) {
    return '';
  }
  if ($.get$length(this._buffer) === 1) {
    return $.index(this._buffer, 0);
  }
  var result = $.concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
 },
 clear$0: function() {
  var t0 = $.List((void 0));
  $.setRuntimeTypeInfo(t0, ({E: 'String'}));
  this._buffer = t0;
  this._length = 0;
  return this;
 },
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str === (void 0) || $.isEmpty(str) === true) {
    return this;
  }
  $.add$1(this._buffer, str);
  this._length = $.add(this._length, $.get$length(str));
  return this;
 },
 isEmpty$0: function() {
  return this._length === 0;
 },
 get$length: function() {
  return this._length;
 },
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
 }
});

Isolate.$defineClass("JSSyntaxRegExp", "Object", ["ignoreCase?", "multiLine?", "pattern?"], {
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$2(this, str);
 },
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
 },
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m === (void 0)) {
    return;
  }
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$5(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true
});

Isolate.$defineClass("MatchImplementation", "Object", ["_groups", "_end", "_start", "str", "pattern?"], {
 operator$index$1: function(index) {
  return this.group$1(index);
 },
 group$1: function(index) {
  return $.index(this._groups, index);
 }
});

Isolate.$defineClass("_AllMatchesIterable", "Object", ["_str", "_re"], {
 iterator$0: function() {
  return $._AllMatchesIterator$2(this._re, this._str);
 }
});

Isolate.$defineClass("_AllMatchesIterator", "Object", ["_done", "_next", "_str", "_re"], {
 hasNext$0: function() {
  if (this._done === true) {
    return false;
  } else {
    if (!$.eqNullB(this._next)) {
      return true;
    }
  }
  this._next = this._re.firstMatch$1(this._str);
  if ($.eqNullB(this._next)) {
    this._done = true;
    return false;
  } else {
    return true;
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  }
  var next = this._next;
  this._next = (void 0);
  return next;
 }
});

Isolate.$defineClass("TimeZoneImplementation", "Object", ["isUtc?"], {
 operator$eq$1: function(other) {
  if (!((typeof other === 'object') && !!other.is$TimeZoneImplementation)) {
    return false;
  }
  return $.eq(this.isUtc, other.isUtc);
 },
 is$TimeZoneImplementation: true
});

Isolate.$defineClass("DateImplementation", "Object", ["timeZone?", "value?"], {
 _asJs$0: function() {
  return $.lazyAsJsDate(this);
 },
 add$1: function(duration) {
  $.checkNull(duration);
  return $.DateImplementation$fromEpoch$2($.add(this.value, duration.get$inMilliseconds()), this.timeZone);
 },
 toString$0: function() {
  var t0 = new $.Closure5();
  var t1 = new $.Closure6();
  var t2 = new $.Closure7();
  var y = t0.$call$1(this.get$year());
  var m = t2.$call$1(this.get$month());
  var d = t2.$call$1(this.get$day());
  var h = t2.$call$1(this.get$hours());
  var min = t2.$call$1(this.get$minutes());
  var sec = t2.$call$1(this.get$seconds());
  var ms = t1.$call$1(this.get$milliseconds());
  if (this.timeZone.get$isUtc() === true) {
    return '' + $.stringToString(y) + '-' + $.stringToString(m) + '-' + $.stringToString(d) + ' ' + $.stringToString(h) + ':' + $.stringToString(min) + ':' + $.stringToString(sec) + '.' + $.stringToString(ms) + 'Z';
  } else {
    return '' + $.stringToString(y) + '-' + $.stringToString(m) + '-' + $.stringToString(d) + ' ' + $.stringToString(h) + ':' + $.stringToString(min) + ':' + $.stringToString(sec) + '.' + $.stringToString(ms);
  }
 },
 isUtc$0: function() {
  return this.timeZone.get$isUtc();
 },
 get$isUtc: function() { return new $.Closure19(this); },
 get$milliseconds: function() {
  return $.getMilliseconds(this);
 },
 get$seconds: function() {
  return $.getSeconds(this);
 },
 get$minutes: function() {
  return $.getMinutes(this);
 },
 get$hours: function() {
  return $.getHours(this);
 },
 get$day: function() {
  return $.getDay(this);
 },
 get$month: function() {
  return $.getMonth(this);
 },
 get$year: function() {
  return $.getYear(this);
 },
 hashCode$0: function() {
  return this.value;
 },
 operator$ge$1: function(other) {
  return $.ge(this.value, other.get$value());
 },
 operator$gt$1: function(other) {
  return $.gt(this.value, other.get$value());
 },
 operator$lt$1: function(other) {
  return $.lt(this.value, other.get$value());
 },
 operator$eq$1: function(other) {
  if (!((typeof other === 'object') && !!other.is$DateImplementation)) {
    return false;
  }
  return $.eqB(this.value, other.value) && $.eqB(this.timeZone, other.timeZone);
 },
 DateImplementation$now$0: function() {
  this._asJs$0();
 },
 is$DateImplementation: true
});

Isolate.$defineClass("ListIterator", "Object", ["list", "i"], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.NoMoreElementsException$0());
  }
  var value = (this.list[this.i]);
  this.i = $.add(this.i, 1);
  return value;
 },
 hasNext$0: function() {
  return $.lt(this.i, (this.list.length));
 }
});

Isolate.$defineClass("Closure20", "Object", [], {
 toString$0: function() {
  return 'Closure';
 }
});

Isolate.$defineClass("MetaInfo", "Object", ["set?", "tags", "tag?"], {
});

Isolate.$defineClass("StringMatch", "Object", ["pattern?", "str", "_lib2_start"], {
 group$1: function(group_) {
  if (!$.eqB(group_, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(group_));
  }
  return this.pattern;
 },
 operator$index$1: function(g) {
  return this.group$1(g);
 }
});

Isolate.$defineClass("Object", "", [], {
 toString$0: function() {
  return $.objectToString(this);
 }
});

Isolate.$defineClass("IndexOutOfRangeException", "Object", ["_index"], {
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.stringToString(this._index);
 }
});

Isolate.$defineClass("NoSuchMethodException", "Object", ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"], {
 toString$0: function() {
  var sb = $.StringBufferImpl$1('');
  for (var i = 0; $.ltB(i, $.get$length(this._arguments)); i = i + 1) {
    if (i > 0) {
      sb.add$1(', ');
    }
    sb.add$1($.index(this._arguments, i));
  }
  if (this._existingArgumentNames === (void 0)) {
    return 'NoSuchMethodException : method not found: \'' + $.stringToString(this._functionName) + '\'\nReceiver: ' + $.stringToString(this._receiver) + '\nArguments: [' + $.stringToString(sb) + ']';
  } else {
    var actualParameters = sb.toString$0();
    var sb0 = $.StringBufferImpl$1('');
    for (var i0 = 0; $.ltB(i0, $.get$length(this._existingArgumentNames)); i0 = i0 + 1) {
      if (i0 > 0) {
        sb0.add$1(', ');
      }
      sb0.add$1($.index(this._existingArgumentNames, i0));
    }
    var formalParameters = sb0.toString$0();
    return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.stringToString(this._functionName) + '\'\nReceiver: ' + $.stringToString(this._receiver) + '\nTried calling: ' + $.stringToString(this._functionName) + '(' + $.stringToString(actualParameters) + ')\nFound: ' + $.stringToString(this._functionName) + '(' + $.stringToString(formalParameters) + ')';
  }
 }
});

Isolate.$defineClass("ObjectNotClosureException", "Object", [], {
 toString$0: function() {
  return 'Object is not closure';
 }
});

Isolate.$defineClass("IllegalArgumentException", "Object", ["_arg"], {
 toString$0: function() {
  return 'Illegal argument(s): ' + $.stringToString(this._arg);
 }
});

Isolate.$defineClass("StackOverflowException", "Object", [], {
 toString$0: function() {
  return 'Stack Overflow';
 }
});

Isolate.$defineClass("NullPointerException", "Object", ["arguments", "functionName"], {
 get$exceptionName: function() {
  return 'NullPointerException';
 },
 toString$0: function() {
  if ($.eqNullB(this.functionName)) {
    return this.get$exceptionName();
  } else {
    return '' + $.stringToString(this.get$exceptionName()) + ' : method: \'' + $.stringToString(this.functionName) + '\'\nReceiver: null\nArguments: ' + $.stringToString(this.arguments);
  }
 }
});

Isolate.$defineClass("NoMoreElementsException", "Object", [], {
 toString$0: function() {
  return 'NoMoreElementsException';
 }
});

Isolate.$defineClass("UnsupportedOperationException", "Object", ["_message"], {
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.stringToString(this._message);
 }
});

Isolate.$defineClass("IllegalJSRegExpException", "Object", ["_errmsg", "_pattern"], {
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.stringToString(this._pattern) + '\' \'' + $.stringToString(this._errmsg) + '\'';
 }
});

Isolate.$defineClass("FutureNotCompleteException", "Object", [], {
 toString$0: function() {
  return 'Exception: future has not been completed';
 }
});

Isolate.$defineClass("FutureAlreadyCompleteException", "Object", [], {
 toString$0: function() {
  return 'Exception: future already completed';
 }
});

Isolate.$defineClass("GameScreen", "AbstractScreen", ["stage"], {
 render$1: function(lastTime) {
  $.AbstractScreen.prototype.render$1.call(this, lastTime);
 },
 show$0: function() {
  var canvas = $.document().query$1('#canvas');
  this.stage = $.Stage$3($.document().get$window().get$innerWidth(), $.document().get$window().get$innerHeight(), canvas);
  var rect = $.MyRectangle$4(100, 100, 50, 50);
  var tri = $.MyTriangle$4(100, 100, 50, 50);
  rect.degree = 0;
  tri.degree = 0;
  this.stage.addActor$1(rect);
  this.stage.addActor$1(tri);
 }
});

Isolate.$defineClass("MyTriangle", "Triangle", ["parent", "toRemove", "name", "degree", "height", "width", "y", "x"], {
 act$1: function(delta) {
  if ($.isKeyPressed($.SPACE) === true) {
    this.degree = $.sub(this.degree, $.mul(20, delta));
  }
  this.x = $.sub($.mouseX, $.div(this.width, 2));
  this.y = $.sub($.mouseY, $.div(this.height, 2));
 }
});

Isolate.$defineClass("MyRectangle", "Rectangle", ["gravity", "jumpVel", "jumping", "parent", "toRemove", "name", "degree", "height", "width", "y", "x"], {
 act$1: function(delta) {
  if ($.isKeyPressed($.RIGHT) === true) {
    this.x = $.add(this.x, $.mul(100, delta));
  }
  if ($.isKeyPressed($.LEFT) === true) {
    this.x = $.sub(this.x, $.mul(100, delta));
  }
  if ($.isKeyPressed($.CTRL) === true) {
    this.jumping = true;
  }
  if (this.jumping === true) {
    this.y = $.sub(this.y, this.jumpVel);
    this.jumpVel = $.sub(this.jumpVel, this.gravity);
    if ($.ltB(this.jumpVel, -10)) {
      this.jumping = false;
      this.jumpVel = 10;
    }
  }
 }
});

Isolate.$defineClass("_AbstractWorkerEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_AudioContextEventsImpl", "_EventsImpl", ["_ptr"], {
 get$complete: function() {
  return this._get$1('complete');
 },
 complete$1: function(arg0) { return this.get$complete().$call$1(arg0); }
});

Isolate.$defineClass("_BatteryManagerEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_BodyElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_DOMApplicationCacheEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_DedicatedWorkerContextEventsImpl", "_WorkerContextEventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_DeprecatedPeerConnectionEventsImpl", "_EventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_DocumentEventsImpl", "_ElementEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("EmptyElementRect", "Object", ["clientRects", "bounding", "scroll", "offset", "client"], {
});

Isolate.$defineClass("_SimpleClientRect", "Object", ["height?", "width?", "top?", "left?"], {
 toString$0: function() {
  return '(' + $.stringToString(this.left) + ', ' + $.stringToString(this.top) + ', ' + $.stringToString(this.width) + ', ' + $.stringToString(this.height) + ')';
 },
 operator$eq$1: function(other) {
  return !(other === (void 0)) && $.eqB(this.left, other.get$left()) && $.eqB(this.top, other.get$top()) && $.eqB(this.width, other.get$width()) && $.eqB(this.height, other.get$height());
 }
});

Isolate.$defineClass("_ElementRectImpl", "Object", ["_clientRects", "_boundingClientRect", "scroll", "offset", "client"], {
});

Isolate.$defineClass("_ElementEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_EventSourceEventsImpl", "_EventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_EventsImpl", "Object", ["_ptr"], {
 _get$1: function(type) {
  return $._EventListenerListImpl$2(this._ptr, type);
 },
 operator$index$1: function(type) {
  return this._get$1($.toLowerCase(type));
 }
});

Isolate.$defineClass("_EventListenerListImpl", "Object", ["_type", "_ptr"], {
 _remove$2: function(listener, useCapture) {
  this._ptr.$dom_removeEventListener$3(this._type, listener, useCapture);
 },
 _add$2: function(listener, useCapture) {
  this._ptr.$dom_addEventListener$3(this._type, listener, useCapture);
 },
 remove$2: function(listener, useCapture) {
  this._remove$2(listener, useCapture);
  return this;
 },
 remove$1: function(listener) {
  return this.remove$2(listener,false)
},
 add$2: function(listener, useCapture) {
  this._add$2(listener, useCapture);
  return this;
 },
 add$1: function(listener) {
  return this.add$2(listener,false)
}
});

Isolate.$defineClass("_FileReaderEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_FileWriterEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_FrameSetElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_IDBDatabaseEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_IDBRequestEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_IDBTransactionEventsImpl", "_EventsImpl", ["_ptr"], {
 get$complete: function() {
  return this._get$1('complete');
 },
 complete$1: function(arg0) { return this.get$complete().$call$1(arg0); }
});

Isolate.$defineClass("_IDBVersionChangeRequestEventsImpl", "_IDBRequestEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_InputElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_JavaScriptAudioNodeEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_MediaElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_MediaStreamEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_MessagePortEventsImpl", "_EventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_NotificationEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_PeerConnection00EventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_SVGElementInstanceEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_SharedWorkerContextEventsImpl", "_WorkerContextEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_SpeechRecognitionEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_TextTrackEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_TextTrackCueEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_TextTrackListEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_WebSocketEventsImpl", "_EventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_WindowEventsImpl", "_EventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_WorkerEventsImpl", "_AbstractWorkerEventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_WorkerContextEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_XMLHttpRequestEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_XMLHttpRequestUploadEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_MeasurementRequest", "Object", ["exception=", "value=", "completer?", "computeValue"], {
 computeValue$0: function() { return this.computeValue.$call$0(); }
});

Isolate.$defineClass("_DOMWindowCrossFrameImpl", "Object", ["_window"], {
 postMessage$3: function(message, targetOrigin, messagePorts) {
  if ($.eqNullB(messagePorts)) {
    this._window.postMessage$2(message, targetOrigin);
  } else {
    this._window.postMessage$3(message, targetOrigin, messagePorts);
  }
 },
 postMessage$2: function(message,targetOrigin) {
  return this.postMessage$3(message,targetOrigin,(void 0))
},
 get$top: function() {
  return $._createSafe(this._window.get$top());
 },
 get$length: function() {
  return $.get$length(this._window);
 }
});

Isolate.$defineClass("_FixedSizeListIterator", "_VariableSizeListIterator", ["_lib_length", "_pos", "_array"], {
 hasNext$0: function() {
  return $.gt(this._lib_length, this._pos);
 }
});

Isolate.$defineClass("_VariableSizeListIterator", "Object", [], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  }
  var t0 = this._array;
  var t1 = this._pos;
  this._pos = $.add(t1, 1);
  return $.index(t0, t1);
 },
 hasNext$0: function() {
  return $.gt($.get$length(this._array), this._pos);
 }
});

Isolate.$defineClass("Stage", "Object", ["root", "ctx", "canvas", "height=", "width=", "actors"], {
 addActor$1: function(actor) {
  this.root.addActor$1(actor);
 },
 draw$0: function() {
  this.ctx.clearRect$4(0, 0, this.width, this.height);
  this.root.draw$1(this.ctx);
 },
 act$1: function(delta) {
  this.root.act$1(delta);
 },
 Stage$3: function(width, height, canvas) {
  var t0 = this.width;
  this.canvas.set$width(t0);
  var t1 = this.height;
  this.canvas.set$height(t1);
  this.ctx = this.canvas.getContext$1('2d');
  this.root = $.Group$2('root', this.canvas);
  $.getInstance(this.canvas);
 }
});

Isolate.$defineClass("Actor", "Object", ["parent!", "name?", "height=", "width="], {
 draw$1: function(ctx) {
  ctx.translate$2($.add(this.x, $.div(this.width, 2)), $.add(this.y, $.div(this.height, 2)));
  ctx.rotate$1($.mul(this.degree, 0.017453292519943295));
 }
});

Isolate.$defineClass("Group", "Actor", ["namesToActor", "groups", "children", "canvas", "parent", "toRemove", "name", "degree", "height", "width", "y", "x"], {
 addActor$1: function(actor) {
  var t0 = ({});
  t0.actor_1 = actor;
  $.add$1(this.children, t0.actor_1);
  var t1 = t0.actor_1;
  if (typeof t1 === 'object' && !!t1.is$Group) {
    $.add$1(this.groups, t0.actor_1);
  }
  if (!$.eqNullB(t0.actor_1.get$name())) {
    this.namesToActor.putIfAbsent$2(t0.actor_1.get$name(), new $.Closure13(t0));
  }
  t0.actor_1.set$parent(this);
 },
 drawActor$2: function(ctx, actor) {
  ctx.save$0();
  actor.draw$1(ctx);
  ctx.restore$0();
 },
 draw$1: function(ctx) {
  var t0 = ({});
  t0.ctx_1 = ctx;
  t0.ctx_1.clearRect$4(0, 0, this.width, this.height);
  t0.ctx_1.save$0();
  $.forEach(this.children, new $.Closure17(this, t0));
 },
 act$1: function(delta) {
  var t0 = ({});
  t0.delta_1 = delta;
  $.forEach(this.children, new $.Closure12(t0));
 },
 Group$2: function(name$, canvas) {
  this.children = [];
  this.groups = [];
  this.namesToActor = $.HashMapImplementation$0();
 },
 is$Group: true
});

Isolate.$defineClass("Rectangle", "Actor", [], {
 draw$1: function(ctx) {
  $.Actor.prototype.draw$1.call(this, ctx);
  ctx.beginPath$0();
  ctx.rect$4($.div($.neg(this.width), 2), this.y, this.width, this.height);
  ctx.set$fillStyle('#8ED6FF');
  ctx.fill$0();
 },
 act$1: function(delta) {
 },
 Rectangle$4: function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
 }
});

Isolate.$defineClass("Triangle", "Actor", [], {
 draw$1: function(ctx) {
  $.Actor.prototype.draw$1.call(this, ctx);
  ctx.beginPath$0();
  ctx.moveTo$2(0, $.div($.neg(this.height), 2));
  ctx.lineTo$2($.div($.neg(this.width), 2), $.div(this.height, 2));
  ctx.lineTo$2($.div(this.width, 2), $.div(this.height, 2));
  ctx.closePath$0();
  ctx.set$fillStyle('#ffc821');
  ctx.fill$0();
 },
 act$1: function(delta) {
 },
 Triangle$4: function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
 }
});

Isolate.$defineClass("Input", "Object", ["canvas"], {
 onKeyUp$0: function() {
  $.document().get$window().$dom_addEventListener$2('keyup', new $.Closure9());
 },
 onKeyDown$0: function() {
  $.document().get$window().$dom_addEventListener$2('keydown', new $.Closure10());
 },
 onMouseMove$0: function() {
  this.canvas.$dom_addEventListener$2('mousemove', new $.Closure11());
 },
 Input$1: function(canvas) {
  $._pressed = $.HashMapImplementation$0();
  this.onMouseMove$0();
  this.onKeyDown$0();
  this.onKeyUp$0();
 }
});

Isolate.$defineClass("AbstractScreen", "Object", [], {
 render$1: function(lastTime) {
  var t0 = ({});
  t0.lastTime_1 = lastTime;
  var time = $.DateImplementation$now$0().value;
  var delta = $.div($.sub(time, t0.lastTime_1), 1000);
  this.stage.act$1(delta);
  this.stage.draw$0();
  t0.lastTime_1 = time;
  $.window().webkitRequestAnimationFrame$1(new $.Closure(this, t0));
 }
});

Isolate.$defineClass("Closure", "Closure20", ["this_2", "box_0"], {
 $call$1: function(_) {
  return this.this_2.render$1(this.box_0.lastTime_1);
 }
});

Isolate.$defineClass("Closure2", "Closure20", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$0();
 }
});

Isolate.$defineClass("Closure3", "Closure20", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$1(this.box_0.arg1_2);
 }
});

Isolate.$defineClass("Closure4", "Closure20", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$2(this.box_0.arg1_2, this.box_0.arg2_3);
 }
});

Isolate.$defineClass("Closure5", "Closure20", [], {
 $call$1: function(n) {
  var absN = $.abs(n);
  if ($.ltB(n, 0)) {
    var sign = '-';
  } else {
    sign = '';
  }
  if ($.geB(absN, 1000)) {
    return '' + $.stringToString(n);
  }
  if ($.geB(absN, 100)) {
    return '' + $.stringToString(sign) + '0' + $.stringToString(absN);
  }
  if ($.geB(absN, 10)) {
    return '' + $.stringToString(sign) + '00' + $.stringToString(absN);
  }
  if ($.geB(absN, 1)) {
    return '' + $.stringToString(sign) + '000' + $.stringToString(absN);
  }
  throw $.captureStackTrace($.IllegalArgumentException$1(n));
 }
});

Isolate.$defineClass("Closure6", "Closure20", [], {
 $call$1: function(n) {
  if ($.geB(n, 100)) {
    return '' + $.stringToString(n);
  }
  if ($.geB(n, 10)) {
    return '0' + $.stringToString(n);
  }
  return '00' + $.stringToString(n);
 }
});

Isolate.$defineClass("Closure7", "Closure20", [], {
 $call$1: function(n) {
  if ($.geB(n, 10)) {
    return '' + $.stringToString(n);
  }
  return '0' + $.stringToString(n);
 }
});

Isolate.$defineClass("Closure8", "Closure20", ["box_0"], {
 $call$2: function(k, v) {
  if (this.box_0.first_3 !== true) {
    $.add$1(this.box_0.result_1, ', ');
  }
  this.box_0.first_3 = false;
  $._emitObject(k, this.box_0.result_1, this.box_0.visiting_2);
  $.add$1(this.box_0.result_1, ': ');
  $._emitObject(v, this.box_0.result_1, this.box_0.visiting_2);
 }
});

Isolate.$defineClass("Closure9", "Closure20", [], {
 $call$1: function(evt) {
  evt.preventDefault$0();
  $._pressed.remove$1(evt.get$keyCode());
 }
});

Isolate.$defineClass("Closure10", "Closure20", [], {
 $call$1: function(evt) {
  evt.preventDefault$0();
  $.indexSet($._pressed, evt.get$keyCode(), true);
 }
});

Isolate.$defineClass("Closure11", "Closure20", [], {
 $call$1: function(evt) {
  $.mouseX = evt.get$offsetX();
  $.mouseY = evt.get$offsetY();
 }
});

Isolate.$defineClass("Closure12", "Closure20", ["box_0"], {
 $call$1: function(actor) {
  return actor.act$1(this.box_0.delta_1);
 }
});

Isolate.$defineClass("Closure13", "Closure20", ["box_0"], {
 $call$0: function() {
  return this.box_0.actor_1;
 }
});

Isolate.$defineClass("Closure14", "Closure20", ["this_0"], {
 $call$0: function() {
  return $._ElementRectImpl$1(this.this_0);
 }
});

Isolate.$defineClass("Closure15", "Closure20", [], {
 $call$1: function(e) {
  return $._completeMeasurementFutures();
 }
});

Isolate.$defineClass("Closure16", "Closure20", [], {
 $call$0: function() {
  return $.CTC5;
 }
});

Isolate.$defineClass("Closure17", "Closure20", ["this_2", "box_0"], {
 $call$1: function(actor) {
  return this.this_2.drawActor$2(this.box_0.ctx_1, actor);
 }
});

Isolate.$defineClass("Closure18", "Closure20", ["box_0"], {
 $call$2: function(key, value) {
  this.box_0.f_1.$call$1(key);
 }
});

Isolate.$defineClass("Closure20", "Object", [], {
 toString$0: function() {
  return 'Closure';
 }
});

Isolate.$defineClass('Closure19', 'Closure20', function BoundClosure(self) { this.self = self; }, {
$call$0: function() {
  return this.self.isUtc$0();
},
});
$.FutureImpl$0 = function() {
  var t0 = [];
  return new $.FutureImpl([], t0, false, (void 0), (void 0), false);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$1(argument));
};

$._AudioContextEventsImpl$1 = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.floor$0();
  }
  return Math.floor(receiver);
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.truncate$0();
  }
  if (receiver < 0) {
    var t0 = $.ceil(receiver);
  } else {
    t0 = $.floor(receiver);
  }
  return t0;
};

$.eqB = function(a, b) {
  return $.eq(a, b) === true;
};

$._completeMeasurementFutures = function() {
  if ($.eqB($._nextMeasurementFrameScheduled, false)) {
    return;
  }
  $._nextMeasurementFrameScheduled = false;
  if (!($._pendingRequests === (void 0))) {
    for (var t0 = $.iterator($._pendingRequests); t0.hasNext$0() === true; ) {
      var request = t0.next$0();
      try {
        var t1 = request.computeValue$0();
        request.set$value(t1);
      }catch (t2) {
        var t3 = $.unwrapException(t2);
        var e = t3;
        var t4 = e;
        request.set$value(t4);
        request.set$exception(true);
      }
    }
  }
  var completedRequests = $._pendingRequests;
  var readyMeasurementFrameCallbacks = $._pendingMeasurementFrameCallbacks;
  $._pendingRequests = (void 0);
  $._pendingMeasurementFrameCallbacks = (void 0);
  if (!(completedRequests === (void 0))) {
    for (var t5 = $.iterator(completedRequests); t5.hasNext$0() === true; ) {
      var t6 = t5.next$0();
      if (t6.get$exception() === true) {
        t6.get$completer().completeException$1(t6.get$value());
      } else {
        t6.get$completer().complete$1(t6.get$value());
      }
    }
  }
  if (!(readyMeasurementFrameCallbacks === (void 0))) {
    for (var t7 = $.iterator(readyMeasurementFrameCallbacks); t7.hasNext$0() === true; ) {
      t7.next$0().$call$0();
    }
  }
};

$._containsRef = function(c, ref) {
  for (var t0 = $.iterator(c); t0.hasNext$0() === true; ) {
    if (t0.next$0() === ref) {
      return true;
    }
  }
  return false;
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'Match'}));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0)) return $.allMatchesInStringUnchecked$bailout(needle, haystack, 1, length$, result, patternLength);
  for (var startIndex = 0; true; startIndex = startIndex0) {
    var startIndex0 = startIndex;
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) {
      break;
    }
    result.push($.StringMatch$3(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) {
      break;
    } else {
      if ($.eqB(position, endIndex)) {
        startIndex0 = $.add(startIndex, 1);
      } else {
        startIndex0 = endIndex;
      }
    }
  }
  return result;
};

$.isJsArray = function(value) {
  return !(value === (void 0)) && (value.constructor === Array);
};

$._nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$._AllMatchesIterable$2 = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) {
    return receiver.allMatches$1(str);
  }
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.dynamicSetMetadata = function(inputTable) {
  var t0 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t0);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.MyTriangle$4 = function(x, y, width, height) {
  var t0 = new $.MyTriangle((void 0), false, 'triangle', 0, (void 0), (void 0), (void 0), (void 0));
  t0.Triangle$4(x, y, width, height);
  return t0;
};

$.DateImplementation$now$0 = function() {
  var t0 = new $.DateImplementation($.TimeZoneImplementation$local$0(), $.dateNow());
  t0.DateImplementation$now$0();
  return t0;
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) {
    return receiver.length;
  } else {
    return receiver.get$length();
  }
};

$.getMilliseconds = function(receiver) {
  if (receiver.get$timeZone().get$isUtc() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCMilliseconds());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getMilliseconds());
  }
  return t0;
};

$.ListIterator$1 = function(list) {
  return new $.ListIterator(list, 0);
};

$.IllegalJSRegExpException$2 = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return value;
};

$.FutureAlreadyCompleteException$0 = function() {
  return new $.FutureAlreadyCompleteException();
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$._WorkerEventsImpl$1 = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$.ltB = function(a, b) {
  return $.lt(a, b) === true;
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.clear$0();
  }
  $.set$length(receiver, 0);
};

$.NullPointerException$2 = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) {
    return 'DOMWindow';
  }
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) {
      return 'Document';
    }
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'HTMLTableDataCellElement')) {
    return 'HTMLTableCellElement';
  }
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) {
    return 'HTMLTableCellElement';
  }
  if ($.eqB(name$, 'MSStyleCSSProperties')) {
    return 'CSSStyleDeclaration';
  }
  if ($.eqB(name$, 'CanvasPixelArray')) {
    return 'Uint8ClampedArray';
  }
  if ($.eqB(name$, 'HTMLPhraseElement')) {
    return 'HTMLElement';
  }
  return name$;
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return $.truncate($.div(a, b));
  }
  return a.operator$tdiv$1(b);
};

$.JSSyntaxRegExp$_globalVersionOf$1 = function(other) {
  var t0 = other.get$pattern();
  var t1 = other.get$multiLine();
  var t2 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t1, t0);
  t2.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t2;
};

$.convertDartClosureToJS = function(closure) {
  if (closure === (void 0)) {
    return;
  }
  var function$ = (closure.$identity);
  if (!!function$) {
    return function$;
  }
  var function0 = (function() {
    return $.invokeClosure.$call$5(closure, $, arguments.length, arguments[0], arguments[1]);
  });
  closure.$identity = function0;
  return function0;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = (obj.constructor);
  if ((typeof(constructor$)) === 'function') {
    var name$ = (constructor$.name);
    if ((typeof(name$)) === 'string' && $.isEmpty(name$) !== true && !(name$ === 'Object')) {
      return name$;
    }
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$._FixedSizeListIterator$1 = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') {
    return 'DOMWindow';
  }
  if (name$ === 'CanvasPixelArray') {
    return 'Uint8ClampedArray';
  }
  return name$;
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) {
    return receiver.split$1(pattern);
  }
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.concatAll = function(strings) {
  $.checkNull(strings);
  for (var t0 = $.iterator(strings), result = ''; t0.hasNext$0() === true; result = result0) {
    var result0 = result;
    var t1 = t0.next$0();
    $.checkNull(t1);
    if (!(typeof t1 === 'string')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(t1));
    }
    result0 = result + t1;
  }
  return result;
};

$._InputElementEventsImpl$1 = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$._TextTrackListEventsImpl$1 = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._dynamicMetadata2 = function() {
  if ((typeof($dynamicMetadata)) === 'undefined') {
    var t0 = [];
    $._dynamicMetadata(t0);
  }
  return $dynamicMetadata;
};

$._DeprecatedPeerConnectionEventsImpl$1 = function(_ptr) {
  return new $._DeprecatedPeerConnectionEventsImpl(_ptr);
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    if ($.ltB(b, 0)) {
      throw $.captureStackTrace($.IllegalArgumentException$1(b));
    }
    if ($.gtB(b, 31)) {
      return 0;
    }
    return a >>> b;
  }
  return a.operator$shr$1(b);
};

$.eqNull = function(a) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1((void 0));
    } else {
      return false;
    }
  } else {
    return typeof a === "undefined";
  }
};

$.regExpGetNative = function(regExp) {
  var r = (regExp._re);
  var r0 = r;
  if (r === (void 0)) {
    r0 = (regExp._re = $.regExpMakeNative(regExp, false));
  }
  return r0;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$4(obj, name$, arguments$, (void 0)));
};

$.checkNull = function(object) {
  if (object === (void 0)) {
    throw $.captureStackTrace($.NullPointerException$2((void 0), $.CTC));
  }
  return object;
};

$.CompleterImpl$0 = function() {
  return new $.CompleterImpl($.FutureImpl$0());
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return (a & b) >>> 0;
  }
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.substring$2(startIndex, endIndex);
  }
  $.checkNum(startIndex);
  var length$ = receiver.length;
  var endIndex0 = endIndex;
  if (endIndex === (void 0)) {
    endIndex0 = length$;
  }
  $.checkNum(endIndex0);
  if ($.ltB(startIndex, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  }
  if ($.gtB(startIndex, endIndex0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  }
  if ($.gtB(endIndex0, length$)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(endIndex0));
  }
  return $.substringUnchecked(receiver, startIndex, endIndex0);
};

$.indexSet = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(index));
    }
    if (index < 0 || $.geB(index, $.get$length(a))) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.ExceptionImplementation$1 = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.StringMatch$3 = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$._DOMApplicationCacheEventsImpl$1 = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  var t0 = ({});
  t0.arg2_3 = arg2;
  t0.arg1_2 = arg1;
  t0.closure_1 = closure;
  if ($.eqB(numberOfArguments, 0)) {
    return new $.Closure2(t0).$call$0();
  } else {
    if ($.eqB(numberOfArguments, 1)) {
      return new $.Closure3(t0).$call$0();
    } else {
      if ($.eqB(numberOfArguments, 2)) {
        return new $.Closure4(t0).$call$0();
      } else {
        throw $.captureStackTrace($.ExceptionImplementation$1('Unsupported number of arguments for wrapped closure'));
      }
    }
  }
};

$._EventListenerListImpl$2 = function(_ptr, _type) {
  return new $._EventListenerListImpl(_type, _ptr);
};

$.gt = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a > b;
  }
  return a.operator$gt$1(b);
};

$._createMeasurementFuture = function(computeValue, completer) {
  if ($._pendingRequests === (void 0)) {
    $._pendingRequests = [];
    $._maybeScheduleMeasurementFrame();
  }
  $.add$1($._pendingRequests, $._MeasurementRequest$2(computeValue, completer));
  return completer.get$future();
};

$.assert = function(condition) {
};

$.getSeconds = function(receiver) {
  if (receiver.get$timeZone().get$isUtc() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCSeconds());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getSeconds());
  }
  return t0;
};

$._maybeScheduleMeasurementFrame = function() {
  if ($._nextMeasurementFrameScheduled === true) {
    return;
  }
  $._nextMeasurementFrameScheduled = true;
  if ($._firstMeasurementRequest === true) {
    $.add$1($.window().get$on().get$message(), new $.Closure15());
    $._firstMeasurementRequest = false;
  }
  $.window().postMessage$2('DART-MEASURE', '*');
};

$._WindowEventsImpl$1 = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$.indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf$bailout(a, element, startIndex, endIndex,  0);
  if (typeof endIndex !== 'number') return $.indexOf$bailout(a, element, startIndex, endIndex,  0);
  if ($.geB(startIndex, a.length)) {
    return -1;
  }
  var startIndex0 = startIndex;
  if ($.ltB(startIndex, 0)) {
    startIndex0 = 0;
  }
  if (typeof startIndex0 !== 'number') return $.indexOf$bailout(a, element, startIndex, endIndex, 3, a, endIndex, startIndex0);
  for (var i = startIndex0; i < endIndex; i = i + 1) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    if ($.eqB(a[i], element)) {
      return i;
    }
  }
  return -1;
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object'||inputTable.constructor !== Array)) return $.buildDynamicMetadata$bailout(inputTable,  0);
  var result = [];
  for (var i = 0; i < inputTable.length; i = i + 1) {
    var t0 = inputTable.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t1 = inputTable.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$0();
    $.setRuntimeTypeInfo(set, ({E: 'String'}));
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object'||tagNames.constructor !== Array)) return $.buildDynamicMetadata$bailout(inputTable, 2, inputTable, result, tag, i, tags, set, tagNames);
    for (var j = 0; j < tagNames.length; j = j + 1) {
      var t2 = tagNames.length;
      if (j < 0 || j >= t2) throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$3(tag, tags, set));
  }
  return result;
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      return true;
    } else {
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$1(b));
    }
  }
  return false;
};

$._EventSourceEventsImpl$1 = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.getHours = function(receiver) {
  if (receiver.get$timeZone().get$isUtc() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCHours());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getHours());
  }
  return t0;
};

$.mul = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a * b;
  }
  return a.operator$mul$1(b);
};

$.Stage$3 = function(width, height, canvas) {
  var t0 = new $.Stage((void 0), (void 0), canvas, height, width, (void 0));
  t0.Stage$3(width, height, canvas);
  return t0;
};

$.stringToString = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) {
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return res;
};

$._NotificationEventsImpl$1 = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.contains$1(other);
  }
  return $.contains$2(receiver, other, 0);
};

$.neg = function(a) {
  if (typeof a === "number") {
    return -a;
  }
  return a.operator$negate$0();
};

$._emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && (c.constructor === Array || c.is$List2());
  if (isList) {
    var t0 = '[';
  } else {
    t0 = '{';
  }
  $.add$1(result, t0);
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true; first = first0) {
    var first0 = first;
    var t2 = t1.next$0();
    if (!first) {
      $.add$1(result, ', ');
    }
    $._emitObject(t2, result, visiting);
    first0 = false;
  }
  if (isList) {
    var t3 = ']';
  } else {
    t3 = '}';
  }
  $.add$1(result, t3);
  $.removeLast(visiting);
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list)) {
    throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
  }
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$._WorkerContextEventsImpl$1 = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$._PeerConnection00EventsImpl$1 = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.contains$2(other, startIndex);
  }
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) {
    return receiver.length === 0;
  }
  return receiver.isEmpty$0();
};

$._DocumentEventsImpl$1 = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.IndexOutOfRangeException$1 = function(_index) {
  return new $.IndexOutOfRangeException(_index);
};

$.getDay = function(receiver) {
  if (receiver.get$timeZone().get$isUtc() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCDate());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getDate());
  }
  return t0;
};

$._TextTrackEventsImpl$1 = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(index));
    }
    if (index < 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    if (index >= receiver.length) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    return receiver.charCodeAt(index);
  } else {
    return receiver.charCodeAt$1(index);
  }
};

$._EventsImpl$1 = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$._ElementRectImpl$1 = function(element) {
  var t0 = $._SimpleClientRect$4(element.get$$$dom_clientLeft(), element.get$$$dom_clientTop(), element.get$$$dom_clientWidth(), element.get$$$dom_clientHeight());
  var t1 = $._SimpleClientRect$4(element.get$$$dom_offsetLeft(), element.get$$$dom_offsetTop(), element.get$$$dom_offsetWidth(), element.get$$$dom_offsetHeight());
  var t2 = $._SimpleClientRect$4(element.get$$$dom_scrollLeft(), element.get$$$dom_scrollTop(), element.get$$$dom_scrollWidth(), element.get$$$dom_scrollHeight());
  var t3 = element.$dom_getBoundingClientRect$0();
  return new $._ElementRectImpl(element.$dom_getClientRects$0(), t3, t2, t1, t0);
};

$._BatteryManagerEventsImpl$1 = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$.HashSetImplementation$0 = function() {
  var t0 = new $.HashSetImplementation((void 0));
  t0.HashSetImplementation$0();
  return t0;
};

$.DateImplementation$fromEpoch$2 = function(value, timeZone) {
  return new $.DateImplementation(timeZone, value);
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string') {
    return receiver.split(pattern);
  } else {
    if (typeof pattern === 'object' && !!pattern.is$JSSyntaxRegExp) {
      return receiver.split($.regExpGetNative(pattern));
    } else {
      throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
    }
  }
};

$._IDBRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) {
    throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
  }
};

$._SpeechRecognitionEventsImpl$1 = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$._SVGElementInstanceEventsImpl$1 = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$.toString = function(value) {
  if (typeof value == "object") {
    if ($.isJsArray(value) === true) {
      return $.collectionToString(value);
    } else {
      return value.toString$0();
    }
  }
  if (value === 0 && (1 / value) < 0) {
    return '-0.0';
  }
  if (value === (void 0)) {
    return 'null';
  }
  if (typeof value == "function") {
    return 'Closure';
  }
  return String(value);
};

$._WebSocketEventsImpl$1 = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.collectionToString = function(c) {
  var result = $.StringBufferImpl$1('');
  $._emitCollection(c, result, $.List((void 0)));
  return result.toString$0();
};

$.MetaInfo$3 = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(-1));
    }
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$._MediaStreamEventsImpl$1 = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});;
};

$.Group$2 = function(name$, canvas) {
  var t0 = new $.Group((void 0), (void 0), (void 0), canvas, (void 0), false, name$, 0, (void 0), (void 0), (void 0), (void 0));
  t0.Group$2(name$, canvas);
  return t0;
};

$.div = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a / b;
  }
  return a.operator$div$1(b);
};

$.add = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a + b;
  } else {
    if (typeof a === 'string') {
      var b0 = $.toString(b);
      if (typeof b0 === 'string') {
        return a + b0;
      }
      $.checkNull(b0);
      throw $.captureStackTrace($.IllegalArgumentException$1(b0));
    }
  }
  return a.operator$add$1(b);
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  if (!(f === (void 0)) && (!!f.methods)) {
    return f.methods;
  }
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC8)[name$]);
  if (!(dartMethod === (void 0))) {
    methods['Object'] = dartMethod;
  }
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$.regExpExec = function(regExp, str) {
  var result = ($.regExpGetNative(regExp).exec(str));
  if (result === null) {
    return;
  }
  return result;
};

$.getMinutes = function(receiver) {
  if (receiver.get$timeZone().get$isUtc() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCMinutes());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getMinutes());
  }
  return t0;
};

$.geB = function(a, b) {
  return $.ge(a, b) === true;
};

$.getMonth = function(receiver) {
  if (receiver.get$timeZone().get$isUtc() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCMonth()) + 1;
  } else {
    t0 = ($.lazyAsJsDate(receiver).getMonth()) + 1;
  }
  return t0;
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return value;
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') {
    return !($.indexOf$2(receiver, other, startIndex) === -1);
  } else {
    if (typeof other === 'object' && !!other.is$JSSyntaxRegExp) {
      return other.hasMatch$1($.substring$1(receiver, startIndex));
    } else {
      return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
    }
  }
};

$.GameScreen$0 = function() {
  return new $.GameScreen((void 0));
};

$.ObjectNotClosureException$0 = function() {
  return new $.ObjectNotClosureException();
};

$.window = function() {
  return window;;
};

$.objectToString = function(object) {
  var name$ = (object.constructor.name);
  var name0 = name$;
  if ($.charCodeAt(name$, 0) === 36) {
    name0 = $.substring$1(name$, 1);
  }
  return 'Instance of \'' + $.stringToString(name0) + '\'';
};

$.indexOf2 = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf2$bailout(a, element, startIndex, endIndex,  0);
  if (typeof endIndex !== 'number') return $.indexOf2$bailout(a, element, startIndex, endIndex,  0);
  if ($.geB(startIndex, a.length)) {
    return -1;
  }
  var startIndex0 = startIndex;
  if ($.ltB(startIndex, 0)) {
    startIndex0 = 0;
  }
  if (typeof startIndex0 !== 'number') return $.indexOf2$bailout(a, element, startIndex, endIndex, 3, a, endIndex, startIndex0);
  for (var i = startIndex0; i < endIndex; i = i + 1) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    if ($.eqB(a[i], element)) {
      return i;
    }
  }
  return -1;
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.abs$0();
  }
  return Math.abs(receiver);
};

$._firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(newLength));
    }
    if (newLength < 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(newLength));
    }
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else {
    receiver.set$length(newLength);
  }
  return newLength;
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
};

$._DOMWindowCrossFrameImpl$1 = function(_window) {
  return new $._DOMWindowCrossFrameImpl(_window);
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.forEach$1(f);
  } else {
    return $.forEach2(receiver, f);
  }
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$1('');
  if (multiLine === true) {
    $.add$1(sb, 'm');
  }
  if (ignoreCase === true) {
    $.add$1(sb, 'i');
  }
  if (global === true) {
    $.add$1(sb, 'g');
  }
  try {
    return new RegExp(pattern, $.toString(sb));
  }catch (t0) {
    var t1 = $.unwrapException(t0);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$2(pattern, (String(e))));
  }
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) {
    return 'DOMWindow';
  }
  if ($.eqB(name$, 'Document')) {
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'XMLDocument')) {
    return 'Document';
  }
  if ($.eqB(name$, 'WorkerMessageEvent')) {
    return 'MessageEvent';
  }
  return name$;
};

$.forEach2 = function(iterable, f) {
  for (var t0 = $.iterator(iterable); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
};

$.MyRectangle$4 = function(x, y, width, height) {
  var t0 = new $.MyRectangle(4, 14, false, (void 0), false, 'rectangle', 0, (void 0), (void 0), (void 0), (void 0));
  t0.Rectangle$4(x, y, width, height);
  return t0;
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') {
    return receiver & 0x1FFFFFFF;
  }
  if (!(typeof receiver === 'string')) {
    return receiver.hashCode$0();
  }
  var length$ = (receiver.length);
  for (var hash = 0, i = 0; i < length$; hash = hash0, i = i0) {
    var hash0 = hash;
    var hash1 = (536870911 & hash + (receiver.charCodeAt(i))) >>> 0;
    var hash2 = (536870911 & hash1 + ((524287 & hash1) >>> 0 << 10)) >>> 0;
    hash0 = (hash2 ^ $.shr(hash2, 6)) >>> 0;
    var i0 = i + 1;
  }
  var hash3 = (536870911 & hash + ((67108863 & hash) >>> 0 << 3)) >>> 0;
  var hash4 = (hash3 ^ $.shr(hash3, 11)) >>> 0;
  return (536870911 & hash4 + ((16383 & hash4) >>> 0 << 15)) >>> 0;
};

$.mapToString = function(m) {
  var result = $.StringBufferImpl$1('');
  $._emitMap(m, result, $.List((void 0)));
  return result.toString$0();
};

$.lazyAsJsDate = function(receiver) {
  if (receiver.date === (void 0)) {
    receiver.date = new Date(receiver.get$value());
  }
  return receiver.date;
};

$._XMLHttpRequestEventsImpl$1 = function(_ptr) {
  return new $._XMLHttpRequestEventsImpl(_ptr);
};

$._emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && (o.constructor === Array || o.is$Collection())) {
    if ($._containsRef(visiting, o) === true) {
      if (typeof o === 'object' && (o.constructor === Array || o.is$List2())) {
        var t0 = '[...]';
      } else {
        t0 = '{...}';
      }
      $.add$1(result, t0);
    } else {
      $._emitCollection(o, result, visiting);
    }
  } else {
    if (typeof o === 'object' && o.is$Map()) {
      if ($._containsRef(visiting, o) === true) {
        $.add$1(result, '{...}');
      } else {
        $._emitMap(o, result, visiting);
      }
    } else {
      if ($.eqNullB(o)) {
        var t1 = 'null';
      } else {
        t1 = o;
      }
      $.add$1(result, t1);
    }
  }
};

$.forEach3 = function(iterable, f) {
  for (var t0 = $.iterator(iterable); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
};

$._emitMap = function(m, result, visiting) {
  var t0 = ({});
  t0.visiting_2 = visiting;
  t0.result_1 = result;
  $.add$1(t0.visiting_2, m);
  $.add$1(t0.result_1, '{');
  t0.first_3 = true;
  $.forEach(m, new $.Closure8(t0));
  $.add$1(t0.result_1, '}');
  $.removeLast(t0.visiting_2);
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    return $.ListIterator$1(receiver);
  }
  return receiver.iterator$0();
};

$._JavaScriptAudioNodeEventsImpl$1 = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$._IDBDatabaseEventsImpl$1 = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$.TimeZoneImplementation$local$0 = function() {
  return new $.TimeZoneImplementation(false);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.stringToString($.getTypeNameOf(obj));
};

$.ge = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a >= b;
  }
  return a.operator$ge$1(b);
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = (methods[tag]);
  var method0 = method;
  if (method === (void 0) && !($._dynamicMetadata2() === (void 0))) {
    for (var method1 = method, i = 0; method0 = method1, $.ltB(i, $.get$length($._dynamicMetadata2())); method1 = method2, i = i0) {
      var method2 = method1;
      var entry = $.index($._dynamicMetadata2(), i);
      method2 = method1;
      if ($.contains$1(entry.get$set(), tag) === true) {
        var method3 = (methods[entry.get$tag()]);
        if (!(method3 === (void 0))) {
          method0 = method3;
          break;
        }
        method2 = method3;
      }
      var i0 = i + 1;
    }
  }
  var method4 = method0;
  if (method0 === (void 0)) {
    method4 = (methods['Object']);
  }
  var proto = (Object.getPrototypeOf(obj));
  var method5 = method4;
  if (method4 === (void 0)) {
    method5 = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  }
  var nullCheckMethod = (function() {var res = method5.apply(this, Array.prototype.slice.call(arguments));return res === null ? (void 0) : res;});
  if (!proto.hasOwnProperty(name$)) {
    $.defineProperty(proto, name$, nullCheckMethod);
  }
  return nullCheckMethod.apply(obj, arguments$);
};

$._MessagePortEventsImpl$1 = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$.getFunctionForTypeNameOf = function() {
  if (!((typeof(navigator)) === 'object')) {
    return $.typeNameInChrome;
  }
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC7) === true) {
    return $.typeNameInChrome;
  } else {
    if ($.contains$1(userAgent, 'Firefox') === true) {
      return $.typeNameInFirefox;
    } else {
      if ($.contains$1(userAgent, 'MSIE') === true) {
        return $.typeNameInIE;
      } else {
        return $.constructorNameFallback;
      }
    }
  }
};

$._MeasurementRequest$2 = function(computeValue, completer) {
  return new $._MeasurementRequest(false, (void 0), completer, computeValue);
};

$.index = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(index));
      }
      if (!($.truncate(index) === index)) {
        throw $.captureStackTrace($.IllegalArgumentException$1(index));
      }
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a))) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    return a[index];
  }
  return a.operator$index$1(index);
};

$._TextTrackCueEventsImpl$1 = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.startsWith$1(other);
  }
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length)) {
    return false;
  }
  return other == receiver.substring(0, length$);
};

$._ElementEventsImpl$1 = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$.isKeyPressed = function(keyCode) {
  if ($._pressed.containsKey$1(keyCode) === true) {
    return $.index($._pressed, keyCode);
  } else {
    return false;
  }
};

$.toLowerCase = function(receiver) {
  if (!(typeof receiver === 'string')) {
    return receiver.toLowerCase$0();
  }
  return receiver.toLowerCase();
};

$.MatchImplementation$5 = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$.List = function(length$) {
  return $.newList(length$);
};

$._SimpleClientRect$4 = function(left, top$, width, height) {
  return new $._SimpleClientRect(height, width, top$, left);
};

$._isPowerOfTwo = function(x) {
  return $.eq($.and(x, $.sub(x, 1)), 0);
};

$.UnsupportedOperationException$1 = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$._createSafe = function(w) {
  if (w === $.window()) {
    return w;
  } else {
    return $._DOMWindowCrossFrameImpl$1(w);
  }
};

$._XMLHttpRequestUploadEventsImpl$1 = function(_ptr) {
  return new $._XMLHttpRequestUploadEventsImpl(_ptr);
};

$.captureStackTrace = function(ex) {
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(start));
    }
    return $.indexOf(receiver, element, start, (receiver.length));
  } else {
    if (typeof receiver === 'string') {
      $.checkNull(element);
      if (!((typeof start === 'number') && (start === (start | 0)))) {
        throw $.captureStackTrace($.IllegalArgumentException$1(start));
      }
      if (!(typeof element === 'string')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(element));
      }
      if (start < 0) {
        return -1;
      }
      return receiver.indexOf(element, start);
    }
  }
  return receiver.indexOf$2(element, start);
};

$._DedicatedWorkerContextEventsImpl$1 = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$.StackOverflowException$0 = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1(b);
    } else {
      return a === b;
    }
  }
  return a === b;
};

$.StringBufferImpl$1 = function(content$) {
  var t0 = new $.StringBufferImpl((void 0), (void 0));
  t0.StringBufferImpl$1(content$);
  return t0;
};

$.HashMapImplementation$0 = function() {
  var t0 = new $.HashMapImplementation((void 0), (void 0), (void 0), (void 0), (void 0));
  t0.HashMapImplementation$0();
  return t0;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.substring$1(startIndex);
  }
  return $.substring$2(receiver, startIndex, (void 0));
};

$._FileReaderEventsImpl$1 = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$.getInstance = function(canvas) {
  if ($.eqNullB($._instance)) {
    $._instance = $.Input$1(canvas);
  }
  return $._instance;
};

$.Input$1 = function(canvas) {
  var t0 = new $.Input(canvas);
  t0.Input$1(canvas);
  return t0;
};

$._IDBVersionChangeRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$._SharedWorkerContextEventsImpl$1 = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$.getYear = function(receiver) {
  if (receiver.get$timeZone().get$isUtc() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCFullYear());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getFullYear());
  }
  return t0;
};

$.gtB = function(a, b) {
  return $.gt(a, b) === true;
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target === (void 0))) {
    target.builtin$typeInfo = typeInfo;
  }
};

$.eqNullB = function(a) {
  return $.eqNull(a) === true;
};

$.NoMoreElementsException$0 = function() {
  return new $.NoMoreElementsException();
};

$._FrameSetElementEventsImpl$1 = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.document = function() {
  return document;;
};

$._FileWriterEventsImpl$1 = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$.newList = function(length$) {
  if (length$ === (void 0)) {
    return new Array();
  }
  var t0 = typeof length$ === 'number' && length$ === (length$ | 0);
  var t1 = !t0;
  if (t0) {
    t1 = length$ < 0;
  }
  if (t1) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$.main = function() {
  var m = $.GameScreen$0();
  m.show$0();
  m.render$1($.DateImplementation$now$0().value);
};

$.dateNow = function() {
  return Date.now();
};

$.lt = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a < b;
  }
  return a.operator$lt$1(b);
};

$._AbstractWorkerEventsImpl$1 = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) {
    return ex.dartException;
  } else {
    if (ex instanceof TypeError) {
      var type = (ex.type);
      var name$ = $.index((ex.arguments), 0);
      if (type === 'property_not_function' || type === 'called_non_callable' || type === 'non_object_property_call' || type === 'non_object_property_load') {
        if (!(name$ === (void 0)) && $.startsWith(name$, '$call$') === true) {
          return $.ObjectNotClosureException$0();
        } else {
          return $.NullPointerException$2((void 0), $.CTC);
        }
      } else {
        if (type === 'undefined_method') {
          if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) {
            return $.ObjectNotClosureException$0();
          } else {
            return $.NoSuchMethodException$4('', name$, [], (void 0));
          }
        }
      }
    } else {
      if (ex instanceof RangeError) {
        if ($.contains$1((ex.message), 'call stack') === true) {
          return $.StackOverflowException$0();
        }
      }
    }
  }
  return ex;
};

$.NoSuchMethodException$4 = function(_receiver, _functionName, _arguments, _existingArgumentNames) {
  return new $.NoSuchMethodException(_existingArgumentNames, _arguments, _functionName, _receiver);
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.ceil$0();
  }
  return Math.ceil(receiver);
};

$._computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$.FutureNotCompleteException$0 = function() {
  return new $.FutureNotCompleteException();
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf === (void 0)) {
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  }
  return $._getTypeNameOf.$call$1(obj);
};

$.IllegalArgumentException$1 = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$.HashSetIterator$1 = function(set_) {
  var t0 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t0.HashSetIterator$1(set_);
  return t0;
};

$._MediaElementEventsImpl$1 = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$._IDBTransactionEventsImpl$1 = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$.sub = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a - b;
  }
  return a.operator$sub$1(b);
};

$._AllMatchesIterator$2 = function(re, _str) {
  return new $._AllMatchesIterator(false, (void 0), _str, $.JSSyntaxRegExp$_globalVersionOf$1(re));
};

$._BodyElementEventsImpl$1 = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$.indexOf2$bailout = function(a, element, startIndex, endIndex, state, env0, env1, env2) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
    case 3:
      t0 = env0;
      t1 = env1;
      startIndex0 = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) {
        return -1;
      }
      var startIndex0 = startIndex;
      if ($.ltB(startIndex, 0)) {
        startIndex0 = 0;
      }
    case 3:
      state = 0;
      var i = startIndex0;
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) {
          return i;
        }
        i = $.add(i, 1);
      }
      return -1;
  }
};

$.indexOf$bailout = function(a, element, startIndex, endIndex, state, env0, env1, env2) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
    case 3:
      t0 = env0;
      t1 = env1;
      startIndex0 = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) {
        return -1;
      }
      var startIndex0 = startIndex;
      if ($.ltB(startIndex, 0)) {
        startIndex0 = 0;
      }
    case 3:
      state = 0;
      var i = startIndex0;
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) {
          return i;
        }
        i = $.add(i, 1);
      }
      return -1;
  }
};

$.allMatchesInStringUnchecked$bailout = function(needle, haystack, state, env0, env1, env2) {
  switch (state) {
    case 1:
      length$ = env0;
      result = env1;
      patternLength = env2;
      break;
  }
  switch (state) {
    case 0:
      var result = $.List((void 0));
      $.setRuntimeTypeInfo(result, ({E: 'Match'}));
      var length$ = $.get$length(haystack);
      var patternLength = $.get$length(needle);
    case 1:
      state = 0;
      var startIndex = 0;
      L0: while (true) {
        if (!true) break L0;
        var startIndex0 = startIndex;
        var position = $.indexOf$2(haystack, needle, startIndex);
        if ($.eqB(position, -1)) {
          break;
        }
        result.push($.StringMatch$3(position, haystack, needle));
        var endIndex = $.add(position, patternLength);
        if ($.eqB(endIndex, length$)) {
          break;
        } else {
          if ($.eqB(position, endIndex)) {
            startIndex0 = $.add(startIndex, 1);
          } else {
            startIndex0 = endIndex;
          }
        }
        startIndex = startIndex0;
      }
      return result;
  }
};

$.buildDynamicMetadata$bailout = function(inputTable, state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      result = env1;
      tag = env2;
      i = env3;
      tags = env4;
      set = env5;
      tagNames = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var result = [];
      var i = 0;
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, $.get$length(inputTable))) break L0;
            var tag = $.index($.index(inputTable, i), 0);
            var tags = $.index($.index(inputTable, i), 1);
            var set = $.HashSetImplementation$0();
            $.setRuntimeTypeInfo(set, ({E: 'String'}));
            var tagNames = $.split(tags, '|');
          case 2:
            state = 0;
            var j = 0;
            L1: while (true) {
              if (!$.ltB(j, $.get$length(tagNames))) break L1;
              set.add$1($.index(tagNames, j));
              j = j + 1;
            }
            $.add$1(result, $.MetaInfo$3(tag, tags, set));
            i = i + 1;
        }
      }
      return result;
  }
};

$.dynamicBind.$call$4 = $.dynamicBind;
$.throwNoSuchMethod.$call$3 = $.throwNoSuchMethod;
$.typeNameInIE.$call$1 = $.typeNameInIE;
$.typeNameInChrome.$call$1 = $.typeNameInChrome;
$.toStringWrapper.$call$0 = $.toStringWrapper;
$.invokeClosure.$call$5 = $.invokeClosure;
$.typeNameInFirefox.$call$1 = $.typeNameInFirefox;
$.constructorNameFallback.$call$1 = $.constructorNameFallback;
Isolate.$finishClasses();
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC4 = new Isolate.$isolateProperties._SimpleClientRect(0, 0, 0, 0);
$.CTC5 = new Isolate.$isolateProperties.EmptyElementRect(Isolate.$isolateProperties.CTC, Isolate.$isolateProperties.CTC4, Isolate.$isolateProperties.CTC4, Isolate.$isolateProperties.CTC4, Isolate.$isolateProperties.CTC4);
$.CTC6 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC3 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC7 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC8 = new Isolate.$isolateProperties.Object();
$.CTC2 = new Isolate.$isolateProperties.NoMoreElementsException();
$._instance = (void 0);
$._pendingRequests = (void 0);
$._pressed = (void 0);
$.mouseX = 0;
$.CTRL = 17;
$.SPACE = 32;
$._nextMeasurementFrameScheduled = false;
$._firstMeasurementRequest = true;
$.LEFT = 37;
$._getTypeNameOf = (void 0);
$._pendingMeasurementFrameCallbacks = (void 0);
$.RIGHT = 39;
$.mouseY = 0;
var $ = null;
Isolate.$finishClasses();
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};
$.defineProperty(Object.prototype, 'is$List2', function() { return false; });
$.defineProperty(Object.prototype, 'is$Map', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
$.defineProperty(Object.prototype, 'toString$0', function() { return $.toStringForNativeObject(this); });
$.$defineNativeClass('AbstractWorker', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
},
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._AbstractWorkerEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLAnchorElement', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('WebKitAnimation', ["name?"], {
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["width=", "name?", "height="], {
});

$.$defineNativeClass('Attr', ["value=", "name?"], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function() {
  return $._AudioContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('AudioParam', ["value=", "name?"], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.$call$0(); }
});

$.$defineNativeClass('BatteryManager', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
},
 get$on: function() {
  return $._BatteryManagerEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function() {
  return $._BodyElementEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLButtonElement', ["value=", "name?"], {
});

$.$defineNativeClass('WebKitCSSKeyframesRule', ["name?"], {
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 set$width: function(value) {
  this.setProperty$3('width', value, '');
 },
 get$width: function() {
  return this.getPropertyValue$1('width');
 },
 get$top: function() {
  return this.getPropertyValue$1('top');
 },
 get$left: function() {
  return this.getPropertyValue$1('left');
 },
 set$height: function(value) {
  this.setProperty$3('height', value, '');
 },
 get$height: function() {
  return this.getPropertyValue$1('height');
 },
 get$clear: function() {
  return this.getPropertyValue$1('clear');
 },
 clear$0: function() { return this.get$clear().$call$0(); },
 setProperty$3: function(propertyName, value, priority) {
  return this.setProperty(propertyName,value,priority);
 },
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
 }
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', ["width=", "height="], {
 getContext$1: function(contextId) {
  return this.getContext(contextId);
 }
});

$.$defineNativeClass('CanvasRenderingContext2D', ["fillStyle!"], {
 translate$2: function(tx, ty) {
  return this.translate(tx,ty);
 },
 save$0: function() {
  return this.save();
 },
 rotate$1: function(angle) {
  return this.rotate(angle);
 },
 restore$0: function() {
  return this.restore();
 },
 rect$4: function(x, y, width, height) {
  return this.rect(x,y,width,height);
 },
 moveTo$2: function(x, y) {
  return this.moveTo(x,y);
 },
 lineTo$2: function(x, y) {
  return this.lineTo(x,y);
 },
 fill$0: function() {
  return this.fill();
 },
 closePath$0: function() {
  return this.closePath();
 },
 clearRect$4: function(x, y, width, height) {
  return this.clearRect(x,y,width,height);
 },
 beginPath$0: function() {
  return this.beginPath();
 }
});

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRect', ["width?", "top?", "left?", "height?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
$.$defineNativeClass('DOMApplicationCache', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
},
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$1(this);
 }
});

$.$defineNativeClass('DOMException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMFileSystem', ["name?"], {
});

$.$defineNativeClass('DOMFileSystemSync', ["name?"], {
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["name?", "length?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 contains$1: function(string) {
  return this.contains(string);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'String'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 toString$0: function() {
  return this.toString();
 },
 remove$1: function(token) {
  return this.remove(token);
 },
 contains$1: function(token) {
  return this.contains(token);
 },
 add$1: function(token) {
  return this.add(token);
 }
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
 },
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
}
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('DeprecatedPeerConnection', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
},
 get$on: function() {
  return $._DeprecatedPeerConnectionEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLDocument', [], {
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);;
 },
 query$1: function(selectors) {
  if ($.CTC6.hasMatch$1(selectors) === true) {
    return this.$dom_getElementById$1($.substring$1(selectors, 1));
  }
  return this.$dom_querySelector$1(selectors);
 },
 $dom_getElementById$1: function(elementId) {
  return this.getElementById(elementId);
 },
 get$window: function() {
  return this.defaultView;;
 },
 get$on: function() {
  return $._DocumentEventsImpl$1(this);
 }
});

$.$defineNativeClass('DocumentFragment', [], {
 query$1: function(selectors) {
  return this.querySelector(selectors);
 },
 get$on: function() {
  return $._ElementEventsImpl$1(this);
 },
 get$translate: function() {
  return false;
 },
 translate$2: function(arg0, arg1) { return this.get$translate().$call$2(arg0, arg1); },
 get$rect: function() {
  var t0 = new $.Closure16();
  var t1 = $.CompleterImpl$0();
  $.setRuntimeTypeInfo(t1, ({T: 'ElementRect'}));
  return $._createMeasurementFuture(t0, t1);
 },
 rect$4: function(arg0, arg1, arg2, arg3) { return this.get$rect().$call$4(arg0, arg1, arg2, arg3); }
});

$.$defineNativeClass('DocumentType', ["name?"], {
});

$.$defineNativeClass('Element', [], {
 query$1: function(selectors) {
  return this.querySelector(selectors);
 },
 $dom_getClientRects$0: function() {
  return this.getClientRects();
 },
 $dom_getBoundingClientRect$0: function() {
  return this.getBoundingClientRect();
 },
 translate$2: function(arg0, arg1) { return this.translate.$call$2(arg0, arg1); },
 get$$$dom_scrollWidth: function() {
  return this.scrollWidth;;
 },
 get$$$dom_scrollTop: function() {
  return this.scrollTop;;
 },
 get$$$dom_scrollLeft: function() {
  return this.scrollLeft;;
 },
 get$$$dom_scrollHeight: function() {
  return this.scrollHeight;;
 },
 get$$$dom_offsetWidth: function() {
  return this.offsetWidth;;
 },
 get$$$dom_offsetTop: function() {
  return this.offsetTop;;
 },
 get$$$dom_offsetLeft: function() {
  return this.offsetLeft;;
 },
 get$$$dom_offsetHeight: function() {
  return this.offsetHeight;;
 },
 get$$$dom_clientWidth: function() {
  return this.clientWidth;;
 },
 get$$$dom_clientTop: function() {
  return this.clientTop;;
 },
 get$$$dom_clientLeft: function() {
  return this.clientLeft;;
 },
 get$$$dom_clientHeight: function() {
  return this.clientHeight;;
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._ElementEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 },
 get$rect: function() {
  var t0 = new $.Closure14(this);
  var t1 = $.CompleterImpl$0();
  $.setRuntimeTypeInfo(t1, ({T: 'ElementRect'}));
  return $._createMeasurementFuture(t0, t1);
 },
 rect$4: function(arg0, arg1, arg2, arg3) { return this.get$rect().$call$4(arg0, arg1, arg2, arg3); }
});

$.$defineNativeClass('HTMLEmbedElement', ["width=", "name?", "height="], {
});

$.$defineNativeClass('Entry', ["name?"], {
 remove$2: function(successCallback, errorCallback) {
  return this.remove($.convertDartClosureToJS(successCallback),$.convertDartClosureToJS(errorCallback));
 },
 remove$1: function(successCallback) {
  successCallback = $.convertDartClosureToJS(successCallback);
  errorCallback = $.convertDartClosureToJS(errorCallback);
  return this.remove(successCallback);
},
 moveTo$4: function(parent, name, successCallback, errorCallback) {
  return this.moveTo(parent,name,$.convertDartClosureToJS(successCallback),$.convertDartClosureToJS(errorCallback));
 },
 moveTo$2: function(parent$,name$) {
  successCallback = $.convertDartClosureToJS(successCallback);
  errorCallback = $.convertDartClosureToJS(errorCallback);
  return this.moveTo(parent$,name$);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', ["name?"], {
 moveTo$2: function(parent, name) {
  return this.moveTo(parent,name);
 }
});

$.$defineNativeClass('ErrorEvent', ["message?"], {
});

$.$defineNativeClass('Event', [], {
 preventDefault$0: function() {
  return this.preventDefault();
 }
});

$.$defineNativeClass('EventException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('EventSource', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
},
 get$on: function() {
  return $._EventSourceEventsImpl$1(this);
 }
});

$.$defineNativeClass('EventTarget', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$2: function(type,listener) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$2')) {
    listener = $.convertDartClosureToJS(listener);
  return this.addEventListener(type,listener);  } else {
    return Object.prototype.$dom_addEventListener$2.call(this, type,listener);
  }

},
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._EventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLFieldSetElement', ["name?"], {
});

$.$defineNativeClass('File', ["name?"], {
});

$.$defineNativeClass('FileException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('FileList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'File'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileReader', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
},
 get$on: function() {
  return $._FileReaderEventsImpl$1(this);
 }
});

$.$defineNativeClass('FileWriter', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
},
 get$on: function() {
  return $._FileWriterEventsImpl$1(this);
 }
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'num'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'num'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["name?", "length?"], {
});

$.$defineNativeClass('HTMLFrameElement', ["width?", "name?", "height?"], {
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLHRElement', ["width="], {
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 remove$1: function(index) {
  return this.remove(index);
 },
 set$length: function(value) {
  this.length = value;;
 },
 get$length: function() {
  return this.length;;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
});

$.$defineNativeClass('IDBCursorWithValue', ["value?"], {
});

$.$defineNativeClass('IDBDatabase', ["name?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
},
 get$on: function() {
  return $._IDBDatabaseEventsImpl$1(this);
 }
});

$.$defineNativeClass('IDBDatabaseException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('IDBIndex', ["name?"], {
});

$.$defineNativeClass('IDBObjectStore', ["name?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(value, key) {
  return this.add(value,key);
 },
 add$1: function(value) {
  return this.add(value);
}
});

$.$defineNativeClass('IDBRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$2: function(type,listener) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$2')) {
    listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);  } else {
    return Object.prototype.$dom_addEventListener$2.call(this, type,listener);
  }

},
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._IDBRequestEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('IDBTransaction', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
},
 get$on: function() {
  return $._IDBTransactionEventsImpl$1(this);
 }
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
},
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLIFrameElement', ["width=", "name?", "height="], {
});

$.$defineNativeClass('ImageData', ["width?", "height?"], {
});

$.$defineNativeClass('HTMLImageElement', ["width=", "name?", "height="], {
 complete$1: function(arg0) { return this.complete.$call$1(arg0); }
});

$.$defineNativeClass('HTMLInputElement', ["width=", "value=", "pattern?", "name?", "height="], {
 get$on: function() {
  return $._InputElementEventsImpl$1(this);
 }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
},
 get$on: function() {
  return $._JavaScriptAudioNodeEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLKeygenElement', ["name?"], {
});

$.$defineNativeClass('HTMLLIElement', ["value="], {
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLMapElement', ["name?"], {
});

$.$defineNativeClass('HTMLMarqueeElement', ["width=", "height="], {
});

$.$defineNativeClass('MediaController', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
}
});

$.$defineNativeClass('HTMLMediaElement', [], {
 get$on: function() {
  return $._MediaElementEventsImpl$1(this);
 }
});

$.$defineNativeClass('MediaKeyEvent', ["message?"], {
});

$.$defineNativeClass('MediaList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'String'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStream', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
},
 get$on: function() {
  return $._MediaStreamEventsImpl$1(this);
 }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
});

$.$defineNativeClass('MessagePort', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
},
 get$on: function() {
  return $._MessagePortEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLMetaElement', ["name?"], {
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
});

$.$defineNativeClass('MouseEvent', ["offsetY?", "offsetX?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
 },
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
 },
 contains$1: function(other) {
  return this.contains(other);
 },
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
 },
 set$text: function(value) {
  this.textContent = value;;
 }
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
  return this[index];;
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._parent.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    this._parent.$dom_removeChild$1(result);
  }
  return result;
 },
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('NodeSelector', [], {
 query$1: function(selectors) {
  return this.querySelector(selectors);
 }
});

$.$defineNativeClass('Notification', ["tag?"], {
 get$on: function() {
  return $._NotificationEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLObjectElement', ["width=", "name?", "height="], {
});

$.$defineNativeClass('OperationNotAllowedException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
});

$.$defineNativeClass('HTMLOutputElement', ["value=", "name?"], {
});

$.$defineNativeClass('HTMLParamElement', ["value=", "name?"], {
});

$.$defineNativeClass('PeerConnection00', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
},
 get$on: function() {
  return $._PeerConnection00EventsImpl$1(this);
 }
});

$.$defineNativeClass('PositionError', ["message?"], {
});

$.$defineNativeClass('HTMLPreElement', ["width="], {
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('RangeException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('Rect', ["top?", "left?"], {
});

$.$defineNativeClass('SQLError', ["message?"], {
});

$.$defineNativeClass('SQLException', ["message?"], {
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGElementInstance', [], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$1(this);
 }
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SVGFEBlendElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEComponentTransferElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFECompositeElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEDisplacementMapElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEDropShadowElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEFloodElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEGaussianBlurElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEImageElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEMergeElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEMorphologyElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEOffsetElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFESpecularLightingElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFETileElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFETurbulenceElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFilterElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFilterPrimitiveStandardAttributes', ["width?", "height?"], {
});

$.$defineNativeClass('SVGForeignObjectElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGImageElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGMaskElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGMatrix', [], {
 translate$2: function(x, y) {
  return this.translate(x,y);
 },
 rotate$1: function(angle) {
  return this.rotate(angle);
 }
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPatternElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGRect', ["width=", "height="], {
});

$.$defineNativeClass('SVGRectElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGSVGElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGTextPositioningElement', [], {
 rotate$1: function(arg0) { return this.rotate.$call$1(arg0); }
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGUseElement', ["width?", "height?"], {
});

$.$defineNativeClass('Screen', ["width?", "height?"], {
});

$.$defineNativeClass('HTMLSelectElement', ["value=", "name?", "length="], {
});

$.$defineNativeClass('SharedWorkerContext', ["name?"], {
 get$on: function() {
  return $._SharedWorkerContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognition', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
},
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$1(this);
 }
});

$.$defineNativeClass('SpeechRecognitionError', ["message?"], {
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
 },
 $dom_removeItem$1: function(key) {
  return this.removeItem(key);
 },
 $dom_key$1: function(index) {
  return this.key(index);
 },
 $dom_getItem$1: function(key) {
  return this.getItem(key);
 },
 $dom_clear$0: function() {
  return this.clear();
 },
 get$$$dom_length: function() {
  return this.length;;
 },
 isEmpty$0: function() {
  return $.eqNull(this.$dom_key$1(0));
 },
 get$length: function() {
  return this.get$$$dom_length();
 },
 forEach$1: function(f) {
  for (var i = 0; true; i = i + 1) {
    var key = this.$dom_key$1(i);
    if ($.eqNullB(key)) {
      return;
    }
    f.$call$2(key, this.operator$index$1(key));
  }
 },
 clear$0: function() {
  return this.$dom_clear$0();
 },
 remove$1: function(key) {
  var value = this.operator$index$1(key);
  this.$dom_removeItem$1(key);
  return value;
 },
 putIfAbsent$2: function(key, ifAbsent) {
  if (this.containsKey$1(key) !== true) {
    this.operator$indexSet$2(key, ifAbsent.$call$0());
  }
  return this.operator$index$1(key);
 },
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
 },
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
 },
 containsKey$1: function(key) {
  return !$.eqNullB(this.$dom_getItem$1(key));
 },
 is$Map: function() { return true; }
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'StyleSheet'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', ["width=", "height="], {
});

$.$defineNativeClass('HTMLTableColElement', ["width="], {
});

$.$defineNativeClass('HTMLTableElement', ["width="], {
});

$.$defineNativeClass('HTMLTextAreaElement', ["value=", "name?"], {
});

$.$defineNativeClass('TextMetrics', ["width?"], {
});

$.$defineNativeClass('TextTrack', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
},
 get$on: function() {
  return $._TextTrackEventsImpl$1(this);
 }
});

$.$defineNativeClass('TextTrackCue', ["text!"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
},
 get$on: function() {
  return $._TextTrackCueEventsImpl$1(this);
 }
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
},
 get$on: function() {
  return $._TextTrackListEventsImpl$1(this);
 }
});

$.$defineNativeClass('TimeRanges', ["length?"], {
});

$.$defineNativeClass('TouchList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Touch'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('UIEvent', ["keyCode?"], {
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', ["width=", "height="], {
});

$.$defineNativeClass('WebGLActiveInfo', ["name?"], {
});

$.$defineNativeClass('WebSocket', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
},
 get$on: function() {
  return $._WebSocketEventsImpl$1(this);
 }
});

$.$defineNativeClass('WheelEvent', ["offsetY?", "offsetX?"], {
});

$.$defineNativeClass('DOMWindow', ["window?", "name?", "length?", "innerWidth?", "innerHeight?"], {
 webkitRequestAnimationFrame$1: function(callback) {
  return this.webkitRequestAnimationFrame($.convertDartClosureToJS(callback));
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 postMessage$3: function(message, targetOrigin, messagePorts) {
  return this.postMessage(message,targetOrigin,messagePorts);
 },
 postMessage$2: function(message,targetOrigin) {
  return this.postMessage(message,targetOrigin);
},
 moveTo$2: function(x, y) {
  return this.moveTo(x,y);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.addEventListener(type,listener);
},
 get$on: function() {
  return $._WindowEventsImpl$1(this);
 },
 get$top: function() {
  return $._createSafe(this.get$_top());
 },
 get$_top: function() {
  return this.top;;
 }
});

$.$defineNativeClass('Worker', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 get$on: function() {
  return $._WorkerEventsImpl$1(this);
 }
});

$.$defineNativeClass('WorkerContext', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
},
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._WorkerContextEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
},
 get$on: function() {
  return $._XMLHttpRequestEventsImpl$1(this);
 }
});

$.$defineNativeClass('XMLHttpRequestException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$2: function(type,listener) {
  listener = $.convertDartClosureToJS(listener);
  return this.$dom_addEventListener(type,listener);
},
 get$on: function() {
  return $._XMLHttpRequestUploadEventsImpl$1(this);
 }
});

$.$defineNativeClass('XPathException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

// 201 dynamic classes.
// 343 classes
// 29 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement';
  var v2/*class(_UIEventImpl)*/ = 'UIEvent|WheelEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|KeyboardEvent|CompositionEvent';
  var v3/*class(_ElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,v1/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v4/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot';
  var v5/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument';
  var v6/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|Comment';
  var v7/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v8/*class(_NodeImpl)*/ = [v3/*class(_ElementImpl)*/,v4/*class(_DocumentFragmentImpl)*/,v5/*class(_DocumentImpl)*/,v6/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v9/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream';
  var v10/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBVersionChangeRequest';
  var v11/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['AbstractWorker', v11/*class(_AbstractWorkerImpl)*/],
    ['UIEvent', v2/*class(_UIEventImpl)*/],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray'],
    ['AudioParam', 'AudioParam|AudioGain'],
    ['WorkerContext', v7/*class(_WorkerContextImpl)*/],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CharacterData', v6/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v5/*class(_DocumentImpl)*/],
    ['DocumentFragment', v4/*class(_DocumentFragmentImpl)*/],
    ['HTMLMediaElement', v1/*class(_MediaElementImpl)*/],
    ['Element', v3/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Event', [v2/*class(_UIEventImpl)*/,'Event|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'].join('|')],
    ['Node', v8/*class(_NodeImpl)*/],
    ['MediaStream', v9/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v10/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v7/*class(_WorkerContextImpl)*/,v8/*class(_NodeImpl)*/,v9/*class(_MediaStreamImpl)*/,v10/*class(_IDBRequestImpl)*/,v11/*class(_AbstractWorkerImpl)*/,'EventTarget|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|PeerConnection00|Notification|MessagePort|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection'],
    ['NodeList', 'NodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

if (typeof window != 'undefined' && typeof document != 'undefined' &&
    window.addEventListener && document.readyState == 'loading') {
  window.addEventListener('DOMContentLoaded', function(e) {
    $.main();
  });
} else {
  $.main();
}
function init() {
  Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, superclass, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  Isolate.$isolateProperties[cls] = constructor;
  constructor.prototype = prototype;
  if (superclass !== "") {
    Isolate.$pendingClasses[cls] = superclass;
  }
};
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function() {
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (prototype.__proto__) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
