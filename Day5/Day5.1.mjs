import fs from 'fs';

const isHorizontalOrVertical = (x1, y1, x2, y2) => {
  return x1 === x2 || y1 === y2;
};

const getMaxXAndY = arrayOfPoints => {
  let xMax = -Infinity;
  let yMax = -Infinity;
  arrayOfPoints.forEach(aOP => {
    const [x1, y1, x2, y2] = aOP;
    xMax = Math.max(xMax, x1, x2);
    yMax = Math.max(yMax, y1, y2);
  });
  return { xMax, yMax };
};

const constructArrayOfPoints = lines => {
  return lines.map(l => {
    const [firstCoor, secondCoor] = l.split('->');
    const [x1, y1] = firstCoor.trim().split(',').map(e => parseInt(e, 10));
    const [x2, y2] = secondCoor.trim().split(',').map(e => parseInt(e, 10));
    return [x1, y1, x2, y2];
  });
}

const fillPoints = (matrix, x1, y1, x2, y2) => {
  let steps = Math.max(Math.abs(x2-x1), Math.abs(y2-y1));
  let rise = (y2 - y1) / steps;
  let run = (x2 - x1) / steps;
  for (let i = 0; i <= steps; i++) {
    matrix[x1 + i*run][y1 + i*rise] += 1;
  }
}

const data = fs.readFileSync('./Day5.1.txt', 'utf-8');
const linesRead = data.split('\n');

const pointArray = constructArrayOfPoints(linesRead);
const { xMax, yMax } = getMaxXAndY(pointArray);

const countArray = new Array(xMax + 1).fill(0).map(() => new Array(yMax + 1).fill(0));
pointArray.forEach(pA => {
  fillPoints(countArray, ...pA);
});

let twoCounter = 0;

for (let x = 0; x <= xMax; x++) {
  for (let y = 0; y <= yMax; y++) {
    if (countArray[x][y] >= 2) twoCounter++ 
  }
}

console.log(twoCounter);