export class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  /**
   * Sets the left side of the current Node
   * @param {any} node the Node to be set
   */
  set left(node) {
    this.left = node;
  }

  /**
   * Sets the right side of the current Node
   * @param {any} node the Node to be set
   */
  set right(node) {
    this.right = node;
  }
}
