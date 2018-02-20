const subject = require('./normal-2');

describe('Normal 2', () => {
  describe('.parseInputs', () => {
    it('should parse correct input', () => {
      const inputs = "70 10\n" +
        "80\n" +
        "60";
      expect(subject.parseInputs(inputs)).toEqual([[70, 10], [80], [60]]);
    });
  });

  describe('.compute', () => {
    it('should compute the correct result', () => {
      expect(subject.compute([[70, 10], [80], [60]])).toEqual([15.87, 84.13, 15.87]);
    });
  });

  describe('.parseAndCompute', () => {
    it('should compute the correct result with valid input', () => {
      const input = "70 10\n" +
        "80\n" +
        "60";
      expect(subject.parseAndCompute(input)).toEqual([15.87, 84.13, 15.87]);
    });
  });
});