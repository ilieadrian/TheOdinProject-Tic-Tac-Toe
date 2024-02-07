// gameboard
const Gameboard = (function () {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell([i]));
    }
  }

  const getBoard = () => board;

  const placeMark = (row, column, player) => {
    if (row >= 0 && row < rows && column >= 0 && column < columns) {
      if(!board[row][column].isOccupied()) {
        board[row][column].addMark(player);
      } else {
        console.log("Cell is already occupied");
      }
    } else {
      console.error("Invalid row or column");
    }
    
  };

//  !!!
  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
    console.table(boardWithCellValues);
  };
//  !!!

  return { getBoard, placeMark, printBoard };
})();


function Cell() {
  let value = 0;

  const addMark = (player) => {
    value = player;
  };

  const isOccupied  = () => value !== 0;

  const getValue = () => value;

  return {
    addMark,
    getValue,
    isOccupied
  };
}


Gameboard.placeMark(0, 1, "x")

console.log(Gameboard.printBoard())



// gamecontroller
// check for all winning 3-in-a-rows and ties

// player


// handle the display/DOM logic
// Once you have a working console game, create an object that will handle the display/DOM logic.
// Write a function that will render the contents
//  of the gameboard array to the webpage 
//  (for now, you can always just fill the gameboard array with "X"s and "O"s just
//   to see what’s going on).


// Write the functions that allow players to add marks to a specific spot on the board by interacting 
// with the appropriate DOM elements (e.g. letting players click on a board square to place their marker). 
// Don’t forget the logic that keeps players from playing in spots that are already taken!



// Clean up the interface to allow players to put in their names, include a button to start/restart the game 
// and add a display element that shows the results upon game end!



  