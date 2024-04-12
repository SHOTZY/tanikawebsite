const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const playerXScoreDisplay = document.getElementById('playerXScore');
const playerOScoreDisplay = document.getElementById('playerOScore');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let playerXScore = 0;
let playerOScore = 0;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const checkWin = () => {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      message.innerText = `${currentPlayer} wins!`;

      // Add winning class to winning cells
      cells[a].classList.add('winning');
      cells[b].classList.add('winning');
      cells[c].classList.add('winning');

      gameActive = false;
      updateScore(currentPlayer);
      return;
    }
  }
  if (!gameState.includes('')) {
    message.innerText = "It's a draw!";
    gameActive = false;
    return;
  }
};

const updateScore = (player) => {
  if (player === 'X') {
    playerXScore++;
    playerXScoreDisplay.innerText = playerXScore;
  } else if (player === 'O') {
    playerOScore++;
    playerOScoreDisplay.innerText = playerOScore;
  }
};

const handleClick = (cellIndex) => {
  if (gameState[cellIndex] !== '' || !gameActive) return;

  gameState[cellIndex] = currentPlayer;
  cells[cellIndex].innerText = currentPlayer;
  checkWin();

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const resetGame = () => {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  message.innerText = '';
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('winning'); // Remove winning class
  });
};

resetGame();
