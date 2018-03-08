function compute() {

}

const PRECISION = 1;
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
  return compute(data[0]).map(x => rounding(x));
}

function zipInputs(inputs) {
  return inputs[0].map((x0, idx) => {
    return [x0, ...inputs.slice(1).map(d => d[idx])];
  });
}

function rounding(num, dp = PRECISION) {
  const f = 10 ** dp;
  return Math.round(num * f) / f;
}

function formatting(num, dp = PRECISION) {
  return num.toFixed(dp);
}

// Primary output for problem

function processData(input) {
  parseAndCompute(input).forEach(x => console.log(formatting(x)));
}

// Exports for tests

module.exports = {
  processData,
  parseAndCompute,
  parseInputs,
  compute,
  formatting
};
