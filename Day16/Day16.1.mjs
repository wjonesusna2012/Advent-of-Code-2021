import fs from 'fs';
import { convertHexToBinaryArray, processPacket } from './helperFunctions.mjs';

const data = fs.readFileSync('./Day16.1.txt', 'utf-8');
const linesRead = data.split('\n');

linesRead.forEach(l => {
  const binaryArray = convertHexToBinaryArray(l);
  console.log(processPacket(binaryArray, 0).value);
});
