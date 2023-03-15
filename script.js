const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let vsCPU = true;
let currentPlayer = "X";
let currentBoard = -1;
let gameState = ["", "", "", "", "", "", "", "", ""];
let boardState = [
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

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

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('id')) % 9;
    const clickedBoardIndex = Math.floor(parseInt(clickedCell.getAttribute('id')) / 9);
    playCell(clickedBoardIndex, clickedCellIndex);
};

function playCell(clickedBoardIndex, clickedCellIndex) {
    if(currentBoard == -1)
        currentBoard = clickedBoardIndex;

    let boardAvailable = boardState[currentBoard].includes("");
    if((boardAvailable && clickedBoardIndex != currentBoard) || boardState[clickedBoardIndex][clickedCellIndex] !== "" || !gameActive)
        return;

    handleCellPlayed(clickedBoardIndex, clickedCellIndex);
    handleBoardValidation(clickedBoardIndex);
    handleGameValidation();
    handlePlayerChange();
    currentBoard = clickedCellIndex; 
    document.querySelectorAll('.cell').forEach(cell => 
        {
            if(Math.floor(parseInt(cell.getAttribute('id')) / 9) == currentBoard)
                cell.style.borderColor = 'red';
            else
                cell.style.borderColor = '#04c0b2';
        });

    if(vsCPU && currentPlayer == "O") {
        while(!boardState[currentBoard].includes("")) {
            currentBoard = Math.floor(Math.random() * 9);
        };
        let oneAway = false;
        for(let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = boardState[currentBoard][winCondition[0]];
            const b = boardState[currentBoard][winCondition[1]];
            const c = boardState[currentBoard][winCondition[2]];
            if ((a === "X" + b === "X" + c === "X") == 2) {
                if(a == "") {
                    oneAway = true;
                    clickedCellIndex = winCondition[0];
                    break;
                }
                else if (b == "") {
                    oneAway = true;
                    clickedCellIndex = winCondition[0];
                    break;
                }
                else if (c == "") {
                    oneAway = true;
                    clickedCellIndex = winCondition[0];
                    break;
                }
                else {
                    continue;
                }
            }
        }
        if (oneAway == false) {
            do {
                clickedCellIndex = Math.floor(Math.random() * 9);
            }
            while(boardState[currentBoard][clickedCellIndex] !== "");
        }
        setTimeout(function() {
            playCell(currentBoard, clickedCellIndex);
        }, 1500);
    }
}

function handleCellPlayed(clickedBoardIndex, clickedCellIndex) {
    boardState[clickedBoardIndex][clickedCellIndex] = currentPlayer;
    document.getElementById(String(clickedCellIndex + clickedBoardIndex * 9)).innerHTML = currentPlayer;
}

function handleBoardValidation(clickedBoardIndex) {
    let boardWon = false;
    for(let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = boardState[clickedBoardIndex][winCondition[0]];
        const b = boardState[clickedBoardIndex][winCondition[1]];
        const c = boardState[clickedBoardIndex][winCondition[2]];
        if(a === '' || b === '' || c === '')
            continue;
        if(a === b && b === c) {
            boardWon = true;
            break
        }
    }

    if(boardWon) {
        gameState[clickedBoardIndex] = currentPlayer;
    }
}

function handleGameValidation() {
    let roundWon = false;
    for(let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if(a === '' || b === '' || c === '')
            continue;
        if(a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if(roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes("");
    if(roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    boardState = [
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
    ];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.style.borderColor = '#04c0b2');
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    currentBoard = -1;
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.querySelector('input[type="checkbox"]');
  
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        vsCPU = true;
      } else {
        vsCPU = false;
      }
    });
  });
