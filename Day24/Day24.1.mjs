import fs from 'fs';
const data = fs.readFileSync('./Day24.1.txt', 'utf-8');
const linesRead = data.split('\n');

const register = {
  'w': 0,
  'x': 1,
  'y': 17,
  'z': 17,
};

function* nextNum(numStarter) {
  const stringStarter = Number(numStarter).toString().split('');
  for(let i = 0; i < 14; i++) {
    yield parseInt(stringStarter[i], 10);
  }
}


for (let j = 99999999999999; j > 1; j--) {
const gen = nextNum(j);
  if(Number(j).toString().indexOf('0') > -1) continue;
  linesRead.forEach(line => {
    const [operator, storage, variable] = line.split(' ');
    let varToUse;
    if (variable === 'w' || variable === 'x' || variable === 'y' || variable === 'z') {
      varToUse = register[variable];
    } else {
      varToUse = parseInt(variable, 10);
    } 

    switch(operator) {
      case 'inp':
        register[storage] = gen.next().value;
        break;
      case 'add':
        register[storage] += varToUse;
        break;
      case 'mul':
        register[storage] *= varToUse;
        break;
      case 'div':
        register[storage] = Math.floor(register[storage]/varToUse);
        break;
      case 'mod':
        register[storage] = register[storage] % varToUse;
        break;
      case 'eql':
        register[storage] = register[storage] === varToUse ? 1 : 0;
        break;
    }
  });
  console.log(register.z);
  if(register.z === 0)
    console.log(j, register);
  register.w = 0;
  register.x = 0;
  register.y = 0;
  register.z = 0;
};