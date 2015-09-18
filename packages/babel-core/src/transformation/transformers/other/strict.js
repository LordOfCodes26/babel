import * as t from "babel-types";

export let metadata = {
  group: "builtin-pre"
};

const THIS_BREAK_KEYS = ["FunctionExpression", "FunctionDeclaration", "ClassProperty"];

function isUseStrict(node) {
  if (!t.isLiteral(node)) return false;

  if (node.raw && node.rawValue === node.value) {
    return node.rawValue === "use strict";
  } else {
    return node.value === "use strict";
  }
}

export let visitor = {
  Program: {
    enter(program) {
      let first = program.body[0];

      let directive;
      if (t.isExpressionStatement(first) && isUseStrict(first.expression)) {
        directive = first;
      } else {
        directive = t.expressionStatement(t.stringLiteral("use strict"));
        this.unshiftContainer("body", directive);
        if (first) {
          directive.leadingComments = first.leadingComments;
          first.leadingComments = [];
        }
      }
      directive._blockHoist = Infinity;
    }
  },

  ThisExpression() {
    if (!this.findParent((path) => !path.is("shadow") && THIS_BREAK_KEYS.indexOf(path.type) >= 0)) {
      return this.scope.buildUndefinedNode();
    }
  }
};
