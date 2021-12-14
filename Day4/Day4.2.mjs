import fs from 'fs';
import { constructBoardArrayAndInputArray } from './Day4.1.mjs';

const data = fs.readFileSync('./Day4.1.txt', 'utf-8');
const linesRead = data.split('\n');

const { bingoInputs, boardArray } = constructBoardArrayAndInputArray(linesRead);

let result = false;
let inputIndex = 0;
while (!result) {
  result = playARoundWithBoardsAndInput(boardArray, bingoInputs[inputIndex]);
  inputIndex++;
}

console.log(result);