const subject = require('./clt-3');

describe('Central Limit Theorem 3', () => {
  describe('.parseInputs', () => {
    it('should parse correct input', () => {
      const inputs = "100\n" +
        "500\n" +
        "80\n" +
        ".95\n" +
        "1.96";
      expect(subject.parseInputs(inputs)).toEqual([[100], [500], [80], [.95], [1.96]]);
    });
  });

  describe('.compute', () => {
    it('should compute the correct result', () => {
      expect(subject.compute([[100], [500], [80], [.95], [1.96]])).toEqual([484.32, 515.68]);
    });
  });

  describe('.parseAndCompute', () => {
    it('should compute the correct result with valid input', () => {
      const input = "100\n" +
        "500\n" +
        "80\n" +
        ".95\n" +
        "1.96";
      expect(subject.parseAndCompute(input)).toEqual([484.32, 515.68]);
    });
  });
});