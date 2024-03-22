import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";
import {EmbedBuilder} from "discord.js"
import { Player} from "discord-player";

export default {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Check the current queue'),
    execute: async ({client, interaction}) => {
        const player = client.manager.players.get(interaction.guild.id);
        if (!player) {
            return interaction.reply({ content: 'I am not playing music in this server!', ephemeral: true });
        }
        if (!player.queue.current) {
            return interaction.reply({ content: 'There is no music playing', ephemeral: true });
        }
        const queue = player.queue;
        const embed = new EmbedBuilder()
          .setAuthor({ name: `Queue for ${interaction.guild.name}` });
    
        // change for the amount of tracks per page
        const multiple = 10;
        const page = 1;
        
        const end = 1 * multiple;
        const start = end - multiple;
    
        const tracks = queue.slice(start, end);
    
        if (queue.current) embed.addFields([{ name: "Current", value: `[${queue.current.title}](${queue.current.uri})`}]);
    
        if (!tracks.length) embed.setDescription(`No tracks in ${page > 1 ? `page ${page}` : "the queue"}.`);
        else embed.setDescription(tracks.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri})`).join("\n"));
    
        const maxPages = Math.ceil(queue.length / multiple);
    
        embed.setFooter({ text: `Page ${page > maxPages ? maxPages : page} of ${maxPages}` });
    
        return interaction.reply({ embeds: [embed] });
    }
}