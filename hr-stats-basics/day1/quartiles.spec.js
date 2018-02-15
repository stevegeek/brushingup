const subject = require('./quartiles');

describe('Quartiles', () => {
  describe('.parseInputs', () => {
    it('should compute the correct result with incorrect input', () => {
      const inputs = "3\n1 2 3 4 5";
      expect(subject.parseInput(inputs)).toEqual([[1, 2, 3]]);
    });

    it('should compute the correct result with incorrect input', () => {
      const inputs = "5\n1 2 3 4 5";
      expect(subject.parseInput(inputs)).toEqual([[1, 2, 3, 4, 5]]);
    });

    it('should compute the correct result with incorrect input', () => {
      const inputs = "7\n1 2 3 4 5";
      expect(subject.parseInput(inputs)).toEqual([[1, 2, 3, 4, 5]]);
    });
  });

  describe('.compute', () => {
    it('should compute the correct result with odd items', () => {
      expect(subject.compute([1, 2, 3, 4, 5])).toEqual([1.5, 3, 4.5]);
    });

    it('should compute the correct result with even items', () => {
      expect(subject.compute([1, 2, 3, 4, 5, 6])).toEqual([2, 3.5, 5]);
    });
  });

  describe('.parseAndCompute', () => {
    it('should compute the correct result with valid input', () => {
      const input = "5\n1 2 3 4 5";
      expect(subject.parseAndCompute(input)).toEqual([1.5, 3, 4.5]);
    });
  });
});
