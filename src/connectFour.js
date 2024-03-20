export default class ConnectFour {
    constructor(board = [], player1 = true, printedBoard = '', playersTurn = "Red's Turn", gameOver = false) {
        this.board = board;
        this.player1 = player1;
        this.printedBoard = printedBoard;
        this.playersTurn = playersTurn;
        this.gameOver = gameOver;
    }

    createBoard = () => {
        this.board = [];
        for (let i = 0; i < 6; i++) {
            this.board.push([]);
            for (let j = 0; j < 7; j++) {
                this.board[i].push(':black_circle:');
            }
        }
    }

    printBoard = () => {
        this.printedBoard = '';
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                this.printedBoard += this.board[i][j] + ' ';                    
            }
            this.printedBoard += '\n';
        }
        
        return this.printedBoard;
    }

    dropPiece = (column) => {
        if (this.player1 === true) {

            this.playersTurn = "Yellow's Turn";
            this.player1 = false;

            if (this.board[5][column] === ':black_circle:') {
                this.board[5][column] = ':red_circle:';
            } else if (this.board[4][column] === ':black_circle:') {
                this.board[4][column] = ':red_circle:';
            } else if (this.board[3][column] === ':black_circle:') {
                this.board[3][column] = ':red_circle:';
            } else if (this.board[2][column] === ':black_circle:') {
                this.board[2][column] = ':red_circle:';
            } else if (this.board[1][column] === ':black_circle:') {
                this.board[1][column] = ':red_circle:';
            } else if (this.board[0][column] === ':black_circle:') {
                this.board[0][column] = ':red_circle:';
            }
        } else {

            this.playersTurn = "Red's Turn";
            this.player1 = true;

            if (this.board[5][column] === ':black_circle:') {
                this.board[5][column] = ':yellow_circle:';
            } else if (this.board[4][column] === ':black_circle:') {
                this.board[4][column] = ':yellow_circle:';
            } else if (this.board[3][column] === ':black_circle:') {
                this.board[3][column] = ':yellow_circle:';
            } else if (this.board[2][column] === ':black_circle:') {
                this.board[2][column] = ':yellow_circle:';
            } else if (this.board[1][column] === ':black_circle:') {
                this.board[1][column] = ':yellow_circle:';
            } else if (this.board[0][column] === ':black_circle:') {
                this.board[0][column] = ':yellow_circle:';
            }
        }
        this.checkWin();
        this.printBoard();
    }

    checkWin = () => {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                if (this.board[i][j] !== ':black_circle:') {
                    if (j + 3 < 7 &&
                        this.board[i][j] === this.board[i][j + 1] &&
                        this.board[i][j] === this.board[i][j + 2] &&
                        this.board[i][j] === this.board[i][j + 3]) {
                        this.gameOver = true;
                        return true;
                    }
                    if (i + 3 < 6) {
                        if (this.board[i][j] === this.board[i + 1][j] &&
                            this.board[i][j] === this.board[i + 2][j] &&
                            this.board[i][j] === this.board[i + 3][j]) {
                            this.gameOver = true;
                            return true;
                        }
                        if (j + 3 < 7 &&
                            this.board[i][j] === this.board[i + 1][j + 1] &&
                            this.board[i][j] === this.board[i + 2][j + 2] &&
                            this.board[i][j] === this.board[i + 3][j + 3]) {
                            this.gameOver = true;
                            return true;
                        }
                        if (j - 3 >= 0 &&
                            this.board[i][j] === this.board[i + 1][j - 1] &&
                            this.board[i][j] === this.board[i + 2][j - 2] &&
                            this.board[i][j] === this.board[i + 3][j - 3]) {
                            this.gameOver = true;
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }
}