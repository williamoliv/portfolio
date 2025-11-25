/* --- 1. LEAF ANIMATION --- */
const leavesContainer = document.getElementById('leaves');
const leafCount = 15;
for (let i = 0; i < leafCount; i++) {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.animationDuration = Math.random() * 3 + 5 + 's';
    leaf.style.animationDelay = Math.random() * 5 + 's';
    leavesContainer.appendChild(leaf);
}

/* --- 2. LIGHT/DARK MODE TOGGLE --- */
// Logic Flipped: Check if user wants DARK mode (since light is now default)
if (localStorage.getItem('theme') === 'dark-mode') {
    document.body.classList.add('dark-mode');
    document.querySelector('.theme-toggle i').classList.remove('fa-moon');
    document.querySelector('.theme-toggle i').classList.add('fa-sun');
}

function toggleTheme() {
    const body = document.body;
    const icon = document.querySelector('.theme-toggle i');
    
    // Toggle the dark-mode class
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        // Switch to Sun icon
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        // Switch to Moon icon
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light-mode');
    }
}

/* --- 3. EMAIL ENCRYPTION --- */
function revealEmail() {
    const user = "williamrod68";
    const domain = "hotmail.com";
    window.location.href = "mailto:" + user + "@" + domain;
}

/* --- 4. BACK TO TOP LOGIC --- */
let mybutton = document.getElementById("backToTop");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        mybutton.style.display = "flex";
    } else {
        mybutton.style.display = "none";
    }
}
function topFunction() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

/* --- 5. UNBEATABLE TIC TAC TOE (MINIMAX AI) --- */
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; 
let gameActive = true;
const cells = document.querySelectorAll('.ttt-cell');

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function playMove(index) {
    if (board[index] !== '' || !gameActive || currentPlayer === 'O') {
        return;
    }

    updateCell(index, 'X');
    checkResult();
    
    if (gameActive) {
        // Short delay so it feels like thinking
        setTimeout(computerMove, 200); 
    }
}

// --- THE UNBEATABLE AI (MINIMAX) ---
function computerMove() {
    if (!gameActive) return;

    let bestScore = -Infinity;
    let move;

    // Check all empty cells
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'O'; // AI makes a move
            let score = minimax(board, 0, false); // Check result
            board[i] = ''; // Undo move
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    updateCell(move, 'O');
    checkResult();
}

let scores = {
    'X': -10, // User wins (bad for AI)
    'O': 10,  // AI wins (good for AI)
    'tie': 0
};

function minimax(board, depth, isMaximizing) {
    let result = checkWinner();
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    if (!board.includes('')) {
        return 'tie';
    }
    return null;
}
// ------------------------------------

function updateCell(index, player) {
    board[index] = player;
    cells[index].innerText = player;
    cells[index].style.color = player === 'X' ? 'var(--text-main)' : 'var(--accent-orange)';
}

function checkResult() {
    let result = checkWinner();

    if (result === 'X' || result === 'O') {
        // Find winning line for highlighting
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] === result && board[b] === result && board[c] === result) {
                cells[a].classList.add('winner');
                cells[b].classList.add('winner');
                cells[c].classList.add('winner');
            }
        }
        gameActive = false;
        setTimeout(resetGame, 1500);
        return;
    }

    if (result === 'tie') {
        gameActive = false;
        setTimeout(resetGame, 1500);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('winner');
        cell.style.color = "var(--text-main)";
    });
}