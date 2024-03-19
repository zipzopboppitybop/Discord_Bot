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
}
