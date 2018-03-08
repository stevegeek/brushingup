// https://www.hackerrank.com/domains/tutorials/10-days-of-statistics

// notes:
// O(N) initially , then the subsequent sort will determine actual order of complexity
// eg
// [1, 2, 3, 4, 4, 5, 6, 6, 6, 7]

// so if we subtract a number from prev num we can see the repeated nums in sorted array
// [-, 1, 1, 1, 0, 1, 1, 0, 0, 1]

// So count the reps and push into array
// [[1, 4], [2, 6]]
// if empty then first value of input sorted array, otherwise sort by first val of inner array + first value


// note:
// first attempts i didnt account for my final array needing sorting not only
// on count value, but also on value to be increasing, so adjusted sort predicate

// Also I think I could have iterated over that array and picked max value of count
// and min of values arr[0] > max or arr[0]== max && v < prevV instead of sorting
// as complexity order of JS sort will determine that order of my solution if worse

// If did above loop then O(N) solution def which would be better than using
// sort which is prob O(NlogN)

function findMode(arr) {
  const res = [];
  let repeatCount = 0;
  for (let i = 1; i <= arr.length; i++) {
    if (i !== arr.length && (arr[i] - arr[i - 1] === 0)) {
      if (repeatCount) {
        repeatCount++;
      } else {
        repeatCount = 1;
      }
    } else {
      if (repeatCount) {
        res.push([repeatCount, arr[i - 1]])
      }
      repeatCount = 0;
    }
  }

  // sort by highest occurance, then by value increasing
  const sorted = res.sort((a, b) => {
    const countDiff = b[0] - a[0];
    if (countDiff === 0) {
      return a[1] - b[1];
    }
    return countDiff;
  });
  return sorted.length ? sorted[0][1] : arr[0];
}

function compute(items) {
  const mean = items.reduce((s, x) => s + x, 0) / items.length;

  const sortedArray = items.sort((a, b) => a - b);

  const midVal = items.length / 2;

  const median = !!(items.length % 2) ?
    sortedArray[Math.floor(midVal)] :
    (sortedArray[midVal - 1] + sortedArray[midVal]) / 2;

  const mode = findMode(sortedArray);

  return [mean, median, mode];
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
  const data = parseInputs(input);
  return compute(data[0]).map(x => rounding(x, 1));
}

function processData(input) {
  parseAndCompute(input).forEach(x => console.log(formatting(x, 1)));
}

function rounding(num, dp) {
  const f = 10 ** dp;
  return (Math.round(num * f) / f);
}

function formatting(num, dp) {
  return num.toFixed(dp);
}

module.exports = {
  processData,
  parseAndCompute,
  parseInputs,
  compute,
  formatting
};
