
function normFactor(sigma) {
  return 1.0 / (sigma * Math.sqrt(2.0 * Math.PI));
}

function distributionExp(x, mu, sigma) {
  return -1.0 * ((x - mu) ** 2) / (2.0 * (sigma ** 2));
}

function pdf(x, mu, sigma) {
  return normFactor(sigma) * Math.exp(distributionExp(x, mu, sigma));
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
    const y = Math.exp(-1.0 * x * x);
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

function q1(mu, sigma, q1Hours) {
  return cdf(0, q1Hours, mu, sigma);
}

function q2(mu, sigma, q2Grade) {
  return cdf(0, q2Grade, mu, sigma);
}

function compute([[mu, sigma], [q1Grade], [q2Grade]]) {
  const p = q2(mu, sigma, q2Grade) * 100;
  return [
    rounding(100 - (q1(mu, sigma, q1Grade) * 100), 2),
    rounding(100 - p, 2),
    rounding(p, 2)
  ];
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
  parseAndCompute(input).forEach(x => console.log(formatting(x, 2)));
}

// Exports for tests

module.exports = {
  processData,
  parseAndCompute,
  parseInputs,
  compute,
  formatting
};
