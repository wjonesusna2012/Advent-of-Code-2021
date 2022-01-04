import fs from 'fs';
const data = fs.readFileSync('./Day9.1.txt', 'utf-8');
const linesRead = data.split('\n');

const matrix = Array(linesRead.length).fill(0).map(e => Array(linesRead[0].split('').length));

const verticalLength = matrix.length;
const horizontalLength = matrix[0].length;

linesRead.forEach((line, index) => {
  matrix[index] = line.split('').map(e => parseInt(e, 10));
});

const countSizeOfBasinAtPoint = (horIndex, vertIndex) => {
  let size = 0;
  if(horIndex >= 0 && horIndex < horizontalLength && vertIndex >= 0 && vertIndex < verticalLength && matrix[vertIndex][horIndex] !== 9) {
    matrix[vertIndex][horIndex] = 9;
    size = 1 + countSizeOfBasinAtPoint(horIndex - 1, vertIndex) + countSizeOfBasinAtPoint(horIndex + 1, vertIndex) + countSizeOfBasinAtPoint(horIndex, vertIndex + 1) + countSizeOfBasinAtPoint(horIndex, vertIndex - 1); 
  }
  return size;
}

let basinSize = [];
for(let i = 0; i < matrix.length; i++) {
  for(let j = 0; j < matrix[i].length; j++) {
    const sizeAtPoint = countSizeOfBasinAtPoint(j, i);
    if(sizeAtPoint > 0) basinSize.push(sizeAtPoint); 
  }
}

basinSize.sort((a, b) => b - a); 
console.log(basinSize.slice(0, 3), basinSize[0] * basinSize[1] * basinSize[2]);