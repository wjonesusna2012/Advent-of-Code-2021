import { dataArrayCalculate } from "./Day1.1.mjs";
import fs from 'fs';

const data = fs.readFileSync('./Day1.1.txt', 'utf-8');
const dataA = data.split('\n').map(e => parseInt(e, 10)); 

export const transformBySlidingFilter = (dataArray, windowSize) => {
  const transformedArray = [];
  for (let i = 0; i + windowSize <= dataArray.length; i++) {
    transformedArray.push(dataArray.slice(i, i+windowSize).reduce((prev, curr) => prev + curr, 0));
  }
  return transformedArray;
}

console.log(dataArrayCalculate(transformBySlidingFilter(dataA, 1)));
console.log(dataArrayCalculate(transformBySlidingFilter(dataA, 3)));