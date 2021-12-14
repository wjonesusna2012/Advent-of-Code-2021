import fs from 'fs';

const data = fs.readFileSync('./Day3.1.txt', 'utf-8');
const linesArray = data.split('\n');

const trimBasedOnIndex = (arrayOfPossibilities, index, oneOrZero) => {
  return arrayOfPossibilities.filter(aOP => aOP[index] === oneOrZero);
};

const determineTrimOnOneOrZeroForOxygen = (arrayOfPossibilities, index) => {
  const sequence = arrayOfPossibilities.map(aOP => aOP[index]);
  const numOnes = sequence.filter(a => a === '1').length;
  const numZeroes = sequence.length - numOnes;
  if (numOnes >= numZeroes) return '1';
  return '0';
};

const determineTrimOnOneOrZeroForCO2 = (arrayOfPossibilities, index) => {
  const sequence = arrayOfPossibilities.map(aOP => aOP[index]);
  const numOnes = sequence.filter(a => a === '1').length;
  const numZeroes = sequence.length - numOnes;
  if (numZeroes <= numOnes) return '0';
  return '1';
};

export const calculateOxygenAndCO2 = lines => {
  let oxygen;
  let co2;
  let index = 0;
  let oxygenList = [...lines]; 
  let co2List = [...lines];

  while(oxygenList.length > 1) {
    oxygenList = trimBasedOnIndex(oxygenList, index, determineTrimOnOneOrZeroForOxygen(oxygenList, index));
    index ++;
  }
  index = 0;
  while(co2List.length > 1) {
    co2List = trimBasedOnIndex(co2List, index, determineTrimOnOneOrZeroForCO2(co2List, index));
    index ++;
  }
  oxygen = oxygenList[0];
  co2 = co2List[0];
  return [parseInt(oxygen, 2), parseInt(co2, 2)];
}

const result = calculateOxygenAndCO2(linesArray);
console.log(result[0] * result[1]);