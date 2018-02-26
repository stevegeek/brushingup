const subject = require('./binomial-distrib-2');

describe('Binomial distribution', () => {
  describe('.parseInputs', () => {
    it('should parse correct input', () => {
      const inputs = "12 10";
      expect(subject.parseInputs(inputs)).toEqual([12, 10]);
    });
  });

  describe('.compute', () => {
    it('should compute the correct result', () => {
      expect(subject.compute([12, 10])).toEqual([0.891, 0.342]);
    });
  });

  describe('.parseAndCompute', () => {
    it('should compute the correct result with valid input', () => {
      const input = "12 10";
      expect(subject.parseAndCompute(input)).toEqual([0.891, 0.342]);
    });
  });
});