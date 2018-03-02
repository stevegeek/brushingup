// A simple queue

class Node {
  constructor(val) {
    this.val = val;
  }

  addNext(n) {
    this.next = n;
  }
}

class Queue {
  add(v) {
    const n = new Node(v);
    if (this.tail) {
      this.tail.addNext(n);
    }
    this.tail = n;

    if (!this.head) {
      this.head = n;
    }
  }

  remove() {
    const n = this.head;
    this.head = n && n.next;
    if (!this.head) {
      this.tail = undefined;
    }
    return n && n.val;
  }

  isEmpty() {
    return this.head === undefined;
  }

  clear() {
    this.head = undefined;
    this.tail = undefined;
  }

  peek() {
    return this.head && this.head.val;
  }
}

module.exports = Queue;
