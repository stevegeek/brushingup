// Find permutations of a string s1 in an input string and return the indicies
// of the unique permutations.

// At the moment I think this solution is O(s + n + s!) where s is the size of s1 and
// n of the input string

// TODO: improve this

function process(input, searchString) {
  const searchCharMap = Array.from(searchString).reduce(function (m, s) {
    m[s] = true;
    return m;
  }, {}); // O(s)

  let matchedSeqChars = 0;

  // O(n) and constant work per item
  return Array.from(input).reduce(function (foundPermutations, i, index) {
    if (searchCharMap[i]) {
      matchedSeqChars++;
    } else {
      matchedSeqChars = 0;
    }
    if (matchedSeqChars >= searchString.length) {
      const start = index - (searchString.length - 1);
      const perm = input.slice(start, index + 1);
      if (!foundPermutations[perm]) {
        foundPermutations[perm] = [];
      }
      foundPermutations[perm].push({index: start});
    }
    return foundPermutations;
  }, {});
}

// O(s!)
module.exports = {
  permutations(input, s1) {
    return Object.keys(process(input, s1));
  },
  permutationIndicies(input, s1) {
    const perms = process(input, s1);
    return Object.entries(perms).map(([k, v]) => v[0].index);
  }
};
