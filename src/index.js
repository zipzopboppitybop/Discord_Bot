import dotenv from 'dotenv';
dotenv.config({ path: '../.env' })

import { Client, IntentsBitField, GatewayIntentBits, EmbedBuilder, Events, Collection } from 'discord.js';
import {Manager} from "erela.js";
import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v9';
import {Player} from 'discord-player';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates,
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.GuildMessageReactions
    ],
});

client.login(process.env.DISCORD_TOKEN);

const commands = [];
client.commands = new Collection();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(filePath);
    console.log(command.default.execute)
    client.commands.set(command.default.data.name, command);
    commands.push(command.default.data.toJSON());
}

client.player = new Player(client, {
    ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    }
});

client.on('ready', (c) => {
    client.manager.init(c.user.id);
    const guildIds = client.guilds.cache.map(guild => guild.id);

    const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);
    for (const guildId of guildIds) {
        rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
            { body: commands },
        ).then(() => console.log(`Successfully registered commands for guild ${guildId}`)).catch(console.error);
    }
    console.log(`Logged in as ${c.user.tag}!`);
});

const nodes = [
    {
      host: "lava-v3.ajieblogs.eu.org",
      password: "https://dsc.gg/ajidevserver",
      port: 443,
      secure: true
    }
  ];
  
  // Assign Manager to the client variable
  client.manager = new Manager({
    // The nodes to connect to, optional if using default lavalink options
    nodes,
    // Method to send voice data to Discord
    send: (id, payload) => {
      const guild = client.guilds.cache.get(id);
      // NOTE: FOR ERIS YOU NEED JSON.stringify() THE PAYLOAD
      if (guild) guild.shard.send(payload);
    }
  });

  // Emitted whenever a node connects
client.manager.on("nodeConnect", node => {
    console.log(`Node "${node.options.identifier}" connected.`)
})

// Emitted whenever a node encountered an error
client.manager.on("nodeError", (node, error) => {
    console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`)
})

// THIS IS REQUIRED. Send raw events to Erela.js
client.on("raw", d => client.manager.updateVoiceState(d));

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;


    try {
        await command.default.execute({client, interaction});
    }
    catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});