import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";
import {EmbedBuilder} from "discord.js"
import { Player} from "discord-player";

export default {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the current song'),
    execute: async ({client, interaction}) => {
        const player = client.manager.players.get(interaction.guild.id);
        if (!player) {
            return interaction.reply({ content: 'I am not playing music in this server!', ephemeral: true });
        }
        if (!player.queue.current) {
            return interaction.reply({ content: 'There is no music playing', ephemeral: true });
        }
        if (player.queue.current.paused) {
            return interaction.reply({ content: 'The music is already paused', ephemeral: true });
        }
        player.pause(true);
        interaction.reply({ content: `Paused ${player.queue.current.title}`, ephemeral: true });
    }
}