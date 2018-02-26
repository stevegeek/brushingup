// Implementation of a simple double linked list with a tail reference.
// Implemented in a slightly over-kill manner just to experiment with various
// methods etc

/**
 * Single cell of the list
 * @property val {*} value of cell
 * @property next {object?} next cell
 */
class Cons {
  constructor(v, next) {
    this.val = v;
    if (next) {
      this.connect(next);
    }
  }

  /**
   * Set reference to next cell
   * @param next
   */
  connect(next) {
    next.prev = this;
    this.next = next;
  }

  toString() {
    return `Cons(${this.val}, ${this.next ? this.next.toString() : '~'})`;
  }
}

/**
 * Linked list
 */
class List {
  /**
   * Construct from initial values
   * @param values
   */
  constructor(values = []) {
    this._length = 0;
    values.forEach((v) => {
      this.append(v);
    });
  }

  get length() {
    return this._length;
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
    } while(c && (c = c.next));
  }

  /**
   * A reverse iterator
   */
  *down() {
    let i = this.length;
    let c = this.tail;
    do {
      yield [c, --i];
    } while(c && (c = c.prev));
  }

  /**
   * Delegate to array
   * @param p
   * @returns {Array}
   */
  map(p) {
    return Array.prototype.map.bind(this)(p);
  }

  forEach(p) { this.map(p); }

  /**
   * Reduce list with callback p, from left
   * @param p
   * @param init
   * @returns {*}
   */
  reduce(p, init) {
    let acc = init;
    for (const [c, i] of this) {
      if (typeof acc === 'undefined') {
        acc = c.val;
        continue;
      }
      acc = p(acc, c.val, i);
    }
    return acc;
  }

  /**
   * Reduce list with callback p, from right
   * @param p
   * @param init
   * @returns {*}
   */
  reduceRight(p, init) {
    let acc = init;
    const iterator = this.down();
    if (typeof init === 'undefined') {
      const c = iterator.next();
      acc = c && c.value && c.value[0].val;
    }
    for (const [c, i] of iterator) {
      acc = p(acc, c.val, i);
    }
    return acc;
  }

  /**
   * Append a new cell O(1)
   * @param v
   * @returns {Cons|*}
   */
  append(v) {
    if (typeof v === 'undefined') return;
    const cell = new Cons(v);
    if (!this.head){
      this.head = cell;
    } else {
      this.tail.connect(cell);
    }
    this._length++;
    this.tail = cell;
  }

  /**
   * Prepend a new cell O(1)
   * @param v
   * @returns {Cons|*}
   */
  prepend(v) {
    const cell = new Cons(v);
    if(!this.tail) {
      this.tail = cell;
    }
    cell.connect(this.head);
    this._length++;
    this.head = cell;
  }

  /**
   * First item value O(1)
   * @returns {*}
   */
  get first() {
    return this.head && this.head.val;
  }

  /**
   * Last item value; O(1)
   * @returns {*}
   */
  get last() {
    return this.tail && this.tail.val;
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
        if (curr === this.tail) {
          this.tail = prev;
        }
        if (curr === this.head) {
          this.head = next;
          next && (next.prev = prev);
        } else {
          prev.next = next;
          next && (next.prev = prev);
        }
        this._length--;
      }
      prev = curr;
      curr = next;
    }
  }

  toString() {
    return this.head.toString();
  }
}

module.exports = List;