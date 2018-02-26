const subject = require('./weighted-mean');

describe('Weighted mean', () => {
  describe('.parseInputs', () => {
    it('should parse correct input', () => {
      const inputs = "5\n" +
        "10 40 30 50 20\n" +
        "1 2 3 4 5";
      expect(subject.parseInputs(inputs)).toEqual([
        [10, 40, 30, 50, 20],
        [1, 2, 3, 4, 5]
      ]);
    });
  });

  describe('.compute', () => {
    it('should compute the correct result with odd items', () => {
      expect(subject.compute([10, 40, 30, 50, 20], [1, 2, 3, 4, 5])).toEqual(32);
    });
  });

  describe('.parseAndCompute', () => {
    it('should compute the correct result with valid input', () => {
      const input = "5\n" +
        "10 40 30 50 20\n" +
        "1 2 3 4 5";
      expect(subject.parseAndCompute(input)).toEqual(32);
    });
  });
});