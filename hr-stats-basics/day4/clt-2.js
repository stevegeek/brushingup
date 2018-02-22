
function normFactor(sigma) {
  return 1.0 / (sigma * Math.sqrt(2.0 * Math.PI));
}

function distributionExp(x, mu, sigma) {
  return -1.0 * Math.pow(x - mu, 2) / (2.0 * Math.pow(sigma, 2));
}

function pdf(x, mu, sigma) {
  return normFactor(sigma) * Math.pow(Math.E, distributionExp(x, mu, sigma));
}

function erf(z) {
  if (z === 0) {
    return 0.0;
  }
  let area = 0.0;

  // Simulate integration... Must find algorithm to approximate better
  // Here sum small steps of area under graph
  const z1 = Math.abs(z);
  const step = z1 / 10000.0;
  let x = step;
  while(x < z1) {
    const y = Math.pow(Math.E, -1.0 * x * x);
    area += y * step;
    x += step;
  }
  return 2.0 / Math.sqrt(Math.PI) * area * ((z < 0) ? -1.0: 1.0);
}

function cdfAt(x, mu, sigma) {
  return 0.5 * (1.0 + erf((x - mu) / (sigma * Math.sqrt(2))));
}

function cdf(x1, x2, mu, sigma) {
  const fiX = cdfAt(x2, mu, sigma);
  return (x1 !== 0) ? (fiX - cdfAt(x1, mu, sigma)) : fiX;
}

function compute([[maxTickets], [students], [mu], [sigma]]) {
  const mu1 = students * mu;
  const s1 = Math.sqrt(students) * sigma;
  const p = cdf(0, maxTickets, mu1, s1);
  return [rounding(p, 4)];
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
  const f = Math.pow(10, dp);
  return Math.round(num * f) / f;
}

function formatting(num, dp = 1) {
  return num.toFixed(dp);
}

// Primary output for problem

function processData(input) {
  parseAndCompute(input).forEach(x => console.log(formatting(x, 4)));
}

// Exports for tests

module.exports = {
  processData,
  parseAndCompute,
  parseInputs,
  compute,
  formatting
};
