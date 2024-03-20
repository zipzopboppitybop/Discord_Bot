import dotenv from 'dotenv';
dotenv.config({ path: '../.env' })
import { REST, Routes} from 'discord.js';

const commands = [
    {
        name: 'playc4',
        description: 'Play Connect Four',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}
)();