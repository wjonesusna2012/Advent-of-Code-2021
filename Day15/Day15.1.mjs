import fs from 'fs';
import { readPathFromLines } from './helperFunctions.mjs';

const data = fs.readFileSync('./Day15.1.txt', 'utf-8');
const linesRead = data.split('\n');

const nodeMatrix = readPathFromLines(linesRead);
console.log(nodeMatrix);