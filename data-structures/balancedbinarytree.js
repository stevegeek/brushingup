// A binary tree implementation which is balanced. (AVL tree) The node provides
// the comparison function to determine value positioning in tree.
// Has implementations for common tree functions associated to binary trees

// http://www.cs.usfca.edu/~galles/visualization/AVLtree.html

const {Node, BinaryTree} = require('./binarytree');

class AVLNode extends Node {
  constructor(...opt) {
    super(...opt);
    this.height = 1;
  }

  toString() {
    return super.toString().replace(' val:', ` h:${this.height}, val:`);
  }
}

/**
 * The tree structure for a balanced binary tree
 */
class AVL extends BinaryTree {
  constructor(...params) {
    super(...params);
  }

  /**
   * Insert new value into tree
   * @param v
   */
  insert(v) {
    if (!this.root) {
      this.root = new AVLNode(v);
      return this.root;
    }
    return this._find(
      this.root,
      v,
      (n) => n,
      (n, v) => {
        // insert to left
        n.addLeft(new AVLNode(v, n));
        this._rebalance(n, n.left);
        return n.left;
      },
      (n, v) => {
        // insert to right
        n.addRight(new AVLNode(v, n));
        this._rebalance(n, n.right);
        return n.right;
      }
    );
  }

  // Rebalance AVL tree
  _rebalance(curNode, child, grandChild) {
    if (!curNode) {
      return;
    }

    // Update height of node
    if (curNode.height <= child.height) {
      curNode.height++;
    }

    // check if left -> right have > 1 difference in height
    const hLeft = curNode.left ? curNode.left.height : 0;
    const hRight = curNode.right ? curNode.right.height : 0;
    const diff = Math.abs(hLeft - hRight);
    if (diff > 1) {
      // rebalance
      curNode.height -= 2;

      // Left Left Case:  Right Rotate (root)
      // Left Right Case: Left Rotate (child) then Right Rotate(root)
      // Right Right Case: Left Rotate(root)
      // Right Left Case: Right Rotate (child) Left Rotate(root)
      if (curNode.left === child && child.left === grandChild) {
        // grandchild for next parent is current granchild
        curNode = this._rightRotation(curNode);
      } else if (curNode.left === child && child.right === grandChild) {
        // grandchild for next parent is current child
        grandChild = child;
        this._leftRotation(child);
        curNode = this._rightRotation(curNode);
      } else if (curNode.right === child && child.right === grandChild) {
        // grandchild for next parent is current granchild
        curNode = this._leftRotation(curNode);
      } else if (curNode.right === child && child.left === grandChild) {
        // grandchild for next parent is current child
        grandChild = child;
        this._rightRotation(child);
        curNode = this._leftRotation(curNode);
      }
    } else {
      // grandchild in chain when no rebalancing is prev child
      grandChild = child;
    }
    return this._rebalance(curNode.parent, curNode, grandChild);
  }

  // Perform subtree right rotation
  _rightRotation(subTreeRoot) {
    const newRoot = subTreeRoot.left;
    if (subTreeRoot.parent) {
      if (subTreeRoot.parent.left === subTreeRoot) {
        subTreeRoot.parent.addLeft(newRoot);
      } else {
        subTreeRoot.parent.addRight(newRoot);
      }
    } else {
      this._setRoot(newRoot);
    }
    const rh = newRoot.right;
    newRoot.addRight(subTreeRoot);
    subTreeRoot.addLeft(rh);
    return newRoot;
  }

  // PErform subtree right rotation
  _leftRotation(subTreeRoot) {
    const newRoot = subTreeRoot.right;
    if (subTreeRoot.parent) {
      if (subTreeRoot.parent.left === subTreeRoot) {
        subTreeRoot.parent.addLeft(newRoot);
      } else {
        subTreeRoot.parent.addRight(newRoot);
      }
    } else {
      this._setRoot(newRoot);
    }
    const lh = newRoot.left;
    newRoot.addLeft(subTreeRoot);
    subTreeRoot.addRight(lh);
    return newRoot;
  }
}

module.exports = {
  AVLNode,
  AVL
};
