
// Binomial distribution 2

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

function combinations(n, x) {
  return factorial(n) / (factorial(x) * factorial(n - x));
}

function binom(x, n, p) {
  return combinations(n, x) * Math.pow(p, x) * Math.pow(1 - p, (n - x));
}

function compute([rejectPer100, count]) {
  // By , 1 = g + b  and b/g = 1.09 , 1 = b + b/1.09 => 1 = (1 + 1/1.09)b so b = 1/(1 + 1/ratio)
  const probabilityOfReject = rejectPer100 / 100.0;
  let atMost2 = 0;
  for (let c = 0; c <= 2; c++) {
    atMost2 += binom(c, count, probabilityOfReject);
  }
  let atLeast2 = 0;
  for (let c = 2; c <= count; c++) {
    atLeast2 += binom(c, count, probabilityOfReject);
  }
  return [atMost2, atLeast2].map(x => rounding(x, 3));
}

// Helper methods

function processLine(line, desiredCount) {
  return line.split(' ').slice(0, desiredCount).map((x) => parseFloat(x));
}

function parseInputs(input) {
  return processLine(input, 2);
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
