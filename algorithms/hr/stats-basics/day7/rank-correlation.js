const PRECISION = 3;

function corr(X, Y) {
  const n = X.length;
  const [meanX, meanY] = X.reduce((s, x, i) => [s[0] + x, s[1] + Y[i]], [0.0, 0.0]).map(s => s / n);
  const [sX, sY, sum] = X.reduce((s, x, i) =>
    [
      s[0] + ((x - meanX) ** 2),
      s[1] + ((Y[i] - meanY) ** 2),
      s[2] + ((x - meanX) * (Y[i] - meanY))
    ],
    [0.0, 0.0, 0.0]
  );
  const sigmaX = Math.sqrt(sX / n);
  const sigmaY = Math.sqrt(sY / n);

  return sum / (n * sigmaX * sigmaY);
}

function compute(X, Y) {
  function rankUpdate(Zrank, Z, i) {
    if (Z[i] - Z[i - 1] === 0) {
      Zrank[i] = Zrank[i - 1];
    } else {
      Zrank[i] = Zrank[i - 1] + 1;
    }
  }
  const n = X.length;


  // find rank for unsorted, or reconstruct after sorting and setting up rank

  // one option sort, setup rank through comparing with prev value and bucket into hash
  // then look up and reconstruct
  const Xsorted = X.slice(0).sort((a, b) => a - b);
  const Ysorted = Y.slice(0).sort((a, b) => a - b);
  const Xrank = [1];
  const Yrank = [1];

  const ranksX = {};
  const ranksY = {};
  for (let i = 0; i < n; i++) {
    if (i > 0) {
      rankUpdate(Xrank, Xsorted, i);
      rankUpdate(Yrank, Ysorted, i);
    }
    ranksX[Xsorted[i].toString()] = Xrank[i];
    ranksY[Ysorted[i].toString()] = Yrank[i];
  }

  const rankedX = X.map(x => ranksX[x.toString()]);
  const rankedY = Y.map(y => ranksY[y.toString()]);
  return rounding(corr(rankedX, rankedY));
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
  compute,
  formatting
};
