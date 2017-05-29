export default function ({ types: t }) {
  const optionalNodesTransformed = new WeakSet();
  const nilIdentifier = t.unaryExpression("void", t.numericLiteral(0));

  function setOptionalTransformed(node) {
    t.assertMemberExpression(node); // Dev
    optionalNodesTransformed.add(node);
  }

  function isOptionalTransformed(node) {
    t.assertMemberExpression(node); // Dev
    return optionalNodesTransformed.has(node);
  }

  function createCondition(ref, access, nextProperty, bailout) {

    return t.conditionalExpression(
      createCheckAgainstNull(
        t.AssignmentExpression("=", ref, access)
      ),

      t.memberExpression(ref, nextProperty),
      bailout,
    );
  }

  function createCheckAgainstNull(left) {
    return t.BinaryExpression("!=", left, t.NullLiteral());
  }

  function isNodeOptional(node) {
    return node.optional === true;
  }

  return {
    visitor: {

      AssignmentExpression(path, state) {
        const { left } = path.node;

        if (!isNodeOptional(left) || isOptionalTransformed(left)) {
          return;
        }

        if (!state.optionalTemp) {
          const id = path.scope.generateUidIdentifier();

          state.optionalTemp = id;
          path.scope.push({ id });
        }

        const { object, property } = left;

        const isChainNil = t.BinaryExpression(
          "!=",
          createCondition(
            state.optionalTemp,
            object,
            property,
            nilIdentifier,
          ),
          nilIdentifier,
        );

        // FIXME(sven): if will be a ConditionalExpression for childs, only top level will be ifStatement
        const replacement = t.ifStatement(isChainNil, t.blockStatement([t.expressionStatement(path.node)]));

        setOptionalTransformed(left);

        path.traverse({
          MemberExpression({ node }) {
            setOptionalTransformed(node);
          },
        });

        path.parentPath.replaceWith(replacement);
      },

      UnaryExpression(path, state) {
        const { operator, argument } = path.node;

        if (operator !== "delete") {
          return;
        }

        if (!isNodeOptional(argument) || isOptionalTransformed(argument)) {
          return;
        }

        if (!state.optionalTemp) {
          const id = path.scope.generateUidIdentifier();

          state.optionalTemp = id;
          path.scope.push({ id });
        }

        const { object, property } = argument;

        const isChainNil = t.BinaryExpression(
          "!=",
          createCondition(
            state.optionalTemp,
            object,
            property,
            nilIdentifier,
          ),
          nilIdentifier,
        );

        const replacement = t.ifStatement(isChainNil, t.blockStatement([t.expressionStatement(path.node)]));

        setOptionalTransformed(argument);

        path.parentPath.replaceWith(replacement);
      },

      MemberExpression(path, state) {
        if (!isNodeOptional(path.node) || isOptionalTransformed(path.node)) {
          return;
        }

        const { object, property } = path.node;

        if (!state.optionalTemp) {
          const id = path.scope.generateUidIdentifier();

          state.optionalTemp = id;
          path.scope.push({ id });
        }

        if (t.isAssignmentExpression(path.parent)) {
          return;
        } else if (t.isUnaryExpression(path.parent)) {
          return;
        } else if (t.isCallExpression(path.parent)) {

          const replacement = createCondition(
            state.optionalTemp,
            object,
            property,
            t.callExpression(t.identifier("Function"), []),
          );

          setOptionalTransformed(path.node);
          path.replaceWith(replacement);
        } else {

          const replacement = createCondition(
            state.optionalTemp,
            object,
            property,
            nilIdentifier,
          );

          setOptionalTransformed(path.node);
          path.replaceWith(replacement);
        }
      },
    },
  };
}
