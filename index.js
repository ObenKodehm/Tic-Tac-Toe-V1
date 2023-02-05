const GameBoard = (() => {
  const gameBoard = ['', '', '', '', '', '', '', '', ''];

  const clearGameBoard = () => {
    for (let i = 0; i < gameBoard.length; i += 1) {
      gameBoard[i] = '';
    }
  };

  // determines the winner by checking against pre-defined winning position
  function checkWinner() {
    const winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]];

    for (let i = 0; i < winningPositions.length; i += 1) {
      const [a, b, c] = winningPositions[i];
      if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
        return gameBoard[a];
      }
    }

    return false;
  }

  return { gameBoard, clearGameBoard, checkWinner };
})();

const DisplayController = (() => {
  // handles the display of the whole board
  const tiles = document.getElementsByClassName('game-tile');

  const displayBoard = () => {
    for (let i = 0; i < tiles.length; i += 1) {
      const tilePara = tiles.item(i).firstElementChild;
      tilePara.textContent = GameBoard.gameBoard[i];
    }
  };

  // handles the display of the winner of the game
  const winnerSpan = document.getElementById('winner');
  const gameWinnerDiv = document.getElementsByClassName('game-winner');

  const displayWinner = (winner) => {
    winnerSpan.textContent = winner;
    gameWinnerDiv.item(0).style.display = 'flex';
  };

  return { displayBoard, displayWinner };
})();

function Player(name, choice) {
  return { name, choice };
}

const Game = (() => {
  const Player1 = Player('Player1', 'X');
  const Player2 = Player('Player2', 'O');

  const player1Choice = document.getElementById('player1-choice');
  const player2Choice = document.getElementById('player2-choice');

  const startGame = () => {
    const player1Name = document.getElementById('player1-name');
    if (player1Name.value) { Player1.name = player1Name.value; }
    Player1.choice = player1Choice.value;

    const player2Name = document.getElementById('player2-name');
    if (player2Name.value) { Player2.name = player2Name.value; }
    Player2.choice = player2Choice.value;

    const playerNameChoiceDiv = document.getElementsByClassName('player-name-choice-selector').item(0);
    playerNameChoiceDiv.style.display = 'none';

    const gameBodyDiv = document.getElementsByClassName('game-body').item(0);
    gameBodyDiv.style.display = 'grid';
  };

  const startGameBtn = document.getElementById('start-game');
  startGameBtn.onclick = () => {
    const choiceErrorPara = document.getElementById('choice-error');
    if (player1Choice.value !== player2Choice.value) {
      startGame();
      choiceErrorPara.style.visibility = 'hidden';
    } else {
      choiceErrorPara.style.visibility = 'visible';
    }
  };

  const currentTurnSpan = document.getElementById('current-turn');

  const restartGame = () => {
    const gameWinnerDiv = document.getElementsByClassName('game-winner');
    gameWinnerDiv.item(0).style.display = 'none';
    currentTurnSpan.textContent = 'X';

    GameBoard.clearGameBoard();
    DisplayController.displayBoard();
  };

  const restartGameBtn = document.getElementById('restart-game');
  restartGameBtn.onclick = () => {
    restartGame();
  };

  function changeTurn(e, index) {
    if (e.target.firstElementChild.textContent === '') {
      GameBoard.gameBoard[index] = currentTurnSpan.textContent;
      DisplayController.displayBoard();

      if (GameBoard.checkWinner()) {
        const winner = Player1.choice === currentTurnSpan.textContent ? Player1.name : Player2.name;
        DisplayController.displayWinner(winner);
      }
      currentTurnSpan.textContent = currentTurnSpan.textContent === 'X' ? 'O' : 'X'; // eslint-disable-line no-param-reassign
    }
  }

  const gameTilesDiv = document.getElementsByClassName('game-tile');
  for (let i = 0; i < gameTilesDiv.length; i += 1) {
    gameTilesDiv.item(i).addEventListener('click', (ev) => changeTurn(ev, i));
  }
  return { startGame, restartGame };
})();
