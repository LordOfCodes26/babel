import * as t from "babel-types";

export function _params(node: Object) {
  this.print(node.typeParameters, node);
  this.token("(");
  this.printList(node.params, node, {
    iterator: (node) => {
      if (node.optional) this.token("?");
      this.print(node.typeAnnotation, node);
    }
  });
  this.token(")");

  if (node.returnType) {
    this.print(node.returnType, node);
  }
}

export function _method(node: Object) {
  let kind = node.kind;
  let key  = node.key;

  if (kind === "method" || kind === "init") {
    if (node.generator) {
      this.token("*");
    }
  }

  if (kind === "get" || kind === "set") {
    this.word(kind);
    this.push(" ");
  }

  if (node.async) {
    this.word("async");
    this.push(" ");
  }

  if (node.computed) {
    this.token("[");
    this.print(key, node);
    this.token("]");
  } else {
    this.print(key, node);
  }

  this._params(node);
  this.space();
  this.print(node.body, node);
}

export function FunctionExpression(node: Object) {
  if (node.async) {
    this.word("async");
    this.push(" ");
  }
  this.word("function");
  if (node.generator) this.token("*");

  if (node.id) {
    this.push(" ");
    this.print(node.id, node);
  } else {
    this.space();
  }

  this._params(node);
  this.space();
  this.print(node.body, node);
}

export { FunctionExpression as FunctionDeclaration };

export function ArrowFunctionExpression(node: Object) {
  if (node.async) {
    this.word("async");
    this.push(" ");
  }

  if (node.params.length === 1 && t.isIdentifier(node.params[0])) {
    this.print(node.params[0], node);
  } else {
    this._params(node);
  }

  this.push(" ");
  this.token("=>");
  this.push(" ");

  this.print(node.body, node);
}
