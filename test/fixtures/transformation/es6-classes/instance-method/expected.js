"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var Test = (function () {
  function Test() {}

  _prototypeProperties(Test, null, {
    test: {
      value: function test() {
        return 5 + 5;
      },
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  return Test;
})();