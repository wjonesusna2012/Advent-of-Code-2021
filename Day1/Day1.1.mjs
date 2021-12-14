import fs from 'fs';

const data = fs.readFileSync('./Day1.1.txt', 'utf-8');
const dataArray = data.split('\n').map(e => parseInt(e, 10)); 
export const dataArrayCalculate = (dataArray) => {
  let compareDataPoint = dataArray[0];
  let peaks = 0;
  for (let i = 1; i < dataArray.length; i++) {
    if (dataArray[i] > compareDataPoint) peaks++;
    compareDataPoint = dataArray[i];
  }
  return peaks;
}
