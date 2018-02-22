const subject = require('./clt-2');

describe('Central Limit Theorem 2', () => {
  describe('.parseInputs', () => {
    it('should parse correct input', () => {
      const inputs = "250\n" +
        "100\n" +
        "2.4\n" +
        "2.0";
      expect(subject.parseInputs(inputs)).toEqual([[250], [100], [2.4], [2.0]]);
    });
  });

  describe('.compute', () => {
    it('should compute the correct result', () => {
      expect(subject.compute([[250], [100], [2.4], [2.0]])).toEqual([0.6914]);
    });
  });

  describe('.parseAndCompute', () => {
    it('should compute the correct result with valid input', () => {
      const input = "250\n" +
        "100\n" +
        "2.4\n" +
        "2.0";
      expect(subject.parseAndCompute(input)).toEqual([0.6914]);
    });
  });
});