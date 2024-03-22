import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";
import {EmbedBuilder} from "discord.js"
import { Player} from "discord-player";

export default {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song!')
        .addSubcommand((subcommand) =>
            subcommand
            .setName('search')
            .setDescription('Search for a song from Youtube!')
            .addStringOption((option) =>
                option
                    .setName('query')
                    .setDescription('Search Query')
                    .setRequired(true),
                    ))
        .addSubcommand((subcommand) =>
            subcommand
            .setName('playlist')
            .setDescription('Play a playlist from Youtube!')
            .addStringOption((option) =>
                option
                .setName('url')
                .setDescription('playlist url')
                .setRequired(true),
                    ))
        .addSubcommand((subcommand) =>
            subcommand
            .setName('song')
            .setDescription('Play a song from youtube!')
            .addStringOption((option) =>
                option
                .setName('url')
                .setDescription('song url')
                .setRequired(true),
                    ))
    ,
    execute: async ({client, interaction}) => {
        if (!interaction.member.voice.channel) {
            return await interaction.reply({ content: 'You need to be in a voice channel to play music!', ephemeral: true });
        }

        let player = client.manager.players.get(interaction.guild.id);

        if (!player) {
            player = client.manager.create({
                guild: interaction.guild.id,
                voiceChannel: interaction.member.voice.channel.id,
                textChannel: interaction.channel.id,
                volume: 100,
                selfDeafen: true,
            });
        }

        let embed = new EmbedBuilder();
        if (interaction.options._subcommand === "song")
        {
            let url = interaction.options._hoistedOptions[0].value;
            const result = await client.manager.search(url);

            if (!result.tracks.length) {
                return await interaction.reply({ content: 'No results found!', ephemeral: true });
            }

            player.connect();

            const song = result.tracks[0];
            player.queue.add(song);
            embed
            .setDescription(`Added [${song.title}](${song.url}) to the queue!`)
            .setFooter({text: `Duration: ${song.duration}`})
            .toJSON()
            
            if (!player.playing) player.play();
        } else if (interaction.options.subcommand === "playlist") {
            let url = interaction.options.getString("url");

            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST,
            });

            if (!result.tracks.length) {
                return await interaction.reply({ content: 'No playlist found!', ephemeral: true });
            }

            const playlist = result.playlist;   
            await queue.addTracks(playlist);

            embed
            .setDescription(`Added [${playlist.title}](${playlist.url}) to the queue!`)
            .setThumbnail(playlist.thumbnail)
            .setFooter({text: `Duration: ${playlist.duration}`})
        } else if (interaction.options.subcommand === "search") {
            let query = interaction.options.getString("query");

            const result = await client.player.search(query, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO,
            });

            if (!result.tracks.length) {
                return await interaction.reply({ content: 'No results found!', ephemeral: true });
            }

            const song = result.track[0];   
            await queue.addTrack(song);

            embed
            .setDescription(`Added [${song.title}](${song.url}) to the queue!`)
            .setThumbnail(song.thumbnail)
            .setFooter({text: `Duration: ${song.duration}`})
        }
        await interaction.channel.send("Thank you for using the play command!");
    }
};
