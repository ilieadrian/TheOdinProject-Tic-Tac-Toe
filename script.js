let game;

const startBtn = document.getElementById("submit-btn");
const playGrid = document.getElementById("play-grid");
const restartBtn = document.getElementById("reset-btn");
const player1Input = document.getElementById("player1name")
const player2Input = document.getElementById("player2name");

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

  return { getBoard, resetBoard, placeMark, board };
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
  let draws = 0;

  const playerOneObj = CreateUser(playerOne, "X");
  const playerTwoObj = CreateUser(playerTwo, "0");

  const players = [playerOneObj, playerTwoObj];
  
  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const getActivePlayerMark = () => activePlayer.userMark;

  const getPlayerOneName = () => playerOneObj.userName;
  const getPlayerOneWins = () => playerOneObj.getWins();
  const getPlayerTwoName = () => playerTwoObj.userName;
  const getPlayerTwoWins = () => playerTwoObj.getWins();

  const getBoard = () => board.getBoard();
  const resetBoard = () => board.resetBoard();

  const getDraws = () => draws;
  const addDraw = () => draws++;

  const playRound = (column, row) => {
    if (!column && !row) {
      updateDOM(); 
    } else {
      const cell = board.getBoard()[column][row];

      if (!cell.isOccupied()) {
      
        board.placeMark(column, row, getActivePlayerMark());
  
        checkWinner();
        switchPlayerTurn();

      } else {
        console.log("Cell is already occupied");
        return;
      }
    }
  };

    return { 
    playRound, 
    getPlayerOneName, 
    getPlayerOneWins,
    getPlayerTwoName,
    getPlayerTwoWins,
    playerTwoObj, 
    getActivePlayer,
    getDraws,
    addDraw, 
    getBoard, 
    resetBoard 
  };
}

function checkWinner() {
  const cellsFlatened = game.getBoard().flat().map((cell) => cell.getValue());

  // Check for a winner in the vertical direction
  for (let i = 0; i < 3; i++) {
      if (
          cellsFlatened[i] !== 0 &&
          cellsFlatened[i] === cellsFlatened[i + 3] &&
          cellsFlatened[i] === cellsFlatened[i + 6]
      ) {

          console.log(`Player ${cellsFlatened[i]} wins vertically!`);
          game.getActivePlayer().addWin();
          console.log(game.getActivePlayer().userName, game.getActivePlayer().getWins());
          console.log("A round has ended");
          // game.resetBoard(); // Change this line
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
          game.getActivePlayer().addWin();
          console.log(game.getActivePlayer().userName, game.getActivePlayer().getWins());
          console.log("A round has ended");
          // game.resetBoard(); // Change this line
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
      game.getActivePlayer().addWin();
      console.log(game.getActivePlayer().userName, game.getActivePlayer().getWins());
      console.log("A round has ended");
      // game.resetBoard(); // Change this line
      return;
  } 
  if (
      cellsFlatened[2] !== 0 &&
      cellsFlatened[2] === cellsFlatened[4] &&
      cellsFlatened[2] === cellsFlatened[6]
  ) {
      console.log(`Player ${cellsFlatened[2]} wins diagonally (from top-right to bottom-left)!`);
      game.printNewRoun();
      game.getActivePlayer().addWin();
      console.log(game.getActivePlayer().userName, game.getActivePlayer().getWins());
      console.log("A round has ended");
      // game.resetBoard(); // Change this line
      return;
  } 

  // Check for a tie
  if (!cellsFlatened.includes(0)) {
      game.addDraw();
      console.log("It's a tie!");
      console.log("A round has ended");
      // game.resetBoard(); // Change this line
  } 
}

const updateDOM = () => {
const gameInfo = document.getElementById("info-panel");
const player1NameInfoContainer = document.getElementById("player1-name");
const player1ScoreInfoContainer = document.getElementById("player1-score");
const player2NameInfoContainer = document.getElementById("player2-name");
const player2ScoreInfoContainer = document.getElementById("player2-score");
const gameUpdates = document.getElementById("game-updates");
const drawCount = document.getElementById("draws");

  const board = game.getBoard();

  playGrid.innerHTML = "";

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cellValue = board[i][j].getValue();
      let cellRow = i;
      let cellColumn = j;

      if (cellValue === 0) {
        cellValue = '';
      } 

      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
       //Axes are reversed :) / Try to figure out fix
      cellElement.setAttribute("row-id", cellRow)
      cellElement.setAttribute("coll-id", cellColumn)
       //Axes are reversed :) / Try to figure out fix
      
      cellElement.textContent = cellValue;

      playGrid.appendChild(cellElement);      
    }
  }
  
  gameUpdates.innerHTML = `${game.getActivePlayer().userName}'s turn.`;
  player1NameInfoContainer.innerHTML = `${game.getPlayerOneName()}`;
  player1ScoreInfoContainer.innerHTML = `Wins: ${game.getPlayerOneWins()}`;
  player2NameInfoContainer.innerHTML = `${game.getPlayerTwoName()}`;
  player2ScoreInfoContainer.innerHTML = `Wins: ${game.getPlayerTwoWins()}`;
  drawCount.innerHTML = `Draws: ${game.getDraws()}`;
  gameInfo.style.visibility = "visible"
};

startBtn.addEventListener("click", function(e) {
  e.preventDefault();
  const player1 = player1Input.value;
  const player2 = player2Input.value;

  if(player1.length > 0 || player2.length > 0 ) {
    game = GameController(player1, player2);
    game.playRound(); 
  }
    
  });

playGrid.addEventListener("click", function(e) {
  e.preventDefault();
  if (e.target && e.target.nodeName == "DIV" && e.target.classList.contains("cell")) {
    const rowId = e.target.getAttribute("row-id");
    const colId = e.target.getAttribute("coll-id");
    game.playRound(rowId, colId); 
    updateDOM();
  }
});

restartBtn.addEventListener("click", function(e) {
  e.preventDefault();
  game.resetBoard();
  updateDOM();
});