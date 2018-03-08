// https://www.hackerrank.com/challenges/icecream-parlor/problem
// Binary search problem.

// Following the CtCI process, start with brute force naive approach,
// then refine. We can reduce its cost by the first little optimisations,
// ignore any pair where first already too expensive and then avoid
// rechecking already checked pairs.

// Otherwise we can simply use binary search, but first sort which results
// in O(nlogn)

function sort(arr) {
  return arr.map((x, i) => [x, i]).sort((a, b) => a[0] - b[0]);
}

function icecreamParlor(m, arr) {
  // O(n^2) naive approach
  //for (let i = 0; i < arr.length; i++) {
  //  // Ignore anything where first option is too expensive
  //  if (arr[i] >= m) continue;
  //  // Dont recheck pairs
  //  for (let j = i + 1; j < arr.length; j++) {
  //    if (arr[i] + arr[j] === m) {
  //      return (i > j) ? [j + 1, i + 1] : [i + 1, j + 1];
  //    }
  //  }
  //}

  // Now more optimal solution
  // binary search for m - xi in array so that complexity is O(nlogn) instead
  const sorted = sort(arr);
  
  for (let i = 0; i < sorted.length; i++) {
    const rem = m - sorted[i][0];
    let min = 0;
    let max = sorted.length - 1;
    let mid;
    while (min <= max) {
      mid = Math.floor((max - min) / 2) + min;
      if (sorted[mid][0] < rem) {
        min = mid + 1;
      } else if (sorted[mid][0] > rem) {
        max = mid - 1;
      } else {
        break;
      }
    }
    if (sorted[mid][0] === rem && mid !== i) {
      const i1 = sorted[i][1] + 1;
      const i2 = sorted[mid][1] + 1;
      return (i1 > i2) ? [i2, i1] : [i1, i2];
    }
  }
}

function processLine(line, desiredCount) {
  return line.split(' ').slice(0, desiredCount).map((x) => parseFloat(x));
}

function parseInputs(input) {
  const lines = input.split('\n');
  const problemCount = parseInt(lines[0], 10);

  const problems = [];
  for (let i = 0; i < problemCount; i++) {
    const money = parseInt(lines[(i * 3) + 1], 10);
    const itemCount = parseInt(lines[(i * 3) + 2], 10);
    problems.push([money, processLine(lines[(i * 3) + 3], itemCount)]);
  }
  return problems;
}

function parseAndCompute(input) {
  return parseInputs(input).map(([m, arr]) => {
    return icecreamParlor(m, arr)
  });
}

const PRECISION = 0;

function rounding(num, dp = PRECISION) {
  const f = 10 ** dp;
  return Math.round(num * f) / f;
}

function formatting(num, dp = PRECISION) {
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
  formatting
};
