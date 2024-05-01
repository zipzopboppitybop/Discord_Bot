export default class TicTacToe {
    constructor(board = [], player1 = true, printedBoard = '', playersTurn = "X's Turn", gameOver = false, player1Name = '', player2Name = '') {
        this.board = board;
        this.player1 = player1;
        this.printedBoard = printedBoard;
        this.playersTurn = playersTurn;
        this.gameOver = gameOver;
        this.player1Name = player1Name;
        this.player2Name = player2Name;
    }

    createBoard = () => {
        this.board = [];
        for (let i = 0; i < 3; i++) {
            this.board.push([]);
            for (let j = 0; j < 3; j++) {
                this.board[i].push(':black_large_square:');
            }
        }
    }

    printBoard = () => {
        this.printedBoard = '';
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.printedBoard += this.board[i][j] + ' ';                    
            }
            this.printedBoard += '\n';
        }
        
        return this.printedBoard;
    }

    pickSpace = (space) => {
        if (this.player1 === true) {

            this.playersTurn = "O's Turn";
            this.player1 = false;
            
            if (space === 1) {
                if (this.board[0][0] === ':black_large_square:') {
                    this.board[0][0] = ':x:';
                }
            } else if (space === 2) {
                if (this.board[0][1] === ':black_large_square:') {
                    this.board[0][1] = ':x:';
                }
            } else if (space === 3) {
                if (this.board[0][2] === ':black_large_square:') {
                    this.board[0][2] = ':x:';
                }
            } else if (space === 4) {
                if (this.board[1][0] === ':black_large_square:') {
                    this.board[1][0] = ':x:';
                }
            } else if (space === 5) {
                if (this.board[1][1] === ':black_large_square:') {
                    this.board[1][1] = ':x:';
                }
            } else if (space === 6) {
                if (this.board[1][2] === ':black_large_square:') {
                    this.board[1][2] = ':x:';
                }
            } else if (space === 7) {
                if (this.board[2][0] === ':black_large_square:') {
                    this.board[2][0] = ':x:';
                }
            } else if (space === 8) {
                if (this.board[2][1] === ':black_large_square:') {
                    this.board[2][1] = ':x:';
                }
            } else if (space === 9) {
                if (this.board[2][2] === ':black_large_square:') {
                    this.board[2][2] = ':x:';
                }
            }

        } else {

            this.playersTurn = "X's Turn";
            this.player1 = true;

            if (space === 1) {
                if (this.board[0][0] === ':black_large_square:') {
                    this.board[0][0] = ':o:';
                } else return;
            } else if (space === 2) {
                if (this.board[0][1] === ':black_large_square:') {
                    this.board[0][1] = ':o:';
                }
            } else if (space === 3) {
                if (this.board[0][2] === ':black_large_square:') {
                    this.board[0][2] = ':o:';
                }
            } else if (space === 4) {
                if (this.board[1][0] === ':black_large_square:') {
                    this.board[1][0] = ':o:';
                }
            } else if (space === 5) {
                if (this.board[1][1] === ':black_large_square:') {
                    this.board[1][1] = ':o:';
                }
            } else if (space === 6) {
                if (this.board[1][2] === ':black_large_square:') {
                    this.board[1][2] = ':o:';
                }
            } else if (space === 7) {
                if (this.board[2][0] === ':black_large_square:') {
                    this.board[2][0] = ':o:';
                }
            } else if (space === 8) {
                if (this.board[2][1] === ':black_large_square:') {
                    this.board[2][1] = ':o:';
                }
            } else if (space === 9) {
                if (this.board[2][2] === ':black_large_square:') {
                    this.board[2][2] = ':o:';
                }
            }


        }
        //this.checkWin();
        this.printBoard();
    }

    
    checkPlayerTurn = (user) => {
        if (user.globalName !== this.player1Name && user.globalName !== this.player2Name) return false;
        if (this.playersTurn === "X's Turn" && user.globalName !== this.player1Name) return false;
        if (this.playersTurn === "O's Turn" && user.globalName !== this.player2Name) return false;

        return true;
    }

}