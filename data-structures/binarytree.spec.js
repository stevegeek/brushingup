const trees = require('./binarytree');

describe('BinaryTree', () => {
  let tree, n8;

  beforeEach(() => {
    tree = new trees.BinaryTree();
    tree.insert(10);
    tree.insert(6);
    tree.insert(11);
    tree.insert(12);
    tree.insert(5);
    n8 = tree.insert(8);
    tree.insert(7);
  });

  it('should render tree in text', () => {
    expect(tree.toString()).toEqual('\nNode0(val: 10, {})\n' +
      '\t| left\n' +
      '\tNode1(val: 6, {})\n' +
      '\t\t| left\n' +
      '\t\tNode4(val: 5, {})\n' +
      '\t\t\t| left~\n' +
      '\t\t\t| right~\n' +
      '\t\t| right\n' +
      '\t\tNode5(val: 8, {})\n' +
      '\t\t\t| left\n' +
      '\t\t\tNode6(val: 7, {})\n' +
      '\t\t\t\t| left~\n' +
      '\t\t\t\t| right~\n' +
      '\t\t\t| right~\n' +
      '\t| right\n' +
      '\tNode2(val: 11, {})\n' +
      '\t\t| left~\n' +
      '\t\t| right\n' +
      '\t\tNode3(val: 12, {})\n' +
      '\t\t\t| left~\n' +
      '\t\t\t| right~');
  });

  it('should insert at correct place', () => {
    const n9 = tree.insert(9);
    expect(n9.val).toBe(9);
    expect(n9.left && n9.right).toBeUndefined();
    expect(n8.right).toBe(n9);
  });

  it('should be iterable', () => {
    expect(Array.from(tree).map(({n, d}) => n.val)).toEqual([ 10, 6, 5, 8, 7, 11, 12 ]);
  });

  it('should do depth first traversal', () => {
    expect(tree.mapDepthFirst()).toEqual([ 10, 6, 5, 8, 7, 11, 12 ]);
  });

  it('should calc height', () => {
    expect(tree.height).toEqual(3);
  });

  it('should find successors', () => {
    expect(tree.successor(7)).toEqual(8);
    expect(tree.successor(8)).toEqual(10);
    expect(tree.successor(10)).toEqual(11);
    expect(tree.successor(12)).toEqual(undefined);
  });

  it('should find predecessor', () => {
    expect(tree.predecessor(7)).toEqual(6);
    expect(tree.predecessor(8)).toEqual(7);
    expect(tree.predecessor(12)).toEqual(11);
    expect(tree.predecessor(5)).toEqual(undefined);
  });

  it('should delete', () => {
    expect(tree.remove(12)).toBe(true);
    expect(tree.successor(11)).toBe(undefined);

    expect(tree.remove(10)).toBe(true);
    expect(tree.successor(11)).toBe(undefined);
    expect(tree.predecessor(11)).toBe(8);

    expect(tree.remove(6)).toBe(true);
    expect(tree.predecessor(11)).toBe(8);
    expect(tree.predecessor(7)).toBe(5);
    expect(tree.predecessor(5)).toBe(undefined);
  });

  it('should do contain checks for valid item', () => {
    expect(tree.contains(12)).toEqual(true);
  });

  it('should do contain checks for non existant', () => {
    expect(tree.contains(120)).toEqual(false);
  });
});