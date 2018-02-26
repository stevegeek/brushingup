const subject = require('./geometric');

describe('Geometric', () => {
  describe('.parseInputs', () => {
    it('should parse correct input', () => {
      const inputs = "1 3\n5";
      expect(subject.parseInputs(inputs)).toEqual([[1, 3], [5]]);
    });
  });

  describe('.compute', () => {
    it('should compute the correct result', () => {
      expect(subject.compute([[1, 3], [5]])).toEqual(0.066);
    });
  });

  describe('.parseAndCompute', () => {
    it('should compute the correct result with valid input', () => {
      const input = "1 3\n5";
      expect(subject.parseAndCompute(input)).toEqual(0.066);
    });
  });
});