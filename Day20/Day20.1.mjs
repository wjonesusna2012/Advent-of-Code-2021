import fs from 'fs';

const transformPixel = (pixelArray, x, y, algorithm) => {

};
const data = fs.readFileSync('./Day20.1.test.txt', 'utf-8');
const linesRead = data.split('\n');

const algorithm = linesRead[0].split('').map(e => e === '#' ? true : false);

const steps = 2;
const buffer = steps * 2;

const desiredSize = buffer * 2 + linesRead[2].length;

const pixelArray = Array(desiredSize).fill(false).map(e => Array(desiredSize).fill(false));
console.log(pixelArray);

for(let i = 0; i < linesRead[2].length; i++) {
  for(let j = 0; j < linesRead[2].length; j++) {
    pixelArray[i + buffer][j+buffer] = linesRead[i+2][j] === '#' ? true : false;
  }
}



console.log(pixelArray);