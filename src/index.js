import dotenv from 'dotenv';
dotenv.config({ path: '../.env' })

import { Client, IntentsBitField, GatewayIntentBits, EmbedBuilder, Events } from 'discord.js';

let newBoard = [];
let player1 = 1;
let player2 = 0;

const createBoard = () => {
    for (let i = 0; i < 6; i++) {
        newBoard.push([]);
        for (let j = 0; j < 7; j++) {
            newBoard[i].push(':black_circle:');
        }
    }
}

const printBoard = () => {
    let board = '';
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            board += newBoard[i][j] + ' ';
        }
        board += '\n';
    }
    return board;
}

const dropPiece = (column) => {
    if (player1) {
        if (newBoard[5][column] === ':black_circle:') {
            newBoard[5][column] = ':red_circle:';
            player1 = 0;
            player2 = 1;
        } else if (newBoard[4][column] === ':black_circle:') {
            newBoard[4][column] = ':red_circle:';
            player1 = 0;
            player2 = 1;
        } else if (newBoard[3][column] === ':black_circle:') {
            newBoard[3][column] = ':red_circle:';
            player1 = 0;
            player2 = 1;
        } else if (newBoard[2][column] === ':black_circle:') {
            newBoard[2][column] = ':red_circle:';
            player1 = 0;
            player2 = 1;
        }
        else if (newBoard[1][column] === ':black_circle:') {
            newBoard[1][column] = ':red_circle:';
            player1 = 0;
            player2 = 1;
        }
        else if (newBoard[0][column] === ':black_circle:') {
            newBoard[0][column] = ':red_circle:';
            player1 = 0;
            player2 = 1;
        }
    } else {
        if (newBoard[5][column] === ':black_circle:') {
            newBoard[5][column] = ':yellow_circle:';
            player1 = 1;
            player2 = 0;
        } else if (newBoard[4][column] === ':black_circle:') {
            newBoard[4][column] = ':yellow_circle:';
            player1 = 1;
            player2 = 0;
        } else if (newBoard[3][column] === ':black_circle:') {
            newBoard[3][column] = ':yellow_circle:';
            player1 = 1;
            player2 = 0;
        } else if (newBoard[2][column] === ':black_circle:') {
            newBoard[2][column] = ':yellow_circle:';
            player1 = 1;
            player2 = 0;
        }
        else if (newBoard[1][column] === ':black_circle:') {
            newBoard[1][column] = ':yellow_circle:';
            player1 = 1;
            player2 = 0;
        }
        else if (newBoard[0][column] === ':black_circle:') {
            newBoard[0][column] = ':yellow_circle:';
            player1 = 1;
            player2 = 0;
        }
    }
}

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent,
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.GuildMessageReactions
    ],
});

client.login(process.env.DISCORD_TOKEN);

client.on('ready', (c) => {
    console.log(`Logged in as ${c.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content === 'ping') {
        message.reply('pong');
    }

    if (message.content === '!play c4') {
        createBoard();
        let board = printBoard();
        const embed = new EmbedBuilder()
            .setTitle('Connect 4')
            .setDescription('Click on the numbers to drop your piece.')
            .addFields({name: 'Board', value: board});

        let sentMessage = await message.channel.send({embeds: [embed]})
        sentMessage.react('1️⃣');
        sentMessage.react('2️⃣');
        sentMessage.react('3️⃣');
        sentMessage.react('4️⃣');
        sentMessage.react('5️⃣');
        sentMessage.react('6️⃣');
        sentMessage.react('7️⃣');

        const filter = (reaction, user) => {
            return reaction.emoji.name === '👍' && user.id === message.author.id;
        };
        const collector = sentMessage.createReactionCollector(filter, { time: 15000 });
        collector.on('collect', (reaction, user) => {
            if (user.tag === "Game Bot#7061") return;
            switch (reaction.emoji.name) {
                case '1️⃣':
                    dropPiece(0);
                    sentMessage.embeds[0].fields[0].value = printBoard();
                    sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '2️⃣':
                    dropPiece(1);
                    sentMessage.embeds[0].fields[0].value = printBoard();
                    sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '3️⃣':
                    dropPiece(2);
                    sentMessage.embeds[0].fields[0].value = printBoard();
                    sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '4️⃣':
                    dropPiece(3);
                    sentMessage.embeds[0].fields[0].value = printBoard();
                    sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '5️⃣':
                    dropPiece(4);
                    sentMessage.embeds[0].fields[0].value = printBoard();
                    sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '6️⃣':
                    dropPiece(5);
                    sentMessage.embeds[0].fields[0].value = printBoard();
                    sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '7️⃣':
                    dropPiece(6);
                    sentMessage.embeds[0].fields[0].value = printBoard();
                    sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
            }
        });
    }
});



