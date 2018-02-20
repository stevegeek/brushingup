const subject = require('./normal');

describe('Normal', () => {
  describe('.parseInputs', () => {
    it('should parse correct input', () => {
      const inputs = "20 2\n" +
        "19.5\n" +
        "20 22";
      expect(subject.parseInputs(inputs)).toEqual([[20, 2], [19.5], [20, 22]]);
    });
  });

  describe('.compute', () => {
    it('should compute the correct result', () => {
      expect(subject.compute([[20, 2], [19.5], [20, 22]])).toEqual([0.401, 0.341]);
    });
  });

  describe('.parseAndCompute', () => {
    it('should compute the correct result with valid input', () => {
      const input = "20 2\n" +
        "19.5\n" +
        "20 22";
      expect(subject.parseAndCompute(input)).toEqual([0.401, 0.341]);
    });
  });
});