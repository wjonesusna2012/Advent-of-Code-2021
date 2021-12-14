import fs from 'fs';

const data = fs.readFileSync('./Day3.1.txt', 'utf-8');
const linesArray = data.split('\n');

const moreOnes = (sequenceArray) => {
  let ones = 0;
  let zeroes = 0;
  sequenceArray.forEach(sA => {
    sA === '0' ? zeroes++ : ones++
  });
  return ones > zeroes;
}
export const calculateEpsilonAndGamma = lines => {
  let episilon = [];
  let gamma = [];
  for(let i = 0; i < lines[0].length; i++) {
    const eResult = moreOnes(lines.map(l => l[i]));
    if(eResult) {
      episilon.push('1');
      gamma.push('0');
    } else {
      episilon.push('0');
      gamma.push('1');
    }
  }
  return [parseInt(episilon.join(''), 2), parseInt(gamma.join(''), 2)];
}

const result = calculateEpsilonAndGamma(linesArray);
console.log(result[0] * result[1]);