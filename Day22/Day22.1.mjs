import fs from 'fs';

const data = fs.readFileSync('./Day22.1.txt', 'utf-8');
const linesRead = data.split('\n');

class Cube {
  constructor(xMin, xMax, yMin, yMax, zMin, zMax) {
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin; 
    this.yMax = yMax;
    this.zMin = zMin;
    this.zMax = zMax;
  }
  static rangeOverlap(rangeOne, rangeTwo) {
    return ((rangeOne[0] >= rangeTwo[0] && rangeOne[0] <= rangeTwo[1]) || 
    (rangeOne[1] >= rangeTwo[0] && rangeOne[1] <= rangeTwo[1]) ||
    (rangeTwo[0] >= rangeOne[0] && rangeTwo[0] <= rangeOne[1]) || 
    (rangeTwo[1] >= rangeOne[0] && rangeTwo[1] <= rangeOne[1]));
  }

  static calculateRangeOverlap(rangeOne, rangeTwo) {
    if (rangeOne[0] >= rangeTwo[0] && rangeOne[0] <= rangeTwo[1]) {
      return [rangeOne[0], Math.min(rangeOne[1], rangeTwo[1])];
    }
    if (rangeOne[1] >= rangeTwo[0] && rangeOne[1] <= rangeTwo[1]) {
      return [Math.max(rangeOne[0], rangeTwo[0]), rangeOne[1]];
    }
    if (rangeTwo[0] >= rangeOne[0] && rangeTwo[0] <= rangeOne[1]) {
      return [rangeTwo[0], Math.min(rangeOne[1], rangeTwo[1])];
    }
    if (rangeTwo[1] >= rangeOne[0] && rangeTwo[1] <= rangeOne[1]) {
      return [Math.max(rangeOne[0], rangeTwo[1], rangeTwo[1])];
    }
    return [-Infinity, -Infinity];
  }

  static doesIntersect(cubeOne, cubeTwo) {
    return this.rangeOverlap([cubeOne.xMin, cubeOne.xMax], [cubeTwo.xMin, cubeTwo.xMax]) 
      && this.rangeOverlap([cubeOne.yMin, cubeOne.yMax], [cubeTwo.yMin, cubeTwo.yMax])
      && this.rangeOverlap([cubeOne.zMin, cubeOne.zMax], [cubeTwo.zMin, cubeTwo.zMax]);
  }

  static splitCubes(incomingCube, cubeToSplit) {
    const xOverlap = this.calculateRangeOverlap([incomingCube.xMin, incomingCube.xMax], [cubeToSplit.xMin, cubeToSplit.xMax]);
    const yOverlap = this.calculateRangeOverlap([incomingCube.yMin, incomingCube.yMax], [cubeToSplit.yMin, cubeToSplit.yMax]);
    const zOverlap = this.calculateRangeOverlap([incomingCube.zMin, incomingCube.zMax], [cubeToSplit.zMin, cubeToSplit.zMax]);

    const [xRanges, yRanges, zRanges] = this.generateRanges(xOverlap, yOverlap, zOverlap, cubeToSplit);
    const cubeListFromSplitting = [];
    
    for(let x = 0; x < 3; x++) {
      for(let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
          if(x === 1 && y === 1 && z ===1) {
            //Do nothing
          }
          else {
            const newCube = this.generateNewCubeFromRanges(xRanges[x], yRanges[y], zRanges[z])
            if (newCube !== false) cubeListFromSplitting.push(newCube);
          }
        }
      }
    }
    return cubeListFromSplitting;
  } 
  static generateNewCubeFromRanges(xRange, yRange, zRange) {
    if(xRange.length > 0 && yRange.length > 0 && zRange.length > 0) return new Cube(xRange[0], xRange[1], yRange[0], yRange[1], zRange[0], zRange[1]);
    return false;
  }

  static generateOverlapRanges(removeRange, originalRange) {
    const rangesToReturn = [];
    if(originalRange[0] < removeRange[0]) rangesToReturn.push([originalRange[0], removeRange[0] - 1]);
    else rangesToReturn.push([]);
    rangesToReturn.push([removeRange[0], removeRange[1]]);
    if(removeRange[1] < originalRange[1]) rangesToReturn.push([removeRange[1] + 1, originalRange[1]]);
    else rangesToReturn.push([]);
    return rangesToReturn;
  }

  static generateRanges (xRangeToRemove, yRangeToRemove, zRangeToRemove, cubeToSplit) {
    const xRangeArray = this.generateOverlapRanges(xRangeToRemove, [cubeToSplit.xMin, cubeToSplit.xMax]);
    const yRangeArray = this.generateOverlapRanges(yRangeToRemove, [cubeToSplit.yMin, cubeToSplit.yMax]);
    const zRangeArray = this.generateOverlapRanges(zRangeToRemove, [cubeToSplit.zMin, cubeToSplit.zMax]);
    return [xRangeArray, yRangeArray, zRangeArray];
  }

  calculateArea() {
    return (this.xMax-this.xMin+1) * (this.yMax-this.yMin+1) * (this.zMax-this.zMin+1);
  }
}

const removeListOfCubes = (isOn, xMin, xMax, yMin, yMax, zMin, zMax, cubeList) => {
  const updatedListOfCubes = [];
  const constructedCube = new Cube(xMin, xMax, yMin, yMax, zMin, zMax);
  cubeList.forEach(cL => {
    if(Cube.doesIntersect(cL, constructedCube)) {
      const listOfSplitCubes = Cube.splitCubes(constructedCube, cL);
      updatedListOfCubes.push(...listOfSplitCubes);
    }
    else {
      updatedListOfCubes.push(cL);
    }
  });
  if(isOn) { // Add the new cube if the instruction is to be turned on.
    updatedListOfCubes.push(constructedCube);
  }
  return updatedListOfCubes;
}

let listOfCubes = [];
console.time('test');
linesRead.forEach(line => {
  const [onOff, coors] = line.split(' ');
  const [xRange, yRange, zRange] = coors.split(',');
  const [xNotUsed, xNums] = xRange.split('=');
  const [yNotUsed, yNums] = yRange.split('=');
  const [zNotUsed, zNums] = zRange.split('=');
  const [xMin, xMax] = xNums.split('..').map(e => parseInt(e, 10)); 
  const [yMin, yMax] = yNums.split('..').map(e => parseInt(e, 10)); 
  const [zMin, zMax] = zNums.split('..').map(e => parseInt(e, 10)); 

  listOfCubes = removeListOfCubes(onOff === 'on', xMin, xMax, yMin, yMax, zMin, zMax, listOfCubes); 
});

console.log(listOfCubes.reduce((prev, curr) => prev + curr.calculateArea(), 0));
console.timeEnd('test');

// D - 14000
// C - 1200
// B - 150
// A - 17