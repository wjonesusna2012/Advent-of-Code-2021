import fs from 'fs';
const data = fs.readFileSync('./Day6.1.txt', 'utf-8');
const linesRead = data.split('\n');

const posArray = linesRead[0].split(',').map(e => parseInt(e, 10));

const max = Math.max(...posArray);
let minFuel = Infinity;

for(let i = 0; i < max; i++) {
  const metric = posArray.reduce((prev, curr) => {
    const distance = Math.abs(curr - i);
    return prev + (distance * (distance + 1))/2; 
  }, 0);
  if (metric <= minFuel) minFuel = metric;
  else break;
}

console.log(minFuel);
