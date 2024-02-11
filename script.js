// gameboard
const Gameboard = function () {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell(i));
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

//  Remove after DOM intercation is added!!!
  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
    console.table(boardWithCellValues);
  };
//  !!!

  return { 
    getBoard, 
    placeMark, 
    printBoard, 
    board 
  };
};


function Cell(i) {
  let value = 0;

  const addMark = (player) => {
    value = player;
  };

  const isOccupied  = () => value !== 0;

  const getValue = () => value;

  return {
    addMark,
    getValue,
    isOccupied,
    };
}


// gamecontroller
function GameController(
  playerOneName = "X Player",
  playerTwoName = "0 Player"
) {
  const board = Gameboard();

  const players = [
    {
      name: playerOneName,
      mark: "X"
    },
    {
      name: playerTwoName,
      mark: "0"
    }
  ];
  
  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (column, row) => {
    console.log(
      `Dropping ${getActivePlayer().name}'s token into column ${column}, row ${row}...`
    );

    const cell = board.getBoard()[row][column];

    if (!cell.isOccupied()) {
      board.placeMark(column, row, getActivePlayer().mark);
      
      switchPlayerTurn();
      printNewRound();
      checkWinner();
    } else {
      console.log("Cell is already occupied");
      return;
    }
  };


  const checkWinner = () => {
    // const cellsFlatened = getBoard().map((row) => row.map((cell) => cell.getValue())).flat();
    const cellsFlatened = getBoard().flat().map((cell) => cell.getValue());

        console.log("Cells Flattened:", cellsFlatened);


    // Check for a winner in the vertical direction
    for (let i = 0; i < 3; i++) {
        if (
            cellsFlatened[i] !== 0 &&
            cellsFlatened[i] === cellsFlatened[i + 3] &&
            cellsFlatened[i] === cellsFlatened[i + 6]
        ) {
            console.log(`Player ${cellsFlatened[i]} wins vertically!`);
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
        return;
    }

    if (
        cellsFlatened[2] !== 0 &&
        cellsFlatened[2] === cellsFlatened[4] &&
        cellsFlatened[2] === cellsFlatened[6]
    ) {
        console.log(`Player ${cellsFlatened[2]} wins diagonally (from top-right to bottom-left)!`);
        return;
    }

    // Check for a tie
    if (!cellsFlatened.includes(0)) {
        console.log("It's a tie!");
    }
};

  const getBoard = () => board.getBoard();


  printNewRound();
    
  return {
    playRound,
    getActivePlayer,
    checkWinner,
    getBoard,
    };
}
const game = GameController("Player One", "Player Two");



game.playRound(0, 2); // Player One (X) - Bottom-left
game.playRound(0, 0); // Player Two (O)
game.playRound(1, 2); // Player One (X) - Bottom-center
game.playRound(2, 0); // Player Two (O)
game.playRound(2, 2); // Player One (X) - Bottom-right - Vertical win!








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



  