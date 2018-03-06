// A binary tree implementations, not balanced. The node provides
// the comparison function to determine value positioning in tree.
// Has implementations for common tree functions associated to binary trees
// http://www.cs.usfca.edu/~galles/visualization/BST.html
// https://www.geeksforgeeks.org/inorder-successor-in-binary-search-tree/

let nodeId = 0;

const NODE_LARGER_THAN = 1;
const NODE_SMALLER_THAN = -1;
const NODE_EQUAL = 0;

/**
 * A graph node, internal implementation detail in this tree, the node is not
 * exposed
 */
class Node {
  constructor(val, parent, kv = {}) {
    this.val = val;
    this.kv = kv;
    this.parent = parent;
    this.id = nodeId++;
  }

  addLeft(n) {
    this.left = n;
    if (n) {
      n.parent = this;
    }
  }

  addRight(n) {
    this.right = n;
    if (n) {
      n.parent = this;
    }
  }

  compare(x) {
    if (x < this.val) {
      return NODE_LARGER_THAN;
    } else if (x > this.val) {
      return NODE_SMALLER_THAN;
    }
    return NODE_EQUAL;
  }

  toString() {
    const edges = [this.left, this.right].map((n, i) => {
      return `\t| ${i ? 'right' : 'left'}${n ? `${n.toString().replace(/(\r\n|\r|\n)/gm, '\n\t')}` : '~'}`;
    }).join('\n');
    return `\nNode(${this.id}, val: ${this.val}, ${JSON.stringify(this.kv)})\n${edges}`;
  }
}

/**
 * The tree structure for an unbalanced binary tree
 */
class BinaryTree {
  constructor(root) {
    this.root = root;
  }

  // depth first traversal of tree
  // TODO: should this be another type of traversal?
  *[Symbol.iterator]() {
    let depth = 0;
    function *step(currentNode, d) {
      if (!currentNode) return;
      yield {n: currentNode, d};
      if (currentNode.left || currentNode.right) {
        yield *step(currentNode.left, d + 1);
        yield *step(currentNode.right, d + 1);
      }
    }

    const iterator = step(this.root, depth);
    let s = iterator.next();
    while (!s.done) {
      yield s.value;
      s = iterator.next();
    }
  }

  mapDepthFirst(p = n => n) {
    const r = [];
    for (const {n, d} of this) {
      r.push(p(n.val, n.id, d));
    }
    return r;
    // return Array.prototype.map.bind(this)(p);  // needs item, index pair
  }

  // Maximum path - traverse tree and keep count
  get height() {
    let maxD = 0;
    this.mapDepthFirst((v, id, d) => {
      if (d > maxD) {
        maxD = d;
      }
    });
    return maxD;
  }

  /**
   * Inorder successor. This is the node which is either the smallest value
   * in the right subtree of the target node, else its the node which is the parent
   * of a given node in the parent path wihch is the left child of its parent
   *     10
   *    /
   *   8
   *    \
   *     9
   *
   * Ie here successor 9 is 10 cause up its parent path node with '8' is the left
   * child of 10
   *
   * Complexity is order height of tree
   *
   * @param v
   */
  successor(v) {
    const s = this._successor(v);
    return s && s.val;
  }

  /**
   * Predecessor is basically the opposite of successor
   * @param v
   * @returns {*}
   */
  predecessor(v) {
    const p = this._predecessor(v);
    return p && p.val;
  }

  /**
   * Insert new value into tree
   * @param v
   */
  insert(v) {
    if (!this.root) {
      this.root = new Node(v);
      return this.root;
    }
    return this._find(
      this.root,
      v,
      (n) => n,
      (n, v) => {
        // insert to left
        n.addLeft(new Node(v, n));
        return n.left;
      },
      (n, v) => {
        // insert to right
        n.addRight(new Node(v, n));
        return n.right;
      }
    );
  }

  /**
   * Remove node from tree. If there is only one child, easy, just move parents pointer
   * accordingly.
   *
   * if there are 2 children, its clear looking at a graph that you need to find
   * the inorder successor, then attach the node left to its left, and the node
   * right to parent
   * @param v
   */
  remove(v) {
    return this._find(this.root, v, (n) => {
      if (!n) {
        return false;
      }
      if (!n.right && !n.left) {
        if (n.parent.left === n) {
          n.parent.addLeft();
        } else {
          n.parent.addRight();
        }
        return true;
      }
      if (n.right && !n.left) {
        if (n.parent.left === n) {
          n.parent.addLeft(n.right);
        } else {
          n.parent.addRight(n.right);
        }
        return true;
      }
      if (!n.right && n.left) {
        if (n.parent.left === n) {
          n.parent.addLeft(n.left);
        } else {
          n.parent.addRight(n.left);
        }
        return true
      }
      const succ = this._successor(n.val);
      if (succ) {
        succ.addLeft(n.left);
        if (n.parent) {
          n.parent.addLeft(n.right);
        } else {
          // At root so rewire it
          delete succ.parent;
          this.root = succ;
        }
        return true;
      }

      delete this.root;
      return true;
    });
  }

  /**
   * Check if contains value v
   */
  contains(v) {
    return !!this._find(this.root, v);
  }

  toString() {
    return this.root.toString();
  }

  // 'private'

  // recursive find
  _find(curNode, v, found = n => n, notFoundLeft = () => undefined, notFoundRight = () => undefined) {
    const d = curNode.compare(v);
    if (d === NODE_SMALLER_THAN) {
      // go right
      if (curNode.right) {
        return this._find(curNode.right, v, found, notFoundLeft, notFoundRight);
      }
      return notFoundRight(curNode, v);
    } else if (d === NODE_LARGER_THAN) {
      // go left
      if (curNode.left) {
        return this._find(curNode.left, v, found, notFoundLeft, notFoundRight);
      }
      return notFoundLeft(curNode, v);
    }
    // else found it, exists
    return found(curNode);
  }

  _findMinInSubTree(curNode) {
    if (!curNode) {
      return;
    }
    if (curNode.left) {
      return this._findMinInSubTree(curNode.left);
    }
    return curNode;
  }

  _findMaxInSubTree(curNode) {
    if (!curNode) {
      return;
    }
    if (curNode.right) {
      return this._findMaxInSubTree(curNode.right);
    }
    return curNode;
  }

  _successor(v) {
    return this._find(this.root, v, (n) => {
      const backUp = (p) => {
        if (!p.parent) {
          return;
        }
        // The successor node is the parent of the current node if its a left child
        if (p.parent.left === p) {
          return p.parent;
        }
        return backUp(p.parent);
      };

      if (n.right) {
        return this._findMinInSubTree(n.right);
      }
      // traverse back up looking left
      return backUp(n);
    });
  }

  _predecessor(v) {
    return this._find(this.root, v, (n) => {
      const backUp = (p) => {
        if (!p.parent) {
          return;
        }
        // The predecessor node is the parent of the current node if its a right child
        if (p.parent.right === p) {
          return p.parent;
        }
        return backUp(p.parent);
      };

      if (n.left) {
        return this._findMaxInSubTree(n.left);
      }
      return backUp(n);
    });
  }
}

module.exports = {
  Node,
  BinaryTree
};
