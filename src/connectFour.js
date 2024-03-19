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
        if (player1) {
            if (newBoard[5][column] === ':black_circle:') {
                newBoard[5][column] = ':red_circle:';
                player1 = 0;
            } else if (newBoard[4][column] === ':black_circle:') {
                newBoard[4][column] = ':red_circle:';
                player1 = 0;
            } else if (newBoard[3][column] === ':black_circle:') {
                newBoard[3][column] = ':red_circle:';
                player1 = 0;
            } else if (newBoard[2][column] === ':black_circle:') {
                newBoard[2][column] = ':red_circle:';
                player1 = 0;
            }
            else if (newBoard[1][column] === ':black_circle:') {
                newBoard[1][column] = ':red_circle:';
                player1 = 0;
            }
            else if (newBoard[0][column] === ':black_circle:') {
                newBoard[0][column] = ':red_circle:';
                player1 = 0;
            }
        } else {
            if (newBoard[5][column] === ':black_circle:') {
                newBoard[5][column] = ':yellow_circle:';
                player1 = 1;
            } else if (newBoard[4][column] === ':black_circle:') {
                newBoard[4][column] = ':yellow_circle:';
                player1 = 1;
            } else if (newBoard[3][column] === ':black_circle:') {
                newBoard[3][column] = ':yellow_circle:';
                player1 = 1;
            } else if (newBoard[2][column] === ':black_circle:') {
                newBoard[2][column] = ':yellow_circle:';
                player1 = 1;
            }
            else if (newBoard[1][column] === ':black_circle:') {
                newBoard[1][column] = ':yellow_circle:';
                player1 = 1;
            }
            else if (newBoard[0][column] === ':black_circle:') {
                newBoard[0][column] = ':yellow_circle:';
                player1 = 1;
            }
        }
    }
}
