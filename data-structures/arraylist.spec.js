const ArrayList = require('./arraylist');

describe('ArrayList', () => {
  let list;
  const initData = [1, 2, 3];

  beforeEach(() => {
    list = new ArrayList(initData);
  });

  it('should allocate an array with initial data', () => {
    initData.forEach((v, i) =>
      expect(list.get(i)).toBe(v)
    );
  });

  it('should allocate an array with no initial data', () => {
    const arr = new ArrayList();
    expect(arr.size).toBe(0);
    expect(() => arr.get(0)).toThrow();
  });

  it('should return size as number of actual elements', () => {
    expect(list.size).toBe(3);
  });

  it('should not allow access beyond bounds', () => {
    expect(() => list.get(4)).toThrow();
  });

  it('should set specific index', () => {
    expect(list.set(1, 100).get(1)).toBe(100);
  });

  it('should grow when needed', () => {
    for (let i = 0; i < 10; i++) {
      expect(list.push(i + 100).size).toBe(initData.length + i + 1);
      expect(list.get(initData.length + i)).toBe(i + 100);
    }
  });
});