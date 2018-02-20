
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

  console.log('3) ', z, area)
  return 2.0 / Math.sqrt(Math.PI) * area * ((z < 0) ? -1.0: 1.0);
}

function cdfAt(x, mu, sigma) {
  console.log('2) ', x, mu, sigma)
  return 0.5 * (1.0 + erf((x - mu) / (sigma * Math.sqrt(2))));
}

function cdf(x1, x2, mu, sigma) {
  const fiX = cdfAt(x2, mu, sigma);
  console.log('1) ', x1, x2, mu, sigma, ' === ', fiX , ' // ', cdfAt(x1, mu, sigma))
  return (x1 !== 0) ? (fiX - cdfAt(x1, mu, sigma)) : fiX;
}

function q1(mu, sigma, q1Hours) {
  return cdf(0, q1Hours, mu, sigma);

  // Actually here we need to start from somewhere far from the mean, not 0
  //return cdf(mu - sigma * 5.0, q1Hours, mu, sigma);
}

function q2(mu, sigma, q2Lower, q2Upper) {
  return cdf(q2Lower, q2Upper, mu, sigma);
}

function compute([[mu, sigma], [q1Hours], [q2Lower, q2Upper]]) {
  return [rounding(q1(mu, sigma, q1Hours), 3), rounding(q2(mu, sigma, q2Lower, q2Upper), 3)];
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
