const subject = require('./correlation');

describe('Corr', () => {
  describe('.parseInputs', () => {
    it('should parse correct input', () => {
      const inputs = "5\n" +
        "10 9.8 8 7.8 7.7\n" +
        "200 44 32 24 22";
      expect(subject.parseInputs(inputs)).toEqual([[
        10, 9.8, 8, 7.8, 7.7
      ],
      [
        200, 44, 32, 24, 22
      ]]);
    });
  });

  describe('.parseAndCompute', () => {
    it('should compute the correct result with valid input', () => {
      const input = "10\n" +
        "10 9.8 8 7.8 7.7 7 6 5 4 2\n" +
        "200 44 32 24 22 17 15 12 8 4";
      expect(subject.parseAndCompute(input)).toEqual(0.612);
    });
  });
});