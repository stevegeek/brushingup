const subject = require('./rank-correlation');

describe('Corr', () => {
  describe('.parseAndCompute', () => {
    it('should compute the correct result with valid input', () => {
      const input = "10\n" +
        "10 9.8 8 7.8 7.7 1.7 6 5 1.4 2 \n" +
        "200 44 32 24 22 17 15 12 8 4";
      expect(subject.parseAndCompute(input)).toEqual(0.903);
    });
  });
});