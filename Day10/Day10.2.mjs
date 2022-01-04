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
      return [i, charStack];
    }
  }
  return ['NO ERROR', charStack];
}
const scores = [];
linesRead.forEach(line => {
  
  let completionScore = 0;
  const result = checkLineForErrors(line);
  if (result[0] === 'NO ERROR') {
    const charStack = result[1];
    console.log(charStack);
    while(charStack.length > 0) {
      const res = charStack.pop();
      completionScore *= 5;
      completionScore += incompletePoints[res];
    }
    if(completionScore !== 0) scores.push(completionScore);
  }
});
scores.sort((a, b) => a - b);
console.log(scores);
console.log(scores[Math.floor(scores.length / 2)]);