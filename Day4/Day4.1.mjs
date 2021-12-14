import fs from 'fs';

const data = fs.readFileSync('./Day4.1.txt', 'utf-8');
const linesRead = data.split('\n');


export const sumBoard = board => {
  let sum = 0;
  board.forEach(hor => {
    hor.forEach(vert => {
      sum += vert !== -1 ? vert : 0;
    });
  });
  return sum;
};

export const checkIfWin = board => {
  // Check horizontal 
  for (const horLine of board) {
    if(horLine.reduce((prev, curr) => curr + prev, 0) === -5) {
      return sumBoard(board);
    }
  };
  // Check vertical lines
  for (let vert = 0; vert < board.length; vert++) {
    if(board.map(b => b[vert]).reduce((prev, curr) => curr + prev, 0) === -5) {
      return sumBoard(board);
    }
  }
  // Uncomment when you need diagonal wins as well
  // Check diagonals
  // let sum = 0;
  // for (let hor = 0; hor < board.length; hor++) {
  //   sum += board[hor][hor];
  // }
  // if (sum === -5) {
  //   return sumBoard(board);
  // }
  // sum = 0;
  // for (let hor = 0; hor < board.length; hor++) {
  //   sum += board[hor][board.length - (1 + hor)];
  // }
  // if (sum === -5) {
  //   return sumBoard(board);
  // }
  return false;
};

export const replaceBoardByInput = (board, input) => {
  for (let hor = 0; hor < board.length; hor ++) {
    for (let vert = 0; vert < board[hor].length; vert++) {
      if (board[hor][vert] === input) {
        board[hor][vert] = -1;
        return;
      }
    }
  }
};

export const playARoundWithBoardsAndInput = (boardArray, input) => {
  for (const bA of boardArray) {
    // Modifies the boards as necessary
    replaceBoardByInput(bA, input);
    // Returns the product if win, false otherwise
    const result = checkIfWin(bA); 
    if (result !== false) {
      return  result * input;
    }
  }
  return false;
};

const constructBoardArrayAndInputArray = lines => {
  const bingoInputs = lines[0].split(',').map(e => parseInt(e, 10));
  const boardInputLines = lines.slice(2);
  const boardArray = [];
  for (let i = 0; i < boardInputLines.length; ) {
    const boardUnderConstruction = [];
    // I'm lazy just do this five times and javascript doesn't have a scanner.
    boardUnderConstruction.push(boardInputLines[i].trim().split(/\s+/).map(e => parseInt(e, 10)));
    i++;
    boardUnderConstruction.push(boardInputLines[i].trim().split(/\s+/).map(e => parseInt(e, 10)));
    i++;
    boardUnderConstruction.push(boardInputLines[i].trim().split(/\s+/).map(e => parseInt(e, 10)));
    i++;
    boardUnderConstruction.push(boardInputLines[i].trim().split(/\s+/).map(e => parseInt(e, 10)));
    i++;
    boardUnderConstruction.push(boardInputLines[i].trim().split(/\s+/).map(e => parseInt(e, 10)));
    i++;
    // Burn the empty line
    i++;
    boardArray.push(boardUnderConstruction);
  }
  return { bingoInputs, boardArray };
}

const { bingoInputs, boardArray } = constructBoardArrayAndInputArray(linesRead);

let result = false;
let inputIndex = 0;
while (!result) {
  result = playARoundWithBoardsAndInput(boardArray, bingoInputs[inputIndex]);
  inputIndex++;
}

console.log(result);
