let g =
/*#__PURE__*/
(() => {
  var _ref = babelHelpers.wrapAsyncGenerator(function* () {
    var _this = this;

    () => this;

    function f() {
      () => this;
    }

    /*#__PURE__*/
    babelHelpers.asyncToGenerator(function* () {
      _this;
      yield 1;
    });
    yield babelHelpers.awaitAsyncGenerator(1);
  });

  return function g() {
    return _ref.apply(this, arguments);
  };
})();
