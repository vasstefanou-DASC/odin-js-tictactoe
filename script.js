console.log("Hello!");

const game = (() => {
    const board = [
        [" "," "," "],
        [" "," "," "],
        [" "," "," "],
    ];
    const addSymbol = (symbol,row,col) => {
        if (board[row][col] === " ") {
            board[row][col] = symbol;
            checkWin(symbol);
        }
    };
    const checkFullBoard = () => {
        for (let i=0;i<3;i++) {
            for (let j=0;j<3;j++) {
                if (board[i][j] === " "){
                    return false;
                }
            }
        }
        return true; 
    };
    const checkWin = (symbol) => {
        if (!checkFullBoard) return false;
        if ((board[0][0] && board[0][1] && board[0][2] === symbol) ||
            (board[1][0] && board[1][1] && board[1][2] === symbol) ||
            (board[2][0] && board[2][1] && board[2][2] === symbol) ||
            (board[0][0] && board[1][0] && board[2][0] === symbol) ||
            (board[0][1] && board[1][1] && board[2][1] === symbol) ||
            (board[0][2] && board[1][2] && board[2][2] === symbol) ||
            (board[0][0] && board[1][1] && board[2][2] === symbol) ||
            (board[0][2] && board[1][1] && board[2][0] === symbol) ) {
                return true;
            }
        return false;    
    };
    const reset = () => {
        for (let i=0;i<3;i++) {
            for (let j=0;j<3;j++) {
                board[i][j] = " ";
            }
        }
    };
    const getBoard = () => board;
    return {addSymbol,reset,getBoard};
})();

game.addSymbol("X",0,0);
game.addSymbol("O",1,1);
game.addSymbol("O",1,2);
game.addSymbol("O",1,0);
console.table(game.getBoard());
game.reset();
console.table(game.getBoard());

function create2Players(name1,name2) {
    const player1Name = name1;
    const player2Name = name2;
    return {player1Name,player2Name};
}



