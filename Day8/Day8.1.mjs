import fs from 'fs';
const data = fs.readFileSync('./Day8.1.txt', 'utf-8');
const linesRead = data.split('\n');

const count147Or8 = oSArray => {
  let count = 0;
  oSArray.forEach(o => {
    if(o.length === 2 || o.length === 3 || o.length === 4 || o.length ===7) count ++;
  });
  return count;
};
const removeOneFromAnotherString = (targetString, toRemoveString) => {
  let result = targetString;
  for(let i = 0; i < toRemoveString.length; i++) {
    result = result.replace(toRemoveString.charAt(i), '');
  }
  return result;
}
const containsAll = (targetString, comparisonString) => {
  for(let i = 0; i < comparisonString.length; i++) {
    if(targetString.indexOf(comparisonString.charAt(i)) === -1) return false;
  }
  return true;
}

const stringsContainSameLetters = (targetString, comparisonString) => {
  return containsAll(targetString, comparisonString) && targetString.length === comparisonString.length;
}
const processLine = line => {
  let runningCount = 0;
  const [inputSegments, outputSegments] = line.split('|').map(e => e.trim());
  const letterMapping = {
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
  };
  const preimageMapping = {
    a: '',
    b: '',
    c: '',
    d: '',
    e: '',
    f: '',
    g: '',
  };
  // Transform each input segment to sorted alphabetically for better comparison.
  const iSSorted = inputSegments.split(' ').map(iS => iS.split('').sort((a, b) => a - b).join(''));
  // Iterate through and assign the easy ones.
  iSSorted.forEach(iS => {
    if(iS.length === 2) {
      letterMapping[1] = iS;
    } else if(iS.length === 3) {
      letterMapping[7] = iS;
    } else if(iS.length === 4) {
      letterMapping[4] = iS;
    } else if(iS.length === 7) {
      letterMapping[8] = iS;
    }
  });
  // Find the 'a' segment from diffing 1 and 7.
  preimageMapping['a'] = removeOneFromAnotherString(letterMapping[7], letterMapping[1]);
  // Isolate the 6 digit to find 'c' and then 'f' by diffing with 1 letters.
  letterMapping[6] = iSSorted.filter(e => e.length === 6).filter(f => !containsAll(f, letterMapping[1]))[0];
  preimageMapping['c'] = removeOneFromAnotherString(letterMapping[1], letterMapping[6]);
  preimageMapping['f'] = removeOneFromAnotherString(letterMapping[1], preimageMapping['c']);

  // Find the 0 digit then isolate d
  letterMapping[9] = iSSorted.filter(e => e.length === 6).filter(f => containsAll(f, letterMapping[1])).filter(g => containsAll(g, letterMapping[4]))[0];
  letterMapping[0] = iSSorted.filter(e => e.length === 6).filter(f => containsAll(f, letterMapping[1])).filter(g => !containsAll(g, letterMapping[4]))[0];
  preimageMapping['e'] = removeOneFromAnotherString(letterMapping[8], letterMapping[9]);
  preimageMapping['d'] = removeOneFromAnotherString(letterMapping[8], letterMapping[0]);
  preimageMapping['b'] = removeOneFromAnotherString(letterMapping[4], preimageMapping['c'] + preimageMapping['d'] + preimageMapping['f']);
  preimageMapping['g'] = removeOneFromAnotherString(letterMapping[8], preimageMapping['a'] + preimageMapping['b'] + preimageMapping['c'] + preimageMapping['d'] + preimageMapping['e'] + preimageMapping['f']);
  letterMapping[2] = preimageMapping['a'] + preimageMapping['c'] + preimageMapping['d'] + preimageMapping['e'] + preimageMapping['g'];
  letterMapping[3] = preimageMapping['a'] + preimageMapping['c'] + preimageMapping['d'] + preimageMapping['f'] + preimageMapping['g'];
  letterMapping[5] = preimageMapping['a'] + preimageMapping['b'] + preimageMapping['d'] + preimageMapping['f'] + preimageMapping['g'];

  const stringResult =  outputSegments.split(' ').map(oS => {
    return Object.keys(letterMapping).find(key => stringsContainSameLetters(letterMapping[key], oS));
  }).join('');
  return parseInt(stringResult, 10);
};
let runTotal = 0;
linesRead.forEach(line => {
  runTotal += processLine(line);
});

console.log(runTotal);