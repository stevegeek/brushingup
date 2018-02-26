const subject = require('./poisson');

describe('Poisson', () => {
  describe('.parseInputs', () => {
    it('should parse correct input', () => {
      const inputs = "2.5\n5";
      expect(subject.parseInputs(inputs)).toEqual([[2.5], [5]]);
    });
  });

  describe('.compute', () => {
    it('should compute the correct result', () => {
      expect(subject.compute([[2.5], [5]])).toEqual(0.067);
    });
  });

  describe('.parseAndCompute', () => {
    it('should compute the correct result with valid input', () => {
      const input = "2.5\n5";
      expect(subject.parseAndCompute(input)).toEqual(0.067);
    });
  });
});