import fs from 'fs';

// const data = fs.readFileSync('./Day21.1.txt', 'utf-8');
// const linesRead = data.split('\n');

let player1Pos = 10;
let player2Pos = 2;
let player1Score = 0;
let player2Score = 0;
let player1Turn = true;

var diceCount = 1;
var totalDiceRoll = 0;

const incrementDiceCount = () => {
  diceCount++;
  if (diceCount === 101) diceCount = 1;
}

const rollDice = (player1, times) => {
  for (let i = 1; i <= times; i++) {
    if(player1) {
      player1Pos = (player1Pos + diceCount) % 10; 
      if (player1Pos === 0) player1Pos = 10;
    }
    else {
      player2Pos = (player2Pos + diceCount) % 10; 
      if (player2Pos === 0) player2Pos = 10;
    }
    incrementDiceCount();
    totalDiceRoll++;
  }
  if (player1) player1Score += player1Pos;
  else player2Score += player2Pos;
}
while (player2Score < 1000 && player1Score < 1000) {
  if (player1Turn) {
    rollDice(true, 3);
  } else {
    rollDice(false, 3);
  }
  player1Turn = !player1Turn;
}

console.log(player1Score, player2Score, diceCount);

if (player1Score >= 1000) console.log(player2Score * totalDiceRoll);
if (player2Score >= 1000) console.log(player1Score * totalDiceRoll);

