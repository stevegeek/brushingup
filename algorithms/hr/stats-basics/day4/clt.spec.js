const subject = require('./clt');

describe('Central Limit Theorem', () => {
  describe('.parseInputs', () => {
    it('should parse correct input', () => {
      const inputs = "9800\n" +
        "49\n" +
        "205\n" +
        "15";
      expect(subject.parseInputs(inputs)).toEqual([[9800], [49], [205], [15]]);
    });
  });

  describe('.compute', () => {
    it('should compute the correct result', () => {
      expect(subject.compute([[9800], [49], [205], [15]])).toEqual([0.0099]);
    });
  });

  describe('.parseAndCompute', () => {
    it('should compute the correct result with valid input', () => {
      const input = "9800\n" +
        "49\n" +
        "205\n" +
        "15";
      expect(subject.parseAndCompute(input)).toEqual([0.0099]);
    });
  });
});