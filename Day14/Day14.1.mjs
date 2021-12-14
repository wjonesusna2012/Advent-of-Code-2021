import fs from 'fs';
import { 
  maxMinusMin, 
  constructPolymerSequenceAndReplacements, 
  constructPairsObject, 
  updatePairsObjectCount, 
  countLettersFromPairsObject 
} from './helperFunctions.mjs';

const data = fs.readFileSync('./Day14.1.txt', 'utf-8');
const linesRead = data.split('\n');

const steps = 40;

const { polymerSequence, replacements } = constructPolymerSequenceAndReplacements(linesRead);

let pairsObject = constructPairsObject(polymerSequence);
for (let i = 0; i < steps; i++) {
  pairsObject = updatePairsObjectCount(pairsObject, replacements); 
}

const countObject = countLettersFromPairsObject(pairsObject);
console.log(maxMinusMin(countObject));

