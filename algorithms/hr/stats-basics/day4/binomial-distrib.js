
// Binomial distribution.

// Naive approach for factorials , then think about saving computations

// We could memoize

const computedFactorials = {};

function factorial(n) {
  if (n <= 1)
    return 1;

  if (computedFactorials[n.toString()]) {
    return computedFactorials[n.toString()];
  }

  const res = n * factorial(n - 1);
  computedFactorials[n.toString()] = res;
  return res;
}

function combinations(n, x) {
  return factorial(n) / (factorial(x) * factorial(n - x));
}

function binom(x, n, p) {
  return combinations(n, x) * (p ** x) * ((1 - p) ** (n - x));
}

function compute([ratioB, ratioG], numChildren = 6, minNumOfBoys = 3) {
  // By , 1 = g + b  and b/g = 1.09 , 1 = b + b/1.09 => 1 = (1 + 1/1.09)b so b = 1/(1 + 1/ratio)
  const probabilityOfBoy = 1 / (1 + (1/ratioB));
  let distrib = 0;
  for (let c = minNumOfBoys; c <= numChildren; c++) {
    distrib += binom(c, numChildren, probabilityOfBoy);
  }
  return rounding(distrib, 3);
}

// Helper methods

function processLine(line, desiredCount) {
  return line.split(' ').slice(0, desiredCount).map((x) => parseFloat(x));
}

function parseInputs(input) {
  return processLine(input, 2);
}

function parseAndCompute(input) {
  const data = parseInputs(input);
  return compute(data);
}

function rounding(num, dp = 1) {
  const f = 10 ** dp;
  return Math.round(num * f) / f;
}

function formatting(num, dp = 1) {
  return num.toFixed(dp);
}

// Primary output for problem

function processData(input) {
  console.log(formatting(parseAndCompute(input), 3));
}

// Exports for tests

module.exports = {
  processData,
  parseAndCompute,
  parseInputs,
  compute,
  formatting
};
