import dotenv from 'dotenv';
dotenv.config({ path: '../.env' })

import { Client, IntentsBitField, GatewayIntentBits, EmbedBuilder } from 'discord.js';

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
            .setDescription('Type !join to join the game')
            .addFields({name: 'Board', value: board});

        message.channel.send({embeds: [embed]});
    }
});