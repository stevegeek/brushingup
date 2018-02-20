
function geometric(n, p) {
  return Math.pow(1.0 - p, n - 1) * p;
}

function compute([ratio, n]) {
  const p = 1.0 * ratio[0] / ratio[1];
  return rounding(geometric(n[0], p), 3);
}

// Helper methods

function processLine(line, desiredCount) {
  return line.split(' ').slice(0, desiredCount).map((x) => parseInt(x, 10));
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
  const f = Math.pow(10, dp);
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
