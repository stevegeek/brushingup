
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


function compute([[avg], [k]]) {
  const p = ((avg ** k) * Math.exp(-1.0 * avg)) / factorial(k);
  return rounding(p, 3);
}

// Helper methods

function processLine(line, desiredCount) {
  return line.split(' ').slice(0, desiredCount).map((x) => parseFloat(x));
}

function parseInputs(input) {
  const lines = input.split('\n');
  return lines.map(l => processLine(l, 2));
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
