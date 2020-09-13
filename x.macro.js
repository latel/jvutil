const { createMacro } = require("babel-plugin-macros");
const t = require("@babel/types");
const { addNamed } = require("@babel/helper-module-imports");

const pkgName = '@jv/util';
module.exports = createMacro(mathMacro);

function getInitArguments(path) {
  const callExpression = path.findParent((p) => t.isCallExpression(p));
  return callExpression.node.arguments[0];
}

function mathMacro({ references, state, babel }) {
  console.log('>>>>>>');
  const path = references.default[0];
  const args = getInitArguments(path);

  const ADD = addNamed(path, "add", pkgName);
  const REDUCE = addNamed(path, "reduce", pkgName);
  const MUL = addNamed(path, "mul", pkgName);
  const DIV = addNamed(path, "div", pkgName);
  const MODULO = addNamed(path, "modulo", pkgName);

  function traverse(node) {
    let arg = [];
    if (node.left.type === "BinaryExpression") {
      arg[0] = traverse(node.left);
    } else {
      arg[0] = node.left;
    }

    if (node.right.type === "BinaryExpression") {
      arg[1] = traverse(node.right);
    } else {
      arg[1] = node.right;
    }

    let operator = "";
    switch (node.operator) {
      case "+":
        operator = ADD;
        break;
      case "-":
        operator = REDUCE;
        break;
      case "*":
        operator = MUL;
        break;
      case "/":
        operator = DIV;
        break;
      case "%":
        operator = MODULO;
        break;
    }

    return t.callExpression(operator, arg);
  }

  path.parentPath.replaceWith(traverse(args));
}
