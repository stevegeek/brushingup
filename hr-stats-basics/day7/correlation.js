const PRECISION = 3;

function conv(X, Y) {
  const n = X.length;
  const [meanX, meanY] = X.reduce((s, x, i) => [s[0] + x, s[1] + Y[i]], [0.0, 0.0]).map(s => s / n);
  const [sX, sY, sum] = X.reduce((s, x, i) =>
    [
      s[0] + Math.pow((x - meanX), 2),
      s[1] + Math.pow((Y[i] - meanY), 2),
      s[2] + ((x - meanX) * (Y[i] - meanY))
    ],
    [0.0, 0.0, 0.0]
  );
  const sigmaX = Math.sqrt(sX / n);
  const sigmaY = Math.sqrt(sY / n);

  return sum / (n * sigmaX * sigmaY);
}

function compute(X, Y) {
  // we need to compute variance and mean of X and Y and then do calc
  return rounding(conv(X, Y));
}

function processLine(line, desiredCount) {
  return line.split(' ').slice(0, desiredCount).map((x) => parseFloat(x));
}

function parseInputs(input) {
  const lines = input.split('\n');
  const itemCount = parseInt(lines[0], 10);
  return lines.slice(1).map(l => processLine(l, itemCount));
}

function parseAndCompute(input) {
  const [X, Y] = parseInputs(input);
  return compute(X, Y);
}

function rounding(num, dp = PRECISION) {
  const f = Math.pow(10, dp);
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
  compute,
  formatting
};
