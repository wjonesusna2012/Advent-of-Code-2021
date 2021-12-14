import fs from 'fs';
import _ from 'lodash';

const data = fs.readFileSync('./Day13.1.txt', 'utf-8');
const linesRead = data.split('\n');

export const constructCoordinateArrayAndFoldingInstructions = lines => {
  let index = 0;
  const cA = [];
  const dA = [];
  while(lines[index] !== '') {
    const [xCoor, yCoor] = lines[index].split(',').map(e => parseInt(e, 10));
    cA.push([xCoor, yCoor]);
    index++;
  }
  index++;
  for (let i = index; i < lines.length; i++) {
    const [direction, units] = lines[i].split(' ')[2].split('=');
    dA.push([direction, parseInt(units, 10)]);
  }
  return { cA, dA };
};

export const reflectCoordinatesAlongLine = (coorArray, axis, offset) => {
  const coordinates = [...coorArray];
  for (let i = 0; i < coordinates.length; i++) {
    if (axis === 'x') {
      const [xCoor, yCoor] = coordinates[i];
      if(xCoor > offset) coordinates[i] = [offset - (xCoor - offset), yCoor];
    }
    else if (axis === 'y') {
      const [xCoor, yCoor] = coordinates[i];
      if(yCoor > offset) coordinates[i] = [xCoor, offset - (yCoor - offset)];
    }
  }
  return coordinates;
};

const consolidateCoordinateArray = coordinateArray => {
  return _.uniqWith(coordinateArray, _.isEqual);
}

const getMaxes = c => {
  let maxX = 0;
  let maxY = 0;
  c.forEach(a => {
    if (a[0] > maxX) maxX = a[0];
    if (a[1] > maxY) maxY = a[1];
  });
  maxX += 2;
  maxY += 2;
  return { maxX, maxY };
};

const drawOutputArray = outputArray => {
  const { maxX, maxY } = getMaxes(cA);
  const outlineArray = Array(maxX).fill().map(()=>Array(maxY).fill(' '));

  outputArray.forEach(oA => {
    const [x, y] = oA;
    outlineArray[x][y] = '*';
  });

  let outputString = '';
  for (let yC = 0; yC < outlineArray[0].length; yC++) {
    for (let xC = 0; xC < outlineArray.length; xC++) {
      outputString += outlineArray[xC][yC] + ' ';
    } 
    outputString += '\n';
  }
  console.log(outputString);
}

let { cA, dA } = constructCoordinateArrayAndFoldingInstructions(linesRead);
for (let i = 0; i < dA.length; i++) {
  cA = reflectCoordinatesAlongLine(cA, dA[i][0], dA[i][1]);
  cA = consolidateCoordinateArray(cA);
}

console.log(cA);
drawOutputArray(cA);
