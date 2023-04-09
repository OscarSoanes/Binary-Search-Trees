import {Node} from "./node.js";

class Tree {
  constructor(tree = null) {
    this.tree = tree;
  }

  /**
   * Builds a tree from a defined Array
   * @param {Array} array the data to be converted to a Tree
   */
  buildTree(array) {
    /**
     * Converts the array to a Tree, via the Node class.
     * @param {Array} array the array to set as a Tree
     * @param {Number} start the starting index of the array
     * @param {Number} end the ending index of the array
     * @returns
     */
    function createNode(array, start, end) {
      // stops if start is bigger than end
      if (start > end) {
        return null;
      }

      const mid = Math.floor((start + end) / 2);
      let node = new Node(array[mid]);

      // sets left most side first, then right side
      node.setLeft(createNode(array, start, mid - 1));
      node.setRight(createNode(array, mid + 1, end));
      return node;
    }

    // Sorting the array, and reducing duplicates from array
    array = array.sort((a, b) => a - b);
    array = [...new Set(array)];
    this.tree = createNode(array, 0, array.length - 1);
  }

  getRoot() {
    return this.tree;
  }
}

// Testing Purposes
const tree = new Tree();
tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(tree.getRoot());
