import dotenv from 'dotenv';
dotenv.config({ path: '../.env' })
import ConnectFour from './connectFour.js';

import { Client, IntentsBitField, GatewayIntentBits, EmbedBuilder, Events } from 'discord.js';

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
        const board = new ConnectFour();
        board.createBoard();
        const embed = new EmbedBuilder()
            .setTitle('Connect 4')
            .addFields({name: 'Board', value: board.printBoard()})
            .addFields({name: 'Turn', value: board.playersTurn})
            .addFields({name: 'Description', value: 'React with 👍 to become player 2.'})
            .toJSON();

        let sentMessage = await message.channel.send({embeds: [embed]})
        sentMessage.react('1️⃣');
        sentMessage.react('2️⃣');
        sentMessage.react('3️⃣');
        sentMessage.react('4️⃣');
        sentMessage.react('5️⃣');
        sentMessage.react('6️⃣');
        sentMessage.react('7️⃣');
        sentMessage.react('👍');

        let player1Name = message.author.globalName;
        let player2Name = '';

        

        const filter = (reaction, user) => {
            return reaction.emoji.name === '👍' && user.id === message.author.id;
        };
        const collector = sentMessage.createReactionCollector(filter, { time: 15000 });
        collector.on('collect', async (reaction, user) => {
            if (user.tag === "ZipZop#7061") return;
            switch (reaction.emoji.name) {
                case '👍':
                    if (player2Name !== '') return;
                    player2Name = user.globalName;
                    sentMessage.embeds[0].fields[2].value = `Click a number to drop a piece. Player 2 is ${player2Name}.`;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '1️⃣':
                    if (user.globalName !== player1Name && user.globalName !== player2Name) return;
                    board.dropPiece(0);
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    sentMessage.embeds[0].fields[1].value = board.playersTurn;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '2️⃣':
                    if (user.globalName !== player1Name && user.globalName !== player2Name) return;
                    board.dropPiece(1);
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    sentMessage.embeds[0].fields[1].value = board.playersTurn;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '3️⃣':
                    if (user.globalName !== player1Name && user.globalName !== player2Name) return;
                    board.dropPiece(2);
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    sentMessage.embeds[0].fields[1].value = board.playersTurn;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '4️⃣':
                    if (user.globalName !== player1Name && user.globalName !== player2Name) return;
                    board.dropPiece(3);
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    sentMessage.embeds[0].fields[1].value = board.playersTurn;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '5️⃣':
                    if (user.globalName !== player1Name && user.globalName !== player2Name) return;
                    board.dropPiece(4);
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    sentMessage.embeds[0].fields[1].value = board.playersTurn;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '6️⃣':
                    if (user.globalName !== player1Name && user.globalName !== player2Name) return;
                    board.dropPiece(5);
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    sentMessage.embeds[0].fields[1].value = board.playersTurn;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '7️⃣':
                    if (user.globalName !== player1Name && user.globalName !== player2Name) return;
                    board.dropPiece(6);
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    sentMessage.embeds[0].fields[1].value = board.playersTurn;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
            }
        });
        client.on('messageReactionRemove', async (reaction, user) => {
            if (user.tag === "ZipZop#7061") return;
            switch (reaction.emoji.name) {
                case '1️⃣':
                    if (user.globalName !== player1Name && user.globalName !== player2Name) return;
                    board.dropPiece(0);
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    sentMessage.embeds[0].fields[1].value = board.playersTurn;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '2️⃣':
                    if (user.globalName !== player1Name && user.globalName !== player2Name) return;
                    board.dropPiece(1);
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    sentMessage.embeds[0].fields[1].value = board.playersTurn;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '3️⃣':
                    if (user.globalName !== player1Name && user.globalName !== player2Name) return;
                    board.dropPiece(2);
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    sentMessage.embeds[0].fields[1].value = board.playersTurn;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '4️⃣':
                    if (user.globalName !== player1Name && user.globalName !== player2Name) return;
                    board.dropPiece(3);
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    sentMessage.embeds[0].fields[1].value = board.playersTurn;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '5️⃣':
                    if (user.globalName !== player1Name && user.globalName !== player2Name) return;
                    board.dropPiece(4);
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    sentMessage.embeds[0].fields[1].value = board.playersTurn;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '6️⃣':
                    if (user.globalName !== player1Name && user.globalName !== player2Name) return;
                    board.dropPiece(5);
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    sentMessage.embeds[0].fields[1].value = board.playersTurn;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '7️⃣':
                    if (user.globalName !== player1Name && user.globalName !== player2Name) return;
                    board.dropPiece(6);
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    sentMessage.embeds[0].fields[1].value = board.playersTurn;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
            }
        });
    }
});



