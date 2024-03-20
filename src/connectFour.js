export default class ConnectFour {
    constructor(board = [], player1 = true, printedBoard = '', playersTurn = "Red's Turn") {
        this.board = board;
        this.player1 = player1;
        this.printedBoard = printedBoard;
        this.playersTurn = playersTurn;
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

        this.printBoard();
    }
}