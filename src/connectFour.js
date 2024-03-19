export default class ConnectFour {
    constructor(board = [], player1 = 1, printedBoard = '', playersTurn = "Red's Turn") {
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
        if (this.player1) {
            if (this.board[5][column] === ':black_circle:') {
                this.board[5][column] = ':red_circle:';
                this.player1 = 0;
                this.playersTurn = "Yellow's Turn";
            } else if (this.board[4][column] === ':black_circle:') {
                this.board[4][column] = ':red_circle:';
                this.player1 = 0;
                this.playersTurn = "Yellow's Turn";
            } else if (this.board[3][column] === ':black_circle:') {
                this.board[3][column] = ':red_circle:';
                this.player1 = 0;
                this.playersTurn = "Yellow's Turn";
            } else if (this.board[2][column] === ':black_circle:') {
                this.board[2][column] = ':red_circle:';
                this.player1 = 0;
                this.playersTurn = "Yellow's Turn";
            }
            else if (this.board[1][column] === ':black_circle:') {
                this.board[1][column] = ':red_circle:';
                this.player1 = 0;
                this.playersTurn = "Yellow's Turn";
            }
            else if (this.board[0][column] === ':black_circle:') {
                this.board[0][column] = ':red_circle:';
                this.player1 = 0;
                this.playersTurn = "Yellow's Turn";
            }
        } else {
            if (this.board[5][column] === ':black_circle:') {
                this.board[5][column] = ':yellow_circle:';
                this.player1 = 1;
                this.playersTurn = "Red's Turn";
            } else if (this.board[4][column] === ':black_circle:') {
                this.board[4][column] = ':yellow_circle:';
                this.player1 = 1;
                this.playersTurn = "Red's Turn";
            } else if (this.board[3][column] === ':black_circle:') {
                this.board[3][column] = ':yellow_circle:';
                this.player1 = 1;
                this.playersTurn = "Red's Turn";
            } else if (this.board[2][column] === ':black_circle:') {
                this.board[2][column] = ':yellow_circle:';
                this.player1 = 1;
                this.playersTurn = "Red's Turn";
            }
            else if (this.board[1][column] === ':black_circle:') {
                this.board[1][column] = ':yellow_circle:';
                this.player1 = 1;
                this.playersTurn = "Red's Turn";
            }
            else if (this.board[0][column] === ':black_circle:') {
                this.board[0][column] = ':yellow_circle:';
                this.player1 = 1;
                this.playersTurn = "Red's Turn";
            }
        }
    }
}

// client.on('messageReactionRemove', async (reaction, user) => {
//     if (user.tag === "ZipZop#7061") return;
//     switch (reaction.emoji.name) {
//         case '1️⃣':
//             board.dropPiece(0);
//             board.printBoard();
//             sentMessage.embeds[0].fields[0].value = board.printedBoard;
//             if (board.player1) {
//                 sentMessage.embeds[0].fields[1].value = "Red's Turn";
//             } else {
//                 sentMessage.embeds[0].fields[1].value = "Yellow's Turn";
//             }
//             await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
//             break;
//         case '2️⃣':
//             board.dropPiece(1);
//             sentMessage.embeds[0].fields[0].value = printBoard();
//             if (board.player1) {
//                 sentMessage.embeds[0].fields[1].value = "Red's Turn";
//             } else {
//                 sentMessage.embeds[0].fields[1].value = "Yellow's Turn";
//             }
//             await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
//             break;
//         case '3️⃣':
//             board.dropPiece(2);
//             sentMessage.embeds[0].fields[0].value = printBoard();
//             if (board.player1) {
//                 sentMessage.embeds[0].fields[1].value = "Red's Turn";
//             } else {
//                 sentMessage.embeds[0].fields[1].value = "Yellow's Turn";
//             }
//             await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
//             break;
//         case '4️⃣':
//             board.dropPiece(3);
//             sentMessage.embeds[0].fields[0].value = printBoard();
//             if (board.player1) {
//                 sentMessage.embeds[0].fields[1].value = "Red's Turn";
//             } else {
//                 sentMessage.embeds[0].fields[1].value = "Yellow's Turn";
//             }
//             await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
//             break;
//         case '5️⃣':
//             board.dropPiece(4);
//             sentMessage.embeds[0].fields[0].value = printBoard();
//             if (board.player1) {
//                 sentMessage.embeds[0].fields[1].value = "Red's Turn";
//             }
//             else {
//                 sentMessage.embeds[0].fields[1].value = "Yellow's Turn";
//             }
//             await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
//             break;
//         case '6️⃣':
//             board.dropPiece(5);
//             sentMessage.embeds[0].fields[0].value = printBoard();
//             if (board.player1) {
//                 sentMessage.embeds[0].fields[1].value = "Red's Turn";
//             }
//             else {
//                 sentMessage.embeds[0].fields[1].value = "Yellow's Turn";
//             }
//             await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
//             break;
//         case '7️⃣':
//             board.dropPiece(6);
//             sentMessage.embeds[0].fields[0].value = printBoard();
//             if (board.player1) {
//                 sentMessage.embeds[0].fields[1].value = "Red's Turn";
//             }
//             else {
//                 sentMessage.embeds[0].fields[1].value = "Yellow's Turn";
//             }
//             await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
//             break;
//     }
// });