const dict = require('./simpledictionary-chaining-doubling');

describe('Dictionary', () => {
  describe('String keys', () => {
    let table, testObj = {v: 1};

    beforeEach(() => {
      table = new dict.DictionaryStringKey();
      table.insert('test', 123);
      table.insert('testy', testObj);
    });

    it('should hash well', () => {
      [dict.STANFORD106B
      ].forEach((s) => {
        const size = 8192;
        const t = new dict.DictionaryStringKey(size);
        for (let i = 0; i < size; i++) {
          t.insert('k' + i, i, s);
          expect(t.find('k' + i)).toEqual(i);
        }
        const stats = {used: 0, empty: 0, maxChainLength: 0, totalChainLength: 0};
        for (let i = 0; i < size; i++) {
          const c = t.data[i];
          if (!c) {
            stats.empty++
          } else {
            stats.used++;
            stats.totalChainLength += c.length;
            stats.maxChainLength = Math.max(stats.maxChainLength, c.length);
          }
        }
        console.log(`
        Type: ${s.toString()}
        Used table slots: ${stats.used}\n
        Empty table slots: ${stats.empty}\n
        Deepest slot chain: ${stats.maxChainLength}\n
        Average chain length: ${stats.totalChainLength / stats.used}`
        );
      });
    });

    it('should insert items', () => {
      table.insert('new', 'something');
      expect(table.find('new')).toEqual('something');
    });

    it('should overwrite existing', () => {
      table.insert('test', 'something');
      expect(table.find('test')).toEqual('something');
    });

    it('should get items', () => {
      expect(table.find('test')).toEqual(123);
      expect(table.find('testy')).toEqual(testObj);
      expect(table.find('foo')).toBeUndefined();
    });
  });

  describe('Numeric keys', () => {
    let table, testObj = {v: 1};

    beforeEach(() => {
      table = new dict.DictionaryNumericKey();
      table.insert(1, 123);
      table.insert(2, testObj);
    });

    it('should hash well', () => {
      [
        dict.MULTIPLICATIVE
      ].forEach((s) => {
        const size = 8192;
        const t = new dict.DictionaryNumericKey(size);
        for (let i = 0; i < size; i++) {
          t.insert(i, i, s);
          expect(t.find(i)).toEqual(i);
        }
        const stats = {used: 0, empty: 0, maxChainLength: 0, totalChainLength: 0};
        for (let i = 0; i < size; i++) {
          const c = t.data[i];
          if (!c) {
            stats.empty++
          } else {
            stats.used++;
            stats.totalChainLength += c.length;
            stats.maxChainLength = Math.max(stats.maxChainLength, c.length);
          }
        }
        console.log(`
        Type: ${s.toString()}
        Used table slots: ${stats.used}\n
        Empty table slots: ${stats.empty}\n
        Deepest slot chain: ${stats.maxChainLength}\n
        Average chain length: ${stats.totalChainLength / stats.used}`
        );
      });
    });

    it('should insert items', () => {
      table.insert(100, 'something');
      expect(table.find(100)).toEqual('something');
    });

    it('should overwrite existing', () => {
      table.insert(1, 'something');
      expect(table.find(1)).toEqual('something');
    });

    it('should get items', () => {
      expect(table.find(1)).toEqual(123);
      expect(table.find(2)).toEqual(testObj);
      expect(table.find(3)).toBeUndefined();
    });
  });

});