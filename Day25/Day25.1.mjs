import fs from 'fs';
const data = fs.readFileSync('./Day25.1.txt', 'utf-8');
const linesRead = data.split('\n');

const horizontalLength = linesRead[0].length;
const verticalLength = linesRead.length;

let matrix = Array(verticalLength).fill(0).map(e => Array(horizontalLength).fill(0));

linesRead.forEach((lR, outer) => {
  lR.split('').forEach((letter, index) => {
    if (letter === '.') matrix[outer][index] = 0;
    if (letter === '>') matrix[outer][index] = 1;
    if (letter === 'v') matrix[outer][index] = 2;
  });
});

const printMatrix = matrix => {
  for(let i = 0; i < matrix.length; i++) {
    let lineToPrint = '';
    for(let j = 0; j< matrix[i].length; j++) {
      if (matrix[i][j] === 0) lineToPrint += '.';
      if (matrix[i][j] === 1) lineToPrint += '>';
      if (matrix[i][j] === 2) lineToPrint += 'v';
    }
    console.log(lineToPrint);
  }
}
const iterateOnce = (inputMatrix, horLength, vertLength) => {
  const newMatrix = Array(vertLength).fill(0).map(e => Array(horLength).fill(0)); 
  let changed = false;
  for(let i = 0; i < vertLength; i++) {
    for(let j = 0; j < horLength; j++) {
      if(inputMatrix[i][j] === 1){
        if(j < horLength - 1) {
          if(inputMatrix[i][j+1] === 0) {
            newMatrix[i][j+1] = 1;
            newMatrix[i][j] = 0;
            changed = true;
          }
          else newMatrix[i][j] = 1;
        } else {
          if(inputMatrix[i][0] === 0) {
            newMatrix[i][0] = 1;
            newMatrix[i][j] = 0;
            changed = true;
          }
          else newMatrix[i][j] = 1;
        }
      }
      else if(inputMatrix[i][j] === 2)
        newMatrix[i][j] = 2;
    }
  }
  const newMatrixStep2 = Array(vertLength).fill(0).map(e => Array(horLength).fill(0)); 
  for(let i = 0; i < vertLength; i++) {
    for(let j = 0; j < horLength; j++) {
      if(newMatrix[i][j] === 2){
        if(i < vertLength - 1) {
          if(newMatrix[i+1][j] === 0) {
            newMatrixStep2[i+1][j] = 2;
            newMatrixStep2[i][j] = 0;
            changed = true;
          }
          else newMatrixStep2[i][j] = 2;
        } else {
          if(newMatrix[0][j] === 0) {
            newMatrixStep2[0][j] = 2;
            newMatrixStep2[i][j] = 0;
            changed = true;
          }
          else newMatrixStep2[i][j] = 2;
        }
      }
      else if(newMatrix[i][j] === 1)
        newMatrixStep2[i][j] = 1;
    }
  }
  return [changed, newMatrixStep2];
}

let steps = 0;
let changed = true;


while (changed) {
  const [changedPos, matrixReturned] = iterateOnce(matrix, horizontalLength, verticalLength);
  matrix = matrixReturned;
  steps++;
  changed = changedPos;
}

console.log(steps);