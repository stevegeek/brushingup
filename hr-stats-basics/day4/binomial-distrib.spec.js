const subject = require('./binomial-distrib');

describe('Binomial distribution', () => {
  describe('.parseInputs', () => {
    it('should parse correct input', () => {
      const inputs = "1.09 1";
      expect(subject.parseInputs(inputs)).toEqual([1.09, 1]);
    });
  });

  describe('.compute', () => {
    it('should compute the correct result', () => {
      expect(subject.compute([1.09, 1])).toEqual(0.696);
    });
  });

  describe('.parseAndCompute', () => {
    it('should compute the correct result with valid input', () => {
      const input = "1.09 1";
      expect(subject.parseAndCompute(input)).toEqual(0.696);
    });
  });
});