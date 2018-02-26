const perms = require('./VII-2-stringpermutations');

describe('VII-2', () => {
  it('should find permutations', () => {
    const input = 'abcbbhcabcyaabyabf';
    const s1 = 'abc';
    const result = ['abc', 'bcb', 'cbb', 'cab', 'aab'];
    expect(perms.permutations(input, s1)).toEqual(result);
  });

  it('should find permutation indicies', () => {
    const input = 'abcbbhcabcyaabyabf';
    const s1 = 'abc';
    const result = [0, 1, 2, 6, 11];
    expect(perms.permutationIndicies(input, s1)).toEqual(result);
  });
});