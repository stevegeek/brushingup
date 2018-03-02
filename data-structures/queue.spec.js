const Queue = require('./queue');

describe('Queue', () => {
  it('should add in values', () => {
    const q = new Queue();
    q.add(1);
    q.add(2);
    q.add(3);
    // Note: just for experimenting we are looking into implementation here
    // which is nasty but whatever for this little exercise
    expect(q.head.val).toBe(1);
    expect(q.tail.val).toBe(3);
  });

  it('should peek a value', () => {
    const q = new Queue();
    q.add(1);
    q.add(2);
    expect(q.peek()).toBe(1);
  });

  it('should clear', () => {
    const q = new Queue();
    q.add(1);
    q.add(2);
    q.clear();
    expect(q.peek()).toBeUndefined();
  });

  it('should report if empty', () => {
    const q = new Queue();
    q.add(1);
    expect(q.isEmpty()).toBe(false);
    q.clear();
    expect(q.isEmpty()).toBe(true);
  });


  it('should remove values', () => {
    const q = new Queue();
    q.add(1);
    q.add(2);
    expect(q.remove()).toBe(1);
    expect(q.remove()).toBe(2);
    expect(q.remove()).toBeUndefined();
  });
});
