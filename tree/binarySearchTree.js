import {Node} from "./node.js";

class Tree {
  constructor(tree = null) {
    this.tree = tree;
  }

  buildTree(array) {
    console.log(array);
  }
}

// Testing Purposes
const tree = new Tree();
tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
