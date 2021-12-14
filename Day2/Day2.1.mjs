import fs from 'fs';

const data = fs.readFileSync('./Day2.1.test.txt', 'utf-8');
const linesArray = data.split('\n');

export const calculatePosition = lines => {
  let depth = 0;
  let distance = 0;
  lines.forEach(l => {
    const [direction, unit] = l.split(' ');
    switch(direction) {
      case 'forward':
        distance += parseInt(unit, 10);
        break;
      case 'up':
        depth -= parseInt(unit, 10);
        break;
      case 'down':
        depth += parseInt(unit, 10);
        break;
    }
  });
  return depth * distance; 
}

console.log(calculatePosition(linesArray));