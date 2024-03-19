export default class ConnectFour {
    constructor(board = [], player1 = 1) {
        this.board = board;
        this.player1 = player1;
    }

    createBoard = () => {
        for (let i = 0; i < 6; i++) {
            this.board.push([]);
            for (let j = 0; j < 7; j++) {
                this.board[i].push(':black_circle:');
            }
        }
        return this.board;
    }
}
