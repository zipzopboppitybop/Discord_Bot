import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";
import {EmbedBuilder} from "discord.js"
import { Player} from "discord-player";

export default {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop music and delete queue!'),
    execute: async ({client, interaction}) => {
        const player = client.manager.players.get(interaction.guild.id);
        if (!player) {
            return interaction.reply({ content: 'I am not playing music in this server!', ephemeral: true });
        }
        if (!player.queue.current) {
            return interaction.reply({ content: 'There is no music playing', ephemeral: true });
        }

        player.destroy();
        interaction.reply({ content: `Deleted Queue and stopped Player!`, ephemeral: true });
    }
}