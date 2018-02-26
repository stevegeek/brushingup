// Structure contains a allocated non-holey array that grows like ArrayList etc
// Not useful in javascript since javascript arrays already
// do this internally.
// see https://vimeo.com/254852822

// Array lists provide O(1) amortized insertion time and random access O(1)
// (When a growth is required every m * 2 + 1 insertions then a copy of O(m)
// is required. Thus number of copies required for length n is:
// n /2 + n / 4 ... + 1 = n. Thus n insertions + n copies = 2n operations
// So n insertions takes O(2n) time, then per insertion the amortized time is
// O(2n) / n = O(n) / n = O(1)

// Note: in above analysis we assume creating the new array is O(1). In some
// cases you need to factor in initialising it as O(n)


// TODO: implementation which is array like (use proxies to allow array-like
// index referencing)?

// Note this implementation is *not* Array-like
class ArrayList {
  constructor(data = []) {
    // Pre allocate twice as much storage
    if (!data.length) {
      this.data = new Array(1);
    } else {
      this.data = this._expand(data);
    }
    this.count = Math.floor(this.data.length / 2);
  }

  /**
   * Push new item into array
   * @param v
   * @returns {ArrayList}
   */
  push(v) {
    if (this.data.length === this.count) {
      this.data = this._expand(this.data);
    }
    console.debug(`- push: free slots remaining ${this.data.length - this.count}`);
    this.data[this.count++] = v;
    return this;
  }

  /**
   * Set value at given index with bounds check (throws Error if out of bounds)
   * @param i index
   * @param v value
   * @throws Error
   * @returns {ArrayList} reference to list
   */
  set(i, v) {
    this._checkBounds(i, () => this.data[i] = v);
    return this;
  }

  /**
   * Get value at index with bounds check (throws Error if out of bounds)
   * @param i index
   * @throws Error
   * @returns {*} value at index
   */
  get(i) {
    return this._checkBounds(i, () => this.data[i]);
  }

  /**
   * The size of the ArrayList
   * @returns {number}
   */
  get size() {
    return this.count;
  }

  // 'private'

  _expand(startData) {
    console.debug(`- expand: new length ${startData.length * 2}`);
    return startData.reduce((arr, v, i) => {
      arr[i] = v;
      return arr;
    }, new Array(startData.length * 2));
  }

  _checkBounds(i, p) {
    if (i >= this.size) {
      throw new Error('Out of bounds error');
    }
    return p(i);
  }
}

module.exports = ArrayList;
