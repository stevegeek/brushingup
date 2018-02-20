const subject = require('./TODO');

describe('TODO', () => {
  describe('.parseInputs', () => {
    it('should parse correct input', () => {
      const inputs = "TODO";
      expect(subject.parseInputs(inputs)).toEqual(TODO);
    });
  });

  describe('.compute', () => {
    it('should compute the correct result with odd items', () => {
      expect(subject.compute(TODO)).toEqual(TODO);
    });

    it('should compute the correct result with even items', () => {
      expect(subject.compute(TODO)).toEqual(TODO);
    });
  });

  describe('.parseAndCompute', () => {
    it('should compute the correct result with valid input', () => {
      const input = "TODO";
      expect(subject.parseAndCompute(input)).toEqual(TODO);
    });
  });
});