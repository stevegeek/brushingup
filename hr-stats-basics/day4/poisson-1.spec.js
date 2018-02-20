const subject = require('./poisson-1');

describe('Poisson 1', () => {
  describe('.parseInputs', () => {
    it('should parse correct input', () => {
      const inputs = "0.88 1.5";
      expect(subject.parseInputs(inputs)).toEqual([[0.88, 1.5]]);
    });
  });

  describe('.compute', () => {
    it('should compute the correct result', () => {
      expect(subject.compute([[0.88, 1.5]])).toEqual([226.176, 278]);
    });
  });

  describe('.parseAndCompute', () => {
    it('should compute the correct result with valid input', () => {
      const input = "0.88 1.5";
      expect(subject.parseAndCompute(input)).toEqual([226.176, 278]);
    });
  });
});