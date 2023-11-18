const board = document.getElementById('board'); // tambahkan deklarasi board
const resetButton = document.getElementById('reset');
const message = document.getElementById('message');
let currentPlayer = 'Nino';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let winner = null;

function renderBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;

        const img = document.createElement('img');
        img.src = getCellImage(gameBoard[i]);
        img.alt = gameBoard[i];

        cell.appendChild(img);

        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function getCellImage(value) {
    if (value === 'Nino') {
        return 'IMG/X.jpg';
    } else if (value === 'Miku') {
        return 'IMG/O.jpg';
    } else {
        return 'IMG/0.png';
    }
}

function handleCellClick(event) {
    const clickedCellIndex = event.target.dataset.index;
    if (gameBoard[clickedCellIndex] === '' && gameActive) {
        gameBoard[clickedCellIndex] = currentPlayer;
        renderBoard();
        checkWinner();
        togglePlayer();
        updateMessage();
    }
}

function updateMessage() {
    if (winner) {
        message.textContent = `Player ${winner} wins!`;
    } else if (gameBoard.includes('')) {
        message.textContent = `Player ${currentPlayer}'s turn`;
    } else {
        message.textContent = 'It\'s a tie!';
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'Nino' ? 'Miku' : 'Nino';
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            winner = currentPlayer; 
            updateMessage();
            return;
        }
    }
    if (!gameBoard.includes('') && gameActive) {
        gameActive = false;
        message.textContent = 'It\'s a tie!';
    }
}

function reset() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'Nino';
    winner = null;
    message.textContent = '';
    renderBoard();
}

renderBoard();