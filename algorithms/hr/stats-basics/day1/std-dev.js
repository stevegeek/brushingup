// Compute series standard deviation
// Each item < 10^5

// complexity O(n) assuming sqrt is O(1)

// Sum of squares could get very big, watch for overflow?? Numerical stability here?

// NOTE:
// read this and try some https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance


function compute(data) {
  const mean = data.reduce((s, x) => s + x, 0) / data.length;
  const sum = data.reduce((s, x) => s + ((x - mean) ** 2), 0);
  return rounding(Math.sqrt(sum / data.length - 1));
}

// Helper methods

function processLine(line, desiredCount) {
  return line.split(' ').slice(0, desiredCount).map((x) => parseInt(x, 10));
}

function parseInputs(input) {
  const lines = input.split('\n');
  const itemCount = parseInt(lines[0], 10);
  return lines.slice(1).map(l => processLine(l, itemCount));
}

function parseAndCompute(input) {
  const data = parseInputs(input);
  return compute(data[0]);
}

function zipInputs(inputs) {
  return inputs[0].map((x0, idx) => {
    return [x0, ...inputs.slice(1).map(d => d[idx])];
  });
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
  console.log(formatting(parseAndCompute(input)));
}

// Exports for tests

module.exports = {
  processData,
  parseAndCompute,
  parseInputs,
  compute,
  formatting
};
