// gameboard
const Gameboard = function () {
  const rows = 3;
  const columns = 3;
  let board = [];

  for (let i = 0; i < columns; i++) {
    board[i] = [];
    for (let j = 0; j < rows; j++) {
      board[i].push(Cell(i));
    }
  }

// Test space
const createDiv = () => {
  const playGrid = document.getElementById("play-grid");
  let gridItem = document.createElement("div");
  gridItem.classList = "cell";

  playGrid.appendChild(gridItem);
}

const displayBoard = () => {
  const boardLoop = board.map((row) => row.map((cell) => createDiv()))
  console.table("From displayBoard",  boardLoop);
};

displayBoard()

// Test space




  const initializeBoard = () => {
    board = [];
    for (let i = 0; i < columns; i++) {
      board[i] = [];
      for (let j = 0; j < rows; j++) {
        board[i].push(Cell());
      }
    }
  };

  const getBoard = () => board;

  const resetBoard = () => {
    initializeBoard();
  };

    const placeMark = (column, row, playerMark) => {
    if (row >= 0 && row < rows && column >= 0 && column < columns) {
      if(!board[column][row].isOccupied()) {
        board[column][row].placeMark(playerMark);
      } else {
        console.log("Cell is already occupied");
      }
    } else {
      console.error("Invalid row or column");
    }
  };

//  Remove after DOM intercation is added!!!
  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
    console.table(boardWithCellValues);
  };
//  !!!

  return { getBoard, resetBoard, displayBoard, placeMark, printBoard, board,  };
};

function Cell() {
  let value = 0;

  const placeMark = (playerMark) => {
    value = playerMark;
  };

  const isOccupied = () => value !== 0;

  const getValue = () => value;

  return { placeMark, getValue, isOccupied };
}

// function updateDOM() {
//   const playGrid = document.getElementById("play-grid");
//   const currentBoard = GameController.getBoard;
//   // const cell = ;

//   console.log("DOM CELL", currentBoard);
// };

function CreateUser(name, mark) {
  let wins = 0;
  let userName = name;
  let userMark = mark;

  const getWins = () => wins;
  const addWin = () => wins++;

  return { userName, userMark, getWins, addWin }
}

// gamecontroller
function GameController(playerOne, playerTwo) {
  const board = Gameboard();
  const playerOneObj = CreateUser(playerOne, "X");
  const playerTwoObj = CreateUser(playerTwo, "0");

  const players = [playerOneObj, playerTwoObj];
  
  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const getActivePlayerMark = () => activePlayer.userMark;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().userName}'s turn.`);
    console.log(`Wins - ${playerOneObj.userName}: ${playerOneObj.getWins()}, ${playerTwoObj.userName}: ${playerTwoObj.getWins()}`);
  };

  const playRound = (column, row) => {
    console.log(
      `Dropping ${getActivePlayer().userName}'s token into column ${column}, row ${row}...`
    );

    const cell = board.getBoard()[column][row];

    if (!cell.isOccupied()) {
      
      board.placeMark(column, row, getActivePlayerMark());

      checkWinner();

      switchPlayerTurn();
      printNewRound();
      
    } else {
      console.log("Cell is already occupied");
      return;
    }
  };

