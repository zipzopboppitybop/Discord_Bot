import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";
import {EmbedBuilder} from "discord.js"
import { Player} from "discord-player";

export default {
    data: new SlashCommandBuilder()
        .setName('games')
        .setDescription('See list of games'),
    execute: async ({client, interaction}) => {
        const embed = new EmbedBuilder()
          .setTitle('List of Games')
    

    
        embed.setDescription('connect4, hangman, tictactoe')
    
        return interaction.reply({ embeds: [embed] });
    }
}