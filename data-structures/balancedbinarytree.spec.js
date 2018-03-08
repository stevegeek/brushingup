const trees = require('./balancedbinarytree');

describe('AVL tree', () => {
  let tree, n8, n9, n10, n11;

  beforeEach(() => {
    tree = new trees.AVL();
    n10 = tree.insert(10);
    n11 = tree.insert(11);
    tree.insert(12);
    n9 = tree.insert(9);
    n8 = tree.insert(8);
    console.log(tree.toString());
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
});