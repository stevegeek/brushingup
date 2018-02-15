// weighted mean

// First solution seems more idiomatic, but it iterates over array twice, second
// avoids second iteration at expense of lookup for let var in outer scope.
// Note complexity order doesnt change O(N) (its just O(2N) which is O(N))

function compute(items, itemWeights) {
  //const sw = itemWeights.reduce((s, x) => s + x, 0);
  //const wmean = items.reduce((wm, x, i) => wm + (x * itemWeights[i]), 0) / sw;
  let sw = 0;
  return items.reduce((wm, x, i) => {
    sw += itemWeights[i];
    return wm + (x * itemWeights[i])
  }, 0) / sw;
}

function processLine(line, desiredCount) {
  return line.split(' ').slice(0, desiredCount).map((x) => parseInt(x, 10));
}

function parseInputs(input) {
  const lines = input.split('\n');
  const itemCount = parseInt(lines[0], 10);
  return lines.slice(1).map(l => processLine(l, itemCount));
}

function parseAndCompute(input) {
  const [items, itemWeights] = parseInputs(input);
  return compute(items, itemWeights);
}

function processData(input) {
  console.log(formatting(parseAndCompute(input)));
}

module.exports = {
  processData,
  parseAndCompute,
  parseInputs,
  compute
};
