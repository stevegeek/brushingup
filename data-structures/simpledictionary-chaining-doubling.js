// A dictionary, with 'prehashing' function to map other
// key types to integer keys , where hash is unique to item

// 'Hashing' (reducing the key space) by simple method, should ideally map space S
// of all Ks to O(m) where m is the number of hash slots

// Think about collisions, solve with chaining (linked list chaining) worst case O(n)
// but only in worst case

// https://www.youtube.com/watch?v=0M_kIqhwbFo&list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb&index=8

// Hash methods, for each output collisions + longest chain of collisions:
// - division: key % m
// - multiplication: (a x key) % 2^w >> (w - r) where w is word size, a is random and odd (not close to a power of 2)
//   and r is the number of most significant bits to keep of least sig resulting word after the mulitplcation
// then m = 2 ^ r
// - universal hashing: [(a x key + b) mod p] mod m where a and b are random between 0 and p - 1,
// and p is a prime number much larger than the size of the key space  (after mod m
// brings number back into size m slots)

// Growing the table when the number items n > slots m (load factor > 1)
// , allocate new slots (doubling) and then copy everything and rehash keys

const LinkedList = require('./singlylinkedlist');

const STANFORD106B = Symbol.for('Stanford');
const MULTIPLICATIVE = Symbol.for('Multiplicative_hashing');

/**
 * Abstract parent dictionary class
 */
class Dictionary {
  constructor(initialSize = 64) {
    this.data = Array(initialSize);
  }

  /**
   * Find value for given key, amortized O(1) assuming well fitting hash function
   * In worst case if everything was in 1 bucket it would be O(n) due to need to
   * traverse linked list
   * @param k
   * @param mode {Symbol|undefined} optional hashing strategy
   * @returns {*}
   */
  find(k, mode) {
    const mappedKey = this._hash(k, mode);
    if (this.data[mappedKey]) {
      const node = this.data[mappedKey].find(k);
      if (node) {
        return node.kv.val;
      }
    }
  }

  /**
   * Insert new item into table, use chaining to handle collisions. If Item
   * exists overwrite it
   * @param k {string} key
   * @param v {*} value to store
   * @param mode {Symbol|undefined} optional hashing strategy
   */
  insert(k, v, mode) {
    const mappedKey = this._hash(k, mode);
    if (!this.data[mappedKey]) {
      this.data[mappedKey] = new LinkedList();
    }
    const existing = this.data[mappedKey].find(k);
    if (existing) {
      return existing.kv = {val: v};
    }
    this.data[mappedKey].append(k, {val: v});
  }

  /**
   * Remove key from table
   * @param mode {Symbol} optional hashing strategy
   * @param k
   */
  remove(k, mode) {
    const mappedKey = this._hash(k, mode);
    if (this.data[mappedKey]) {
      this.data[mappedKey].remove(k);
    }
  }
}

/**
 * Table with numeric keys
 */
class DictionaryNumericKey extends Dictionary {
  constructor(initialSize = 64) {
    super(initialSize);
  }

  // 'private'

  // Hash k using a given strategy
  _hash(k, mode = MULTIPLICATIVE) {
    const m = this.data.length;
    switch(mode) {
      case MULTIPLICATIVE:
        return this._hashKnuth(k, m);
    }
  }

  // or as per MIT 6.006 multiplication hashing - Also see Knuths version below as implementation of this
  // (a x key) % 2^w >> (w - r) where w is word size, a is random and odd (not close to a power of 2)
  //   and r is the number of most significant bits to keep of least sig resulting word after the mulitplcation
  // then m = 2 ^ r
  // Also see https://en.wikipedia.org/wiki/Hash_function#Multiplicative_hashing

  // Knuth's multiplicative hash
  // Also http://www.cs.cornell.edu/courses/cs3110/2008fa/lectures/lec21.html
  // Since 2654435761 and 2^32 have no common factors (this number is the
  // golden ratio of 2^32
  _hashKnuth(k, m) {
    const p = Math.log2(m);
    const knuth = 2654435761;
    return ((k * knuth) >>> (32 - p));
  }
}

/**
 * Table with string keys
 */
class DictionaryStringKey extends Dictionary {
  constructor(initialSize = 64) {
    super(initialSize);
  }

  _hash(k, mode = STANFORD106B) {
    const m = this.data.length;
    switch(mode) {
      default:
        return this._hashStanford(k, m);
    }
  }

  // String hashing 0 assuming 32bit wide words
  // https://web.stanford.edu/class/archive/cs/cs106b/cs106b.1164/handouts/8-Hashing.pdf
  // Generate a hashed value from k which will be in a unbounded range
  _prehashStanford(k) {
    return Array.from(k).reduce((acc, c, i) => {
      return acc + (31 ** i) * c.charCodeAt(0);
    }, 0);
  }

  // Take the prehash value and bucket it
  _hashStanford(k, m) {
    return this._prehashStanford(k) % m;
  }
}

module.exports = {
  DictionaryNumericKey,
  DictionaryStringKey,
  STANFORD106B,
  MULTIPLICATIVE
};
