
function compute([[avgA, avgB]]) {
  const costA = 160 + 40 * (avgA + avgA * avgA);
  const costB = 128 + 40 * (avgB + avgB * avgB);
  return [rounding(costA, 3), rounding(costB, 3)];
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
  parseAndCompute(input).forEach(x => console.log(formatting(x, 3)));
}

// Exports for tests

module.exports = {
  processData,
  parseAndCompute,
  parseInputs,
  compute,
  formatting
};
