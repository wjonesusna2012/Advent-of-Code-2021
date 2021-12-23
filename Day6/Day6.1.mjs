import fs from 'fs';
const data = fs.readFileSync('./Day6.1.txt', 'utf-8');
const linesRead = data.split('\n');

const arrayOfLanternFish = linesRead[0].split(',').map(e => parseInt(e, 10));

let lanternFishCount = Array(9).fill(0);

arrayOfLanternFish.forEach(fish => {
  lanternFishCount[fish]++;
});

const processLanternFishCycle = c => {
  const copyOfLanternFish = Array(9).fill(0);
  for (let j = 0; j < c.length; j++) {
    if (j === 0) {
      copyOfLanternFish[8] = c[0];
      copyOfLanternFish[6] = c[0];
    }
    else copyOfLanternFish[j - 1] += c[j];
  }
  return copyOfLanternFish;
}

const steps = 256;
for (let i = 0; i < steps; i++) {
  lanternFishCount = processLanternFishCycle(lanternFishCount);
}

console.log(lanternFishCount.reduce((prev, curr) => prev + curr, 0));
