import fs from 'fs';
const data = fs.readFileSync('./Day10.1.txt', 'utf-8');

const linesRead = data.split('\n');

const openingCharacters = '([{<';
const closeMapping = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};
const errorPoints = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const incompletePoints = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
};
const checkLineForErrors = line => {
  const characterStream = line.split('');
  let charStack = [];
  for(const i of characterStream) {
    if(openingCharacters.indexOf(i) > -1) {
      charStack.push(i);
    } else {
      const previousOpeningCharacter = charStack.pop();
      if(previousOpeningCharacter && closeMapping[previousOpeningCharacter] === i) continue;
      return i;
    }
  }
  return 'NO ERROR';
}
let errorScore = 0;
linesRead.forEach(line => {
  
  const result = checkLineForErrors(line);
  if (result !== 'NO ERROR') {
    errorScore += errorPoints[result];
  }
});
console.log(errorScore);
