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

  /**
   * Inserts a value at the leaf of the arleady defined tree.
   * @param {*} value the value to be inserted to the leaf of the tree
   */
  insert(value) {
    function setLocation(target, root) {
      if (root.value === target) {
        return;
      }

      //   Checks if the root is greater/ less than target, and a null check.
      if (root.value < target) {
        if (root.right === null) {
          root.right = new Node(target);
        } else {
          setLocation(target, root.right);
        }
      }
      if (root.value > target) {
        if (root.left === null) {
          root.left = new Node(target);
        } else {
          setLocation(target, root.left);
        }
      }
    }

    // Check if tree is empty
    if (this.tree === null) {
      this.tree = new Node(value);
      return;
    }

    setLocation(value, this.tree);
  }

  delete(value) {
    function getNode(value, root, parent) {
      // if reached the end of tree
      if (root === null) {
        return null;
      }

      // if value is found return the node
      if (root.value === value) {
        if (parent === undefined) {
          return root;
        } else {
          return parent;
        }
      }

      // recursively call until less than or greater than
      if (root.value < value) {
        return getNode(value, root.right, root);
      } else {
        return getNode(value, root.left, root);
      }
    }

    function getLeftMostNode(root, parent) {
      if (root.left === null) {
        return [root, parent];
      }

      return getLeftMostNode(root.left, root);
    }

    if (this.tree === null) {
      return;
    }

    let parent = getNode(value, this.tree);

    if (parent === null) {
      return;
    }

    let node;
    let isRight;
    if (parent.value > value) {
      node = parent.left;
      isRight = false;
    } else if (parent.value < value) {
      node = parent.right;
      isRight = true;
    } else {
      node = parent;
    }

    // Check if the node has no children.
    if (node.left === null && node.right === null) {
      if (isRight === true) {
        parent.right = null;
      } else {
        parent.left = null;
      }
      return;
    }

    // XOR if either left or right is null
    if ((node.left === null) ^ (node.right === null)) {
      let child;
      if (node.left != null) {
        child = node.left;
      } else {
        child = node.right;
      }

      if (isRight === true) {
        parent.right = child;
      } else {
        parent.left = child;
      }
      return;
    }

    const replacedNodeData = getLeftMostNode(node.right, node);

    const replacedNode = replacedNodeData[0];
    const replacedNodeParent = replacedNodeData[1];

    if (replacedNodeParent === node) {
      replacedNodeParent.right = replacedNode.right;
    } else {
      replacedNodeParent.left = replacedNode.right;
    }
    node.value = replacedNode.value;
  }
}

// Testing Purposes
const tree = new Tree();
tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.insert(9);

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

tree.delete(4);
tree.delete(8);
prettyPrint(tree.getRoot());
