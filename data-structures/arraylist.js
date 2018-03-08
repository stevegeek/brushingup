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

// This implementation follows a Java ArrayList like interface

// TODO: implementation which is array like (use proxies to allow array-like
// index referencing)?

// Note this implementation is *not* Array-like
class ArrayList {
  constructor(data = []) {
    // Pre allocate twice as much storage
    this._init(data);
  }

  /**
   * Push new item into array and expand as needed
   * @param v
   * @param index {number} optional point to insert at
   * @returns {ArrayList}
   */
  add(v, index) {
    const hasIndex = index !== undefined;
    if (hasIndex) {
      if (index > this.size) {
        throw new Error('Out of bounds error');
      }
    }

    this._insertValueAt({
      data: this.data,
      startIndex: hasIndex ? index : this.count,
      insertValue: v
    });
    return this;
  }

  /**
   * Remove item from list and shrink as needed
   * @param v
   */
  remove(v) {
    this._removeItem(v);
    return this
  }

  /**
   * Remove item from list and shrink as needed
   * @param v
   */
  removeAll(v) {
    this._removeItem(v, true);
    return this
  }

  /**
   * Remove item from list and shrink as needed
   * @param v
   */
  removeAt(index) {
    this._removeItemAt(index);
    return this
  }

  /**
   * Insert new item into from of array and expand as needed
   * @param v
   * @returns {ArrayList}
   */
  push(v) {
    return this.add(v, 0);
  }

  /**
   * Take item from front of array and shrink as needed
   */
  pop() {
    return this._removeItemAt(0);
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

  get length() {
    return this.count;
  }

  /**
   * Iterator for array
   * @returns {IterableIterator<*[]>}
   */
  *[Symbol.iterator]() {
    for (let i = 0; i < this.size; i++) {
      yield [this.get(i), i];
    }
  }

  toString() {
    return '[' + Array.prototype.map(this, (v, i) => `${v} (${i})`).join(', ') + ']';
  }

  // 'private'

  _init(data = []) {
    if (!data.length) {
      this.data = new Array(2);
      this.count = 0;
    } else {
      this._insertValueAt({
        data: data
      });
    }
  }

  // Insertions are amortized O(1) however on init and on resize need to perform
  // n copies
  _insertValueAt({data, startIndex = 0, endIndex, insertValue}) {
    console.debug(`- insert: value(s) at index ${startIndex}, ${endIndex}, ${insertValue}`);
    // If we have to expand since we are going to do a bunch of copying we just
    // insert new value in that loop O(n)
    if (endIndex || this.count === undefined || this.count === this.data.length) {
      // When shrinking we set an endIndex which is the point until which
      // the internal array is actually occupied, this is used to calc next
      // size to create. Otherwise its simply based on the size of the data
      const startSize = typeof endIndex === 'undefined' ? data.length : endIndex;
      this._createNewArray(data, startSize, startIndex, insertValue);
      return;
    }


    // shift array
    for (let i = this.size; i >= startIndex; i--) {
      this.data[i] = this.data[i - 1];
    }

    // ... otherwise we can just insert in O(1)
    this.count++;
    this.data[startIndex] = insertValue;
    console.debug(`- inserted (no expand): free slots remaining ${this.data.length - this.count}`);
  }

  // Generate a new array from given data and optional insert
  // O(n)
  _createNewArray(data, startSize, insertIndex, insertValue) {
    const firstFill = this.count === undefined;
    const hasInsert = typeof insertValue !== 'undefined';

    // If initialising first time, set count to data length, else if inserting
    // something on expand then increment count, else we are simply copying
    // data into a new array so count not changing
    if (firstFill) {
      this.count = data.length;
    } else if (hasInsert) {
      this.count++;
    }

    // Generate new sizes in powers of 2
    const newSize = this._sizeToNearestOfPowerOf2(startSize);

    console.debug(`- expand: new length ${newSize} and insert at ${insertIndex}`);

    const newArray = new Array(newSize);
    for (let i = 0; i < startSize + (hasInsert ? 1 : 0); i++) {
      if (hasInsert && i === insertIndex) {
        newArray[insertIndex] = insertValue;
      } else if (hasInsert && i < insertIndex) {
        newArray[i] = data[i];
      }
      newArray[i + (hasInsert ? 1 : 0)] = data[i];
    }
    this.data = newArray;
  }

  // O(n)
  _removeItem(item, all = false) {
    // TODO: if we do this we have to intially make a full size array, space
    // inefficient as we may end up removing everything, ideally we only setup
    // array of size needed... we could count by iterating over array before,
    // wouldnt change asymptotic run time but obv adds more work to save space
    const newArray = new Array(this.data.length);
    let found = 0;
    for (let i = 0; i < this.count; i++) {
      // If we have found 1 and are not removing all instances, or if not the item
      // then copy into new array in correct place
      if ((found > 0 && !all) || this.data[i] !== item) {
        newArray[i - found] = this.data[i];
      } else {
        // Otherwise we have an item match and should be removing it (either cause
        // its the first instance we see or because all is true)
        console.debug(`removeItem: removing at index ${i} , ${item}`);
        found++;
      }
    }
    this.data = newArray;
    this.count -= found;

    // Lastly shrink if needed
    this._shrink();
    return this;
  }

  // O(n)
  _removeItemAt(index) {
    this._checkBounds(index);
    const item = this.get(index);
    // Shift down data in array and reduce count
    for (let i = index; i < this.count - 1; i++) {
      this.data[i] = this.data[i + 1]; // goes out of bounds on last
    }
    this.count--;
    // Shrink if its time
    this._shrink();
    return item;
  }

  // Reduce size if necessary (essentially allocate a new smaller array in our case)
  _shrink() {
    if (this.count <= this.data.length / 4) {
      console.debug(`shrink: from ${this.data.length} as current count ${this.count}`);
      this._insertValueAt({
        data: this.data,
        startIndex: 0,
        endIndex: this.count
      })
    }
  }

  _sizeToNearestOfPowerOf2(s) {
    return 2 ** (Math.ceil(Math.log2(s)) + 1);
  }

  // Check if index in bounds
  _checkBounds(i, p) {
    if (i >= this.size) {
      throw new Error('Out of bounds error');
    }
    return p ? p(i) : true;
  }
}

module.exports = ArrayList;
