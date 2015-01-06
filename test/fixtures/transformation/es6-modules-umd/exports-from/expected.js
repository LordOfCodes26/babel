(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"));
  }
})(function (exports, _foo) {
  "use strict";

  var _interopRequire = function (obj) {
    return obj && (obj["default"] || obj);
  };

  var _interopRequireWildcard = function (obj) {
    return obj && obj.constructor === Object ? obj : {
      "default": obj
    };
  };

  var _exportsWildcard = function (obj) {
    for (var i in obj) {
      if (exports[i] !== undefined) {
        exports[i] = obj[i];
      }
    }
  };

  _exportsWildcard(_interopRequireWildcard(_foo));

  exports.foo = _interopRequire(_foo);
  exports.foo = _interopRequire(_foo);
  exports.bar = _interopRequire(_foo);
  exports.bar = _interopRequire(_foo);
  exports["default"] = _interopRequire(_foo);
  exports["default"] = _interopRequire(_foo);
  exports.bar = _interopRequire(_foo);
});