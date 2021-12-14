import fs from 'fs';

const data = fs.readFileSync('./Day2.1.txt', 'utf-8');
const linesArray = data.split('\n');

export const calculatePosition = lines => {
  let depth = 0;
  let distance = 0;
  let aim = 0;
  lines.forEach(l => {
    const [direction, unit] = l.split(' ');
    switch(direction) {
      case 'forward':
        distance += parseInt(unit, 10);
        depth += parseInt(unit, 10) * aim;
        break;
      case 'up':
        aim -= parseInt(unit, 10);
        break;
      case 'down':
        aim += parseInt(unit, 10);
        break;
    }
  });
  return depth * distance; 
}

console.log(calculatePosition(linesArray));