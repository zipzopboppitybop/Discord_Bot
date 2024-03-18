import dotenv from 'dotenv';
dotenv.config({ path: '../.env' })

import { Client, IntentsBitField, GatewayIntentBits, EmbedBuilder, Events } from 'discord.js';

let newBoard = [];

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
    newBoard[0][column] = ':red_circle:';
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
                    console.log(sentMessage.embeds[0].fields[0].value);
                    break;
                case '2️⃣':
                    message.channel.send('2');
                    break;
                case '3️⃣':
                    message.channel.send('3');
                    break;
                case '4️⃣':
                    message.channel.send('4');
                    break;
                case '5️⃣':
                    message.channel.send('5');
                    break;
                case '6️⃣':
                    message.channel.send('6');
                    break;
                case '7️⃣':
                    message.channel.send('7');
                    break;
            }
        });
    }
});



