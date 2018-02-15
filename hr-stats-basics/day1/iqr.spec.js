const subject = require('./iqr');

describe('Interquartile range', () => {
  describe('.parseInputs', () => {
    it('should parse correct input', () => {
      const inputs = "6\n" +
        "6 12 8 10 20 16\n" +
        "5 4 3 2 1 5";
      expect(subject.parseInputs(inputs)).toEqual([
        [6, 12, 8, 10, 20, 16],
        [5, 4, 3, 2, 1, 5]
      ]);
    });

    it('should parse incorrect input (too few digits)', () => {
      const inputs = "7\n" +
        "6 12 8 10 20 16\n" +
        "5 4 3 2 1 5";
      expect(subject.parseInputs(inputs)).toEqual([
        [6, 12, 8, 10, 20, 16],
        [5, 4, 3, 2, 1, 5]
      ]);
    });

    it('should parse incorrect input (too many digits)', () => {
      const inputs = "5\n" +
        "6 12 8 10 20 16\n" +
        "5 4 3 2 1 5";
      expect(subject.parseInputs(inputs)).toEqual([
        [6, 12, 8, 10, 20],
        [5, 4, 3, 2, 1]
      ]);
    });
  });

  describe('.compute', () => {
    it('should compute the correct result with even items', () => {
      expect(subject.compute([
        [6, 12, 8, 10, 20, 16],
        [5, 4, 3, 2, 1, 5]
      ])).toEqual(9);
    });
  });

  describe('.parseAndCompute', () => {
    it('should compute the correct result with valid input', () => {
      const input = "6\n" +
        "6 12 8 10 20 16\n" +
        "5 4 3 2 1 5";
      expect(subject.parseAndCompute(input)).toEqual(9);
    });
  });
});
