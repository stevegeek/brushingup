const Stack = require('./stack');

describe('Stack', () => {
  it('should push in values', () => {
    const s = new Stack();
    s.push(1);
    s.push(2);
    s.push(3);
    // Note: just for experimenting we are looking into implementation here
    // which is nasty but whatever for this little exercise
    expect(s.head.val).toBe(3);
    expect(s.head.next.val).toBe(2);
  });

  it('should peek a value', () => {
    const s = new Stack();
    s.push(1);
    s.push(2);
    expect(s.peek()).toBe(2);
  });


  it('should clear', () => {
    const s = new Stack();
    s.push(1);
    s.push(2);
    s.clear();
    expect(s.pop()).toBeUndefined();
  });

  it('should pop values', () => {
    const s = new Stack();
    s.push(1);
    s.push(2);
    expect(s.pop()).toBe(2);
    expect(s.pop()).toBe(1);
    expect(s.pop()).toBeUndefined();
  });
});
