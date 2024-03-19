export default class ConnectFour {
    constructor(board = [], player1 = 1, printedBoard = '') {
        this.board = board;
        this.player1 = player1;
        this.printedBoard = printedBoard;
    }

    createBoard = () => {
        for (let i = 0; i < 6; i++) {
            this.board.push([]);
            for (let j = 0; j < 7; j++) {
                this.board[i].push(':black_circle:');
            }
        }
    }

    printBoard = () => {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                this.printedBoard += this.board[i][j] + ' ';
            }
            this.printedBoard += '\n';
        }
        return this.printedBoard;
    }

    dropPiece = (column) => {
        if (this.player1) {
            if (this.board[5][column] === ':black_circle:') {
                this.board[5][column] = ':red_circle:';
                this.player1 = 0;
            } else if (this.board[4][column] === ':black_circle:') {
                this.board[4][column] = ':red_circle:';
                this.player1 = 0;
            } else if (this.board[3][column] === ':black_circle:') {
                this.board[3][column] = ':red_circle:';
                this.player1 = 0;
            } else if (this.board[2][column] === ':black_circle:') {
                this.board[2][column] = ':red_circle:';
                this.player1 = 0;
            }
            else if (this.board[1][column] === ':black_circle:') {
                this.board[1][column] = ':red_circle:';
                this.player1 = 0;
            }
            else if (this.board[0][column] === ':black_circle:') {
                this.board[0][column] = ':red_circle:';
                this.player1 = 0;
            }
        } else {
            if (this.board[5][column] === ':black_circle:') {
                this.board[5][column] = ':yellow_circle:';
                this.player1 = 1;
            } else if (this.board[4][column] === ':black_circle:') {
                this.board[4][column] = ':yellow_circle:';
                this.player1 = 1;
            } else if (this.board[3][column] === ':black_circle:') {
                this.board[3][column] = ':yellow_circle:';
                this.player1 = 1;
            } else if (this.board[2][column] === ':black_circle:') {
                this.board[2][column] = ':yellow_circle:';
                this.player1 = 1;
            }
            else if (this.board[1][column] === ':black_circle:') {
                this.board[1][column] = ':yellow_circle:';
                this.player1 = 1;
            }
            else if (this.board[0][column] === ':black_circle:') {
                this.board[0][column] = ':yellow_circle:';
                this.player1 = 1;
            }
        }
    }
}
