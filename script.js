const gameBoard = (() => {
    let board = new Array(9).fill("");
    
    function emptyBoard() {
        board.fill("");
        return board;
    }

    function alterBoard(index,symbol) {
        if (board[index] === "") {
            board[index] = symbol;
        }
        return board;
    }

    function isBoardFull() {
        return !board.includes("");
    }

    function isThereAWinner(symbol) {
        const winCons = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for (const winCon of winCons) {
            if (winCon.every((index) => board[index] === symbol)){
                return true;
            }
        }
        return false;
    }

    function printBoard() {
        const cells = document.querySelectorAll(".cell");
        const cellsArr = Array.from(cells);
        for (let i = 0; i<=8 ; i++) {
            cellsArr[i].textContent = board[i]; 
        }
    }

    const getBoard = () => board;

    return {emptyBoard,alterBoard,isBoardFull,isThereAWinner,printBoard,getBoard};

})();

function createPlayer(name,symbol) {
    let score = 0;
    const win = () => {score++; };
    const getScore = () => score;
    return {name,symbol,win,getScore};
}

const userInterface = (() => {

    const gameMessage = document.querySelector(".game-message");
    gameMessage.textContent = "";
    const scoreBoard = document.querySelector(".score-display");
    const p1Score = document.createElement("div");
    scoreBoard.appendChild(p1Score);
    const p2Score = document.createElement("div");
    scoreBoard.appendChild(p2Score);
    
    function createUserInterface() {
        const main = document.querySelector("main");
        const domBoard = document.createElement("div");
        domBoard.classList.add("board");
        main.appendChild(domBoard);
        for (let i=0;i<=8;i++) {
            const domCell = document.createElement("div");
            domCell.classList.add("cell");
            domCell.setAttribute("id",`cell${i}`);
            domCell.addEventListener("click", (e) => {
                const index = +e.target.id.at(-1);
                gameMessage.textContent = game.clickCell(index);
                gameBoard.printBoard();
            });
            domBoard.appendChild(domCell);
        }
        const newGameButton = document.querySelector("#new-game");
        newGameButton.addEventListener("click",game.newGame);
        const restartGameButton = document.querySelector("#restart-game");
        restartGameButton.addEventListener("click",game.playAgain);
    }

    function updateDisplay(p1,p2) {
        p1Score.textContent = `${p1.name}'s score: ${p1.getScore()}`;
        p2Score.textContent = `${p2.name}'s score: ${p2.getScore()}`;
    }

    return {createUserInterface,updateDisplay};
    
})();

const game = (() => {

    let gameOver = false;
    let turn = 0;
    let namep1 = prompt("Player 1 Name?: ");
    let namep2 = prompt("Player 2 Name?: ");
    let p1 = createPlayer(namep1,"X");
    let p2 = createPlayer(namep2,"O");
    userInterface.updateDisplay(p1,p2);

    const newGame = () => {
        gameOver = false;
        turn = 0;
        gameBoard.emptyBoard();
        gameBoard.printBoard();
        namep1 = prompt("Player 1 Name?: ");
        namep2 = prompt("Player 2 Name?: ");
        p1 = createPlayer(namep1,"X");
        p2 = createPlayer(namep2,"O");
        userInterface.updateDisplay(p1,p2);
    };

    const playAgain = () => {
        gameOver = false;
        turn = 0;
        gameBoard.emptyBoard();
        gameBoard.printBoard();
    };    
    const clickCell = (index) => {
        if (gameOver) return;
        const currentPlayer = ++turn % 2 === 1 ? p1 : p2;
        gameBoard.alterBoard(index,currentPlayer.symbol);
        if (gameBoard.isThereAWinner(currentPlayer.symbol)) {
            const message = `Congratulations ${currentPlayer.name} you win!!!`;
            currentPlayer.win();
            userInterface.updateDisplay(p1,p2);
            gameOver = true;
            return message;
        }
        if (gameBoard.isBoardFull()) {
            const message = "Board is full with no winners :(";
            gameOver = true;
            return message;
        }
        return "";
    };
    
    return {newGame,playAgain,clickCell};

})();



userInterface.createUserInterface();





















