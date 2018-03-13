// Implementation of a simple singly linked list without a tail reference.
// Implemented in a slightly over-kill manner just to experiment with various
// methods etc

/**
 * Single cell of the list
 * @property val {*} value of cell
 * @property next {object?} next cell
 */
class Cons {
  constructor(v, kv) {
    this.val = v;
    this.kv = kv;
  }

  /**
   * Set reference to next cell
   * @param next
   */
  connect(next) {
    this.next = next;
  }

  toString() {
    return `Cons(${this.val}, ${this.next ? this.next.toString() : '~'})`;
  }
}

/**
 * Singly linked list
 */
class List {
  /**
   * Construct from initial values
   * @param values
   */
  constructor(values = []) {
    this.length = 0;
    values.forEach((v) => {
      this.append(v);
    });
    // Ensure if you concat() a list it actually spreads like [...list] and thus
    // is flattened
    this[Symbol.isConcatSpreadable] = true;
  }

  /**
   * Provide an iterator for the list using a generator to yield successive cons
   * cells
   */
  *[Symbol.iterator]() {
    let i = 0;
    let c = this.head;
    do {
      yield [c, i++];
    } while(c && (c = c.next))
  }

  /**
   * Provide an implementation of map, though we could delegate to Array.prototype.map
   * instead since we have implemented the iterator
   * @param p
   * @returns {Array}
   */
  map(p) {
    const r = [];
    for (const [c, i] of this) {
      r.push(p(c.val, i));
    }
    return r; // return Array.prototype.map.bind(this)(p);
  }

  forEach(p) { this.map(p); }

  /**
   * Find a value in the list -- O(n)
   * @param needle
   * @returns {*}
   */
  find(needle) {
    for (const [c, i] of this) {
      if (!c) continue;
      if (c.val === needle) {
        return c;
      }
    }
  }

  /**
   * Append a new cell O(n) in singly linked list with no tail reference
   * @param v
   * @param kv {*} optional bag of kvs to store with v
   * @returns {Cons|*}
   */
  append(v, kv) {
    if (typeof v === 'undefined') return;
    const cell = new Cons(v, kv);
    this.length++;
    if (!this.head){
      this.head = cell;
      return this.head;
    }
    this._lastCell.connect(cell);
    return cell;
  }

  /**
   * First item value O(1)
   * @returns {Cons|*}
   */
  get first() {
    return this.head && this.head.val;
  }

  /**
   * Last item value; no tail reference means O(n)
   * @returns {Cons|*}
   */
  get last() {
    const c = this._lastCell;
    return c && c.val;
  }

  /**
   * Remove items with value 'v'. O(n)
   * @param v
   */
  remove(v) {
    let curr = this.head;
    let prev;
    while (curr) {
      const next = curr && curr.next;
      if (curr.val === v) {
        if (curr === this.head) {
          this.head = next;
        } else {
          prev.next = next;
        }
        this.length--;
      }
      prev = curr;
      curr = next;
    }
  }

  toString() {
    return this.head.toString();
  }

  // private

  get _lastCell() {
    for (const [c, i] of this) {
      if (c && !c.next) {
        return c;
      }
    }
  }

}

module.exports = List;