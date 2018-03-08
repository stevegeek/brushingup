
// Interquartile range

/*
6
6 12 8 10 20 16
5 4 3 2 1 5
 */

// Construct set S from values + frequencies of input as per question, can we do
// the calcs without setting up the set ?

// Initial implementation is O(n) (??) to generate set, O(nlogn) for sort

// Note: There must be a better way, come back to this

function generateSet(items) {
  return items.reduce((s, [item, freq]) => {
    const vals = [];
    for (let j = 0; j < freq; j++) {
      vals.push(item);
    }
    return s.concat(vals);
  }, []);
}

function median(arr, s, l) {
  if (l % 2) { // odd
    return arr[s + Math.floor(l / 2)];
  }
  return (arr[s + (l / 2 - 1)] + arr[s + (l / 2)]) / 2; // even
}

function iqr(data) {
  return [[0, 0.5], [0, 1], [0.5, 0.5]].map(([s, l]) =>
    median(data, Math.ceil(data.length * s), Math.floor(data.length * l))
  );
}

function compute(data) {
  const set = generateSet(zipInputs(data).sort((a, b) => a[0] - b[0]));
  const qs = iqr(set);
  return rounding(qs[2] - qs[0]);
}

function parseAndCompute(input) {
  return compute(parseInputs(input));
}

// Helpers

function processLine(line, desiredCount) {
  return line.split(' ').slice(0, desiredCount).map((x) => parseInt(x, 10));
}

function parseInputs(input) {
  const lines = input.split('\n');
  const itemCount = parseInt(lines[0], 10);
  return lines.slice(1).map(l => processLine(l, itemCount));
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

// Exports for test
module.exports = {
  processData,
  parseAndCompute,
  parseInputs,
  compute
};
