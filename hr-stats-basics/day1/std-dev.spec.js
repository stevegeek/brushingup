const subject = require('./std-dev');

describe('Std Deviation', () => {
  describe('.parseInputs', () => {
    it('should parse correct input', () => {
      const inputs = "5\n" +
        "10 40 30 50 20";
      expect(subject.parseInputs(inputs)).toEqual([[10, 40, 30, 50, 20]]);
    });
  });

  describe('.compute', () => {
    it('should compute the correct result', () => {
      expect(subject.compute([1, 2, 3, 3, 4, 5, 56])).toEqual(18.6);
    });
  });

  describe('.parseAndCompute', () => {
    it('should compute the correct result with valid input', () => {
      const input = "5\n" +
        "10 40 30 50 20";
      expect(subject.parseAndCompute(input)).toEqual(14.1);
    });
  });
});