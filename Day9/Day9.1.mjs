import fs from 'fs';
const data = fs.readFileSync('./Day9.1.txt', 'utf-8');
const linesRead = data.split('\n');

const checkIfLowest = (matrix, x, y) => {
  const verticalLength = matrix.length;
  const horizontalLength = matrix[0].length;
  let lowest = true;
  if (x > 0) lowest &= (matrix[x-1][y] > matrix[x][y]);
  if (x < verticalLength - 1) lowest &= (matrix[x + 1][y] > matrix[x][y]);
  if (y > 0) lowest &= (matrix[x][y-1] > matrix[x][y]);
  if (y < horizontalLength - 1) lowest &= (matrix[x][y + 1] > matrix[x][y]);
  return lowest;
}

const matrix = Array(linesRead.length).fill(0).map(e => Array(linesRead[0].split('').length));
linesRead.forEach((line, index) => {
  matrix[index] = line.split('').map(e => parseInt(e, 10));
});

let num = 0;
for(let i = 0; i < matrix.length; i++) {
  for(let j = 0; j < matrix[i].length; j++) {
    if(checkIfLowest(matrix, i, j)) num += (matrix[i][j] + 1);
  }
}

console.log(num);