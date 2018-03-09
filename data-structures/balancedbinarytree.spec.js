const trees = require('./balancedbinarytree');

describe('AVL tree', () => {
  let tree, n8, n9, n10, n11, n12;

  beforeEach(() => {
    tree = new trees.AVL();
    n10 = tree.insert(10);
    n11 = tree.insert(11);
    n12 = tree.insert(12);
    n9 = tree.insert(9);
    n8 = tree.insert(8);
  });

  it('should insert at correct place', () => {
    expect(n8.height).toBe(1);
    expect(n9.parent).toBe(n11);
    expect(n10.parent).toBe(n9);
    expect(n9.right).toBe(n10);
  });

  it('should be iterable', () => {
    expect(Array.from(tree).map(({n, d}) => n.val)).toEqual([ 11, 9, 8, 10, 12 ]);
  });

  it('should do depth first traversal', () => {
    expect(tree.mapDepthFirst()).toEqual([ 11, 9, 8, 10, 12 ]);
  });

  it('should rebalance', () => {
    const n7 = tree.insert(7);
    expect(n8.parent).toBe(n9);
    expect(n7.parent).toBe(n8);
    expect(n9.right).toBe(n11);
    expect(n11.left).toBe(n10);
    expect(n11.right).toBe(n12);
  });

  it('should delete', () => {
    expect(tree.remove(8)).toBe(true);
    expect(n9.left).toBeUndefined();
    expect(tree.remove(9)).toBe(true);
    expect(n10.parent).toBe(n11);
  });

  it('should rebalance on delete', () => {
    tree.insert(6);
    tree.insert(5);
    tree.insert(4);
    const n7 = tree.insert(7);
    expect(tree.remove(6)).toBe(true);
    expect(tree.remove(5)).toBe(true); // rebalance
    expect(n8.parent).toBe(n7);
    expect(n7.right).toBe(n8);
    expect(n9.left).toBe(n7);
    console.log(tree.toString());
  });
});