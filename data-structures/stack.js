// A stack based on a singly linked list.

class Node {
  constructor(val, next) {
    this.val = val;
    this.next = next;
  }
}

class Stack {
  /**
   * Add value to stack
   * @param v
   */
  push(v) {
    this.head = new Node(v, this.head);
  }

  /**
   * Pop off one value
   * @returns {*}
   */
  pop() {
    if (this.head) {
      const v = this.head.val;
      this.head = this.head.next;
      return v;
    }
  }

  /**
   * Peek top value
   * @returns {Node|*}
   */
  peek() {
    return this.head && this.head.val;
  }

  /**
   * Clear the stack by releasing its head reference
   */
  clear() {
    this.head = undefined;
  }
}

module.exports = Stack;
