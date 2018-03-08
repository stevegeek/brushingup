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

  it('should allocate an array and push data', () => {
    const arr = new ArrayList();
    expect(arr.push(100).get(0)).toBe(100);
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

  it('should push into', () => {
    expect(list.push(100).get(0)).toBe(100);
    expect(list.push(101).get(0)).toBe(101);
    expect(list.get(1)).toBe(100);
  });

  it('should add into', () => {
    expect(list.add(100, 1).get(1)).toBe(100);
    expect(list.size).toBe(initData.length + 1);
  });

  it('should not allow adding beyond bounds', () => {
    expect(() => list.add(100, 5)).toThrow();
  });

  it('should remove from', () => {
    expect(list.removeAt(1).get(1)).toBe(3);
    expect(list.size).toBe(initData.length - 1);
  });

  it('should not allow removing beyond bounds', () => {
    expect(() => list.removeAt(5)).toThrow();
  });

  it('should handle not finding removed value', () => {
    expect(list.remove(100).size).toBe(initData.length);
  });

  it('should pop off', () => {
    expect(list.pop()).toBe(1);
    expect(list.get(0)).toBe(2);
  });

  it('should grow when needed', () => {
    for (let i = 0; i < 10; i++) {
      expect(list.add(i + 100).size).toBe(initData.length + i + 1);
      expect(list.get(initData.length + i)).toBe(i + 100);
    }
  });

  it('should shrink when needed', () => {
    for (let i = 0; i < 10; i++) {
      list.add(i + 100);
    }
    for (let i = 1; i < 10; i++) {
      expect(list.remove(i + 99).size).toBe(10 + initData.length - i);
      expect(list.get(initData.length)).toBe(i + 100);
    }
    expect(list.remove(109).size).toBe(initData.length);
  });

  it('should allow array like access through proxy', () => {
    expect(list[0]).toBe(1);
    expect(list[2]).toBe(3);
    list[1] = 200;
    expect(list.get(1)).toBe(200);
  });
});