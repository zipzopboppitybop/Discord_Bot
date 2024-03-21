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
    client.application.commands.set([
        {
            name: 'playc4',
            description: 'Play Connect Four',
        },
    ]);
    console.log(`Logged in as ${c.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    // Connect Four Command and logic
    if (interaction.commandName === 'playc4') {
        interaction.reply('Starting Connect 4 Game...');
        const board = new ConnectFour();
        board.createBoard();
        const embed = new EmbedBuilder()
            .setTitle('Connect 4')
            .addFields({name: 'Board', value: board.printBoard()})
            .addFields({name: 'Turn', value: interaction.user.globalName})
            .addFields({name: 'Description', value: 'React with 👍 to become player 2.'})
            .toJSON();

        let sentMessage = await interaction.channel.send({embeds: [embed]})
        sentMessage.react('1️⃣');
        sentMessage.react('2️⃣');
        sentMessage.react('3️⃣');
        sentMessage.react('4️⃣');
        sentMessage.react('5️⃣');
        sentMessage.react('6️⃣');
        sentMessage.react('7️⃣');
        sentMessage.react('👍');

        let player1Name = interaction.user.globalName;
        let player2Name = '';



        const filter = (reaction, user) => {
            return reaction.emoji.name === '👍' && user.id === interaction.user.id;
        };
        const collector = sentMessage.createReactionCollector(filter, { time: 15000 });
        collector.on('collect', async (reaction, user) => {
            if (user.tag === "ZipZop#7061") return;

            switch (reaction.emoji.name) {
                case '👍':
                    if (user.globalName === player1Name) return;
                    if (player2Name !== '') return;
                    player2Name = user.globalName;
                    sentMessage.embeds[0].fields[2].value = `Click a number to drop a piece. Player 2 is ${player2Name}.`;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '1️⃣':
                    if (!board.checkPlayerTurn(user, player1Name, player2Name)) return;
                    if (board.gameOver) return;
                    else board.dropPiece(0);
                    if (board.gameOver) {
                        sentMessage.embeds[0].fields[0].value = board.printedBoard;
                        if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                        else sentMessage.embeds[0].fields[1].value = player2Name;
                        sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                        await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                        return;
                    }
                    
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                    else sentMessage.embeds[0].fields[1].value = player2Name;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '2️⃣':
                    if (!board.checkPlayerTurn(user, player1Name, player2Name)) return;
                    if (board.gameOver) return;
                    else board.dropPiece(1);
                    if (board.gameOver) {
                        sentMessage.embeds[0].fields[0].value = board.printedBoard;
                        if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                        else sentMessage.embeds[0].fields[1].value = player2Name;
                        sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                        await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                        return;
                    }
                    
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                    else sentMessage.embeds[0].fields[1].value = player2Name;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '3️⃣':
                    if (!board.checkPlayerTurn(user, player1Name, player2Name)) return;
                    if (board.gameOver) return;
                    else board.dropPiece(2);
                    if (board.gameOver) {
                        sentMessage.embeds[0].fields[0].value = board.printedBoard;
                        if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                        else sentMessage.embeds[0].fields[1].value = player2Name;
                        sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                        await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                        return;
                    }
                    
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                    else sentMessage.embeds[0].fields[1].value = player2Name;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '4️⃣':
                    if (!board.checkPlayerTurn(user, player1Name, player2Name)) return;
                    if (board.gameOver) return;
                    else board.dropPiece(3);
                    if (board.gameOver) {
                        sentMessage.embeds[0].fields[0].value = board.printedBoard;
                        if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                        else sentMessage.embeds[0].fields[1].value = player2Name;
                        sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                        await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                        return;
                    }
                    
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                    else sentMessage.embeds[0].fields[1].value = player2Name;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '5️⃣':
                    if (!board.checkPlayerTurn(user, player1Name, player2Name)) return;
                    if (board.gameOver) return;
                    else board.dropPiece(4);
                    if (board.gameOver) {
                        sentMessage.embeds[0].fields[0].value = board.printedBoard;
                        if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                        else sentMessage.embeds[0].fields[1].value = player2Name;
                        sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                        await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                        return;
                    }
                    
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                    else sentMessage.embeds[0].fields[1].value = player2Name;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '6️⃣':
                    if (!board.checkPlayerTurn(user, player1Name, player2Name)) return;
                    if (board.gameOver) return;
                    else board.dropPiece(5);
                    if (board.gameOver) {
                        sentMessage.embeds[0].fields[0].value = board.printedBoard;
                        if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                        else sentMessage.embeds[0].fields[1].value = player2Name;
                        sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                        await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                        return;
                    }
                    
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                    else sentMessage.embeds[0].fields[1].value = player2Name;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '7️⃣':
                    if (!board.checkPlayerTurn(user, player1Name, player2Name)) return;
                    if (board.gameOver) return;
                    else board.dropPiece(6);
                    if (board.gameOver) {
                        sentMessage.embeds[0].fields[0].value = board.printedBoard;
                        if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                        else sentMessage.embeds[0].fields[1].value = player2Name;
                        sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                        await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                        return;
                    }
                    
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                    else sentMessage.embeds[0].fields[1].value = player2Name;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
            }
        });
        client.on('messageReactionRemove', async (reaction, user) => {
            if (user.tag === "ZipZop#7061") return;
            switch (reaction.emoji.name) {
                case '1️⃣':
                    if (!board.checkPlayerTurn(user, player1Name, player2Name)) return;
                    if (board.gameOver) return;
                    else board.dropPiece(0);
                    if (board.gameOver) {
                        sentMessage.embeds[0].fields[0].value = board.printedBoard;
                        if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                        else sentMessage.embeds[0].fields[1].value = player2Name;
                        sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                        await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                        return;
                    }
                    
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                        else sentMessage.embeds[0].fields[1].value = player2Name;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '2️⃣':
                    if (!board.checkPlayerTurn(user, player1Name, player2Name)) return;
                    if (board.gameOver) return;
                    else board.dropPiece(1);
                    if (board.gameOver) {
                        sentMessage.embeds[0].fields[0].value = board.printedBoard;
                        if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                        else sentMessage.embeds[0].fields[1].value = player2Name;
                        sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                        await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                        return;
                    }
                    
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                    else sentMessage.embeds[0].fields[1].value = player2Name;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '3️⃣':
                    if (!board.checkPlayerTurn(user, player1Name, player2Name)) return;
                    if (board.gameOver) return;
                    else board.dropPiece(2);
                    if (board.gameOver) {
                        sentMessage.embeds[0].fields[0].value = board.printedBoard;
                        if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                        else sentMessage.embeds[0].fields[1].value = player2Name;
                        sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                        await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                        return;
                    }
                    
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                    else sentMessage.embeds[0].fields[1].value = player2Name;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '4️⃣':
                    if (!board.checkPlayerTurn(user, player1Name, player2Name)) return;
                    if (board.gameOver) return;
                    else board.dropPiece(3);
                    if (board.gameOver) {
                        sentMessage.embeds[0].fields[0].value = board.printedBoard;
                        if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                        else sentMessage.embeds[0].fields[1].value = player2Name;
                        sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                        await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                        return;
                    }
                    
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                        else sentMessage.embeds[0].fields[1].value = player2Name;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '5️⃣':
                    if (!board.checkPlayerTurn(user, player1Name, player2Name)) return;
                    if (board.gameOver) return;
                    else board.dropPiece(4);
                    if (board.gameOver) {
                        sentMessage.embeds[0].fields[0].value = board.printedBoard;
                        if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                        else sentMessage.embeds[0].fields[1].value = player2Name;
                        sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                        await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                        return;
                    }
                    
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                    else sentMessage.embeds[0].fields[1].value = player2Name;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '6️⃣':
                    if (!board.checkPlayerTurn(user, player1Name, player2Name)) return;
                    if (board.gameOver) return;
                    else board.dropPiece(5);
                    if (board.gameOver) {
                        sentMessage.embeds[0].fields[0].value = board.printedBoard;
                        if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                        else sentMessage.embeds[0].fields[1].value = player2Name;
                        sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                        await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                        return;
                    }
                    
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                        else sentMessage.embeds[0].fields[1].value = player2Name;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
                case '7️⃣':
                    if (!board.checkPlayerTurn(user, player1Name, player2Name)) return;
                    if (board.gameOver) return;
                    else board.dropPiece(6);
                    if (board.gameOver) {
                        sentMessage.embeds[0].fields[0].value = board.printedBoard;
                        if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                        else sentMessage.embeds[0].fields[1].value = player2Name;
                        sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                        await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                        return;
                    }
                    
                    sentMessage.embeds[0].fields[0].value = board.printedBoard;
                    if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = player1Name;
                    else sentMessage.embeds[0].fields[1].value = player2Name;
                    await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                    break;
            }
        });
    }
});