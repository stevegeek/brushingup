// Calc quartiles
// Avoids copying of array, use indexes.
// Complexity: O(nlogn)

// [1, 2, 3, 4, 5]
// s = [0, 0, 3]
// l = [2, 5, 2]

// [1, 2, 3, 4, 5, 6]
// s = [0, 0, 3]
// l = [2, 6, 2]

function median(arr, s, l) {
  if (l % 2) { // odd
    return arr[s + Math.floor(l / 2)];
  }
  return (arr[s + (l / 2 - 1)] + arr[s + (l / 2)]) / 2; // even
}

function quartiles(data) {
  const sorted = data.sort((a, b) => a - b);
  return [[0, 0.5], [0, 1], [0.5, 0.5]].map(([s, l]) =>
    median(sorted, Math.ceil(sorted.length * s), Math.floor(sorted.length * l))
  );
}

function processLine(line, desiredCount) {
  return line.split(' ').slice(0, desiredCount).map((x) => parseInt(x, 10));
}

function parseInput(input) {
  const lines = input.split('\n');
  const itemCount = parseInt(lines[0], 10);
  return lines.slice(1).map(l => processLine(l, itemCount));
}

function parseAndCompute(input) {
  const data = parseInput(input);
  return quartiles(data[0]);
}

function processData(input) {
  parseAndCompute(input).forEach(x => console.log(x));
}

module.exports = {
  processData,
  parseAndCompute,
  parseInput,
  compute: quartiles
};
