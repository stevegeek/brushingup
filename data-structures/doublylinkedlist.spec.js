const List = require('./doublylinkedlist');

describe('List', () => {
  let list, emptyList;
  const initData = [1, 2, 3];

  beforeEach(() => {
    list = new List(initData);
    emptyList = new List();
  });

  it('should setup a list with initial data', () => {
    list.forEach((v, i) =>
      expect(v).toBe(initData[i])
    );
  });

  it('should get last item', () => {
    expect(list.last).toBe(3);
    expect(emptyList.last).toBeUndefined();
  });

  it('should get length', () => {
    expect(list.length).toBe(3);
    expect(emptyList.length).toBe(0);
    emptyList.append(1);
    expect(emptyList.length).toBe(1);
  });

  it('should get first item', () => {
    expect(list.first).toBe(1);
    expect(emptyList.first).toBeUndefined();
  });

  it('should append data', () => {
    list.append('foo');
    expect(list.last).toEqual('foo');
  });

  it('should append data', () => {
    list.prepend('foo');
    expect(list.first).toEqual('foo');
  });

  it('should not append empty data', () => {
    list.append();
    expect(list.last).toBe(3);
  });

  it('should be iterable', () => {
    expect(Array.from(list).map(c => c[0].val)).toEqual([1, 2, 3]);
  });

  it('should reduce left', () => {
    expect(list.reduce((acc, x) => acc + x)).toBe(6);
    expect(list.reduce((acc, x) => acc + x, 2)).toBe(8);
  });

  it('should reduce right', () => {
    expect(list.reduceRight((acc, x) => acc + x)).toBe(6);
    expect(list.reduceRight((acc, x) => acc + x, 2)).toBe(8);
  });

  it('should remove data', () => {
    list.append('foo');
    list.remove(1);
    list.remove('foo');
    list.remove('nada');
    expect(list.first).toEqual(2);
    expect(list.last).toEqual(3);
  });

  it('should recursively build cons string representation', () => {
    expect(list.toString()).toEqual('Cons(1, Cons(2, Cons(3, ~)))');
  });
});