const checkWinner = () => {
  const cellsFlatened = getBoard().flat().map((cell) => cell.getValue());
  // console.log(cellsFlatened)

  // Check for a winner in the vertical direction
  for (let i = 0; i < 3; i++) {
      if (
          cellsFlatened[i] !== 0 &&
          cellsFlatened[i] === cellsFlatened[i + 3] &&
          cellsFlatened[i] === cellsFlatened[i + 6]
      ) {
          
          console.log(`Player ${cellsFlatened[i]} wins vertically!`);
          printNewRound();
          getActivePlayer().addWin();
          console.log(getActivePlayer().userName, getActivePlayer().getWins());
          console.log("A round has ended");
          board.resetBoard();
          return;
      }  
  }

  // Check for a winner in the horizontal direction
  for (let i = 0; i < 9; i += 3) {
      if (
          cellsFlatened[i] !== 0 &&
          cellsFlatened[i] === cellsFlatened[i + 1] &&
          cellsFlatened[i] === cellsFlatened[i + 2]
      ) {
          console.log(`Player ${cellsFlatened[i]} wins horizontally!`);
          printNewRound();
          getActivePlayer().addWin();
          console.log(getActivePlayer().userName, getActivePlayer().getWins());
          console.log("A round has ended");
          board.resetBoard();
          return;
      } 
  }

  // Check for a winner in the diagonal direction
  if (
      cellsFlatened[0] !== 0 &&
      cellsFlatened[0] === cellsFlatened[4] &&
      cellsFlatened[0] === cellsFlatened[8]
  ) {
      console.log(`Player ${cellsFlatened[0]} wins diagonally (from top-left to bottom-right)!`);
      printNewRound();
      getActivePlayer().addWin();
      console.log(getActivePlayer().userName, getActivePlayer().getWins());
      console.log("A round has ended");
      board.resetBoard();
      return;
  } 
  if (
      cellsFlatened[2] !== 0 &&
      cellsFlatened[2] === cellsFlatened[4] &&
      cellsFlatened[2] === cellsFlatened[6]
  ) {
      console.log(`Player ${cellsFlatened[2]} wins diagonally (from top-right to bottom-left)!`);
      printNewRound();
      getActivePlayer().addWin();
      console.log(getActivePlayer().userName, getActivePlayer().getWins());
      console.log("A round has ended");
      board.resetBoard();
      return;
  } 

  // Check for a tie
  if (!cellsFlatened.includes(0)) {
      printNewRound();
      console.log("It's a tie!");
      console.log("A round has ended");
      board.resetBoard();
  } 
};
  const getBoard = () => board.getBoard();

  printNewRound();
    
  return { playRound, getActivePlayer, checkWinner, getBoard };

}

const game = GameController("Camy", "Amy");


                  // Test game scenarios
                  // Winning Horizontally: 
//Top row
game.playRound(0, 0); 
game.playRound(1, 1); 

// game.playRound(0, 1); 
// game.playRound(1, 2); 
// game.playRound(0, 2); 

//Middle row
// game.playRound(0, 0); 
// game.playRound(1, 0); 
// game.playRound(2, 0); 
// game.playRound(1, 1); 
// game.playRound(2, 1); 
// game.playRound(1, 2); // Player Two (O) wins horizontally!


// Winning Horizontally:
// Bottowm row
// game.playRound(2, 0); 
// game.playRound(1, 1); 
// game.playRound(2, 1); 
// game.playRound(1, 2); 
// game.playRound(2, 2); // Player One (X) wins horizontally!

                    // Winning Vertically:
//Left column
// game.playRound(0, 0); 
// game.playRound(1, 1); 
// game.playRound(1, 0); 
// game.playRound(2, 1); 
// game.playRound(2, 0); 


// Center column
// game.playRound(0, 1); 
// game.playRound(0, 2); 
// game.playRound(1, 1); 
// game.playRound(1, 2); 
// game.playRound(2, 1); 
// game.playRound(2, 2); 


// Right column
// game.playRound(0, 1); 
// game.playRound(0, 2); 
// game.playRound(1, 1); 
// game.playRound(1, 2); 
// game.playRound(2, 0); 
// game.playRound(2, 2); 

                    // Winning diagonally:
//Top-left to bottom-right
// game.playRound(0, 0); 
// game.playRound(0, 2); 
// game.playRound(1, 1); 
// game.playRound(1, 0); 
// game.playRound(2, 2);
// // game.playRound(2, 0); 

//Top-right to bottom-left
// game.playRound(0, 2); 
// game.playRound(0, 0); 
// game.playRound(1, 1); 
// game.playRound(1, 2); 
// game.playRound(2, 0); 
// game.playRound(2, 2);

                    // Tie scenario
// game.playRound(0, 0); // Player One (X)
// game.playRound(0, 1); // Player Two (O)
// game.playRound(0, 2); // Player One (X)

// game.playRound(2, 0); // Player Two (O)
// game.playRound(1, 1); // Player One (X)
// game.playRound(1, 2); // Player Two (O)

// game.playRound(1, 0); // Player One (X)
// game.playRound(2, 2); // Player Two (O)
// game.playRound(2, 1); // Player One (X)
// updateDOM();










// check for all winning 3-in-a-rows and ties

// player





// Gameboard.placeMark(0, 1, "x")

// console.log(Gameboard.printBoard())


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



  