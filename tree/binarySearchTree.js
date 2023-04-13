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

  find(value) {
    function getNode(value, root) {
      if (root === null) {
        return;
      }

      if (root.value === value) {
        return root;
      }

      if (root.value < value) {
        return getNode(value, root.right, root);
      } else {
        return getNode(value, root.left, root);
      }
    }

    return getNode(value, this.tree);
  }

  levelOrder() {
    if (this.tree === null) {
      return;
    }

    let order = [];
    order.push(this.tree);

    let result = [];

    while (order.length !== 0) {
      const current = order[0];
      result.push(current.value);

      if (current.left != null) {
        order.push(current.left);
      }
      if (current.right != null) {
        order.push(current.right);
      }

      order.shift();
    }

    return result;
  }

  preOrder() {
    const result = [];

    function printNodes(root) {
      if (root === null) {
        return;
      }

      result.push(root.value);

      printNodes(root.left);
      printNodes(root.right);
    }

    printNodes(this.tree);

    return result;
  }

  inOrder() {
    const result = [];

    function printNodes(root) {
      if (root === null) {
        return;
      }

      printNodes(root.left);
      result.push(root.value);
      printNodes(root.right);
    }

    printNodes(this.tree);

    return result;
  }

  postOrder() {
    const result = [];

    function printNodes(root) {
      if (root === null) {
        return;
      }

      printNodes(root.right);
      printNodes(root.left);
      result.push(root.value);
    }

    printNodes(this.tree);

    return result;
  }

  height() {
    function getHeight(root, height = 0) {
      if (root === null) {
        return height;
      }

      height++;

      const leftSideHeight = getHeight(root.left, height);
      const rightSideHeight = getHeight(root.right, height);

      if (leftSideHeight > height) {
        height = leftSideHeight;
      }
      if (rightSideHeight > height) {
        height = rightSideHeight;
      }

      return height;
    }

    return getHeight(this.tree);
  }

  depth(value) {
    function getDepth(root, value, depth = 0) {
      if (root === null) {
        return -1;
      }

      if (root.value === value) {
        return depth;
      }

      depth++;

      if (root.value < value) {
        return getDepth(root.right, value, depth++);
      } else {
        return getDepth(root.left, value, depth++);
      }
    }

    return getDepth(this.tree, value);
  }

  isBalanced() {
    function getHeightsOfNode(root, height = 0) {
      if (root === null) {
        return height;
      }

      height++;
      const leftHeight = getHeightsOfNode(root.left, height);
      const rightHeight = getHeightsOfNode(root.right, height);

      if (leftHeight > height) {
        height = leftHeight;
      }
      if (rightHeight > height) {
        height = rightHeight;
      }
      return height;
    }
    const left = getHeightsOfNode(this.tree.left);
    const right = getHeightsOfNode(this.tree.right);

    if (left === right || left + 1 === right || left - 1 === right) {
      return true;
    }
    return false;
  }

  rebalance() {
    const treeDat = this.inOrder();
    this.buildTree(treeDat);

    return this.tree;
  }
}

// Testing Purposes
const tree = new Tree();

function randomNumbers() {
  let arr = [];
  for (let index = 0; index < 20; index++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
}

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

tree.buildTree(randomNumbers());
prettyPrint(tree.getRoot());
/**
 * Example Data:
 *
 * │               ┌── 92
 * │           ┌── 88
 * │       ┌── 74
 * │       │   └── 71
 * │   ┌── 70
 * │   │   │   ┌── 68
 * │   │   └── 67
 * │   │       └── 65
 * └── 60
 *     │           ┌── 58
 *     │       ┌── 53
 *     │   ┌── 44
 *     │   │   └── 38
 *     └── 34
 *         │   ┌── 15
 *         └── 7
 *             └── 3
 */

console.log(tree.isBalanced());
/**
 * true
 */

console.log(`level order: ${tree.levelOrder()}`);
console.log(`pre order: ${tree.preOrder()}`);
console.log(`post order: ${tree.postOrder()}`);
console.log(`in order: ${tree.inOrder()}`);

/** Example output:
 *
 * level order: 59,25,80,5,38,70,90,1,8,28,47,68,72,82,91,12,52,78,87,92
 * pre order: 59,25,5,1,8,12,38,28,47,52,80,70,68,72,78,90,82,87,91,92
 * post order: 92,91,87,82,90,78,72,68,70,80,52,47,28,38,12,8,1,5,25,59
 * in order: 1,5,8,12,25,28,38,47,52,59,68,70,72,78,80,82,87,90,91,92
 */

tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);

console.log(tree.isBalanced());
/**
 * false
 */

tree.rebalance();
prettyPrint(tree.getRoot());
/** Example output:
 *
 * │               ┌── 104
 * │           ┌── 103
 * │           │   └── 102
 * │       ┌── 101
 * │       │   │   ┌── 94
 * │       │   └── 92
 * │   ┌── 88
 * │   │   │       ┌── 82
 * │   │   │   ┌── 80
 * │   │   └── 77
 * │   │       │   ┌── 76
 * │   │       └── 73
 * └── 72
 *     │           ┌── 69
 *     │       ┌── 61
 *     │   ┌── 59
 *     │   │   │   ┌── 56
 *     │   │   └── 50
 *     └── 42
 *         │       ┌── 29
 *         │   ┌── 25
 *         └── 12
 *             │   ┌── 5
 *             └── 0
 */

console.log(tree.isBalanced());
/**
 * true
 */

console.log(`level order: ${tree.levelOrder()}`);
console.log(`pre order: ${tree.preOrder()}`);
console.log(`post order: ${tree.postOrder()}`);
console.log(`in order: ${tree.inOrder()}`);
/**
 * level order: 65,34,93,26,55,90,102,7,29,43,56,68,91,95,103,12,33,45,61,72,92,101,104
 * pre order: 65,34,26,7,12,29,33,55,43,45,56,61,93,90,68,72,91,92,102,95,101,103,104
 * post order: 104,103,101,95,102,92,91,72,68,90,93,61,56,45,43,55,33,29,12,7,26,34,65
 * in order: 7,12,26,29,33,34,43,45,55,56,61,65,68,72,90,91,92,93,95,101,102,103,104
 */
