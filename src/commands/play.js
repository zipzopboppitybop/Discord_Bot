import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";
import {EmbedBuilder} from "discord.js"
import { Player} from "discord-player";
import ConnectFour from "../games/connectFour.js";

export default {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a game or song!')
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
            .setName('song')
            .setDescription('Play a song from youtube!')
            .addStringOption((option) =>
                option
                .setName('url')
                .setDescription('song url')
                .setRequired(true),
                    ))
        .addSubcommand((subcommand) =>
            subcommand
            .setName('playlist')
            .setDescription('Play a playlist from youtube!')
            .addStringOption((option) =>
                option
                .setName('url')
                .setDescription('playlist url')
                .setRequired(true),
                    ))
        .addSubcommand((subcommand) =>
            subcommand
            .setName('game')
            .setDescription('Play one of our games!')
            .addStringOption((option) =>
                option
                .setName('name')
                .setDescription('Which game do you want to play? Example: tictactoe, connect4.')
                .setRequired(true),
                    ))
    ,
    execute: async ({client, interaction}) => {
        let embed = new EmbedBuilder();
        if (interaction.options._subcommand === "song")
        {
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
    
            let url = interaction.options._hoistedOptions[0].value;
            const result = await client.manager.search(url);

            if (!result.tracks.length) {
                return await interaction.reply({ content: 'No results found!', ephemeral: true });
            }

            player.connect();

            const song = result.tracks[0];
            const mins = Math.floor(song.duration / 60000);
            const secs = ((song.duration % 60000) / 1000).toFixed(0);
            player.queue.add(song);
            embed
            .setDescription(`Added [${song.title}](${song.uri}) to the queue!`)
            .setThumbnail(song.thumbnail)
            .setFooter({text: `Duration: ${mins}:${secs}`})
            .toJSON()

            if (!player.playing) player.play();

            interaction.reply({embeds: [embed]});
        } else if (interaction.options._subcommand === "search") {
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
    
            let query = interaction.options._hoistedOptions[0].value;

            const result = await client.manager.search(query);

            if (!result.tracks.length) {
                return await interaction.reply({ content: 'No results found!', ephemeral: true });
            }

            player.connect();

            const song = result.tracks[0];
            const mins = Math.floor(song.duration / 60000);
            const secs = ((song.duration % 60000) / 1000).toFixed(0);
            player.queue.add(song);
            embed
            .setDescription(`Added [${song.title}](${song.uri}) to the queue!`)
            .setThumbnail(song.thumbnail)
            .setFooter({text: `Duration: ${mins}:${secs}`})
            .toJSON()

            
            if (!player.playing) player.play();
            interaction.reply({embeds: [embed]});
        } else if (interaction.options._subcommand === "playlist") {
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
    
            let query = interaction.options._hoistedOptions[0].value;

            const result = await client.manager.search(query);

            if (!result.tracks.length) {
                return await interaction.reply({ content: 'No results found!', ephemeral: true });
            }

            player.connect();

            const playlist = result.playlist;
            for (const track of result.tracks) {
                player.queue.add(track);
            }

            const mins = Math.floor(playlist.duration / 60000);
            const secs = ((playlist.duration % 60000) / 1000).toFixed(0);
            embed
            .setDescription(`Added [${playlist.name}] playlist to the queue!`)
            .setFooter({text: `Duration: ${mins}:${secs}`})
            .toJSON()

            
            if (!player.playing) player.play();
            interaction.reply({embeds: [embed]});
        } else if (interaction.options._subcommand === "game") {
            if (interaction.options._hoistedOptions[0].value === "tictactoe") {
                interaction.reply('Starting Tic Tac Toe Game...');

            }
            if (interaction.options._hoistedOptions[0].value === "connect4") {
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
        
                board.player1Name = interaction.user.globalName;
        
                const filter = (reaction, user) => {
                    return reaction.emoji.name === '👍' && user.id === interaction.user.id;
                };
                const collector = sentMessage.createReactionCollector(filter, { time: 15000 });
                collector.on('collect', async (reaction, user) => {
                    if (user.tag === "ZipZop#7061") return;
        
                    switch (reaction.emoji.name) {
                        case '👍':
                            if (user.globalName === board.player1Name) return;
                            if (board.player2Name !== '') return;
                            board.player2Name = user.globalName;
                            sentMessage.embeds[0].fields[2].value = `Click a number to drop a piece. Player 2 is ${board.player2Name}.`;
                            if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                            else sentMessage.embeds[0].fields[1].value = board.player2Name;
                            await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                            break;
                        case '1️⃣':
                            if (!board.checkPlayerTurn(user)) return;
                            if (board.gameOver) return;
                            else board.dropPiece(0);
                            if (board.gameOver) {
                                sentMessage.embeds[0].fields[0].value = board.printedBoard;
                                if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                                else sentMessage.embeds[0].fields[1].value = board.player2Name;
                                sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                                await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                                return;
                            }
                            
                            sentMessage.embeds[0].fields[0].value = board.printedBoard;
                            if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                            else sentMessage.embeds[0].fields[1].value = board.player2Name;
                            await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                            break;
                        case '2️⃣':
                            if (!board.checkPlayerTurn(user)) return;
                            if (board.gameOver) return;
                            else board.dropPiece(1);
                            if (board.gameOver) {
                                sentMessage.embeds[0].fields[0].value = board.printedBoard;
                                if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                                else sentMessage.embeds[0].fields[1].value = board.player2Name;
                                sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                                await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                                return;
                            }
                            
                            sentMessage.embeds[0].fields[0].value = board.printedBoard;
                            if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                            else sentMessage.embeds[0].fields[1].value = board.player2Name;
                            await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                            break;
                        case '3️⃣':
                            if (!board.checkPlayerTurn(user)) return;
                            if (board.gameOver) return;
                            else board.dropPiece(2);
                            if (board.gameOver) {
                                sentMessage.embeds[0].fields[0].value = board.printedBoard;
                                if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                                else sentMessage.embeds[0].fields[1].value = board.player2Name;
                                sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                                await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                                return;
                            }
                            
                            sentMessage.embeds[0].fields[0].value = board.printedBoard;
                            if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                            else sentMessage.embeds[0].fields[1].value = board.player2Name;
                            await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                            break;
                        case '4️⃣':
                            if (!board.checkPlayerTurn(user)) return;
                            if (board.gameOver) return;
                            else board.dropPiece(3);
                            if (board.gameOver) {
                                sentMessage.embeds[0].fields[0].value = board.printedBoard;
                                if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                                else sentMessage.embeds[0].fields[1].value = board.player2Name;
                                sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                                await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                                return;
                            }
                            
                            sentMessage.embeds[0].fields[0].value = board.printedBoard;
                            if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                            else sentMessage.embeds[0].fields[1].value = board.player2Name;
                            await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                            break;
                        case '5️⃣':
                            if (!board.checkPlayerTurn(user)) return;
                            if (board.gameOver) return;
                            else board.dropPiece(4);
                            if (board.gameOver) {
                                sentMessage.embeds[0].fields[0].value = board.printedBoard;
                                if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                                else sentMessage.embeds[0].fields[1].value = board.player2Name;
                                sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                                await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                                return;
                            }
                            
                            sentMessage.embeds[0].fields[0].value = board.printedBoard;
                            if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                            else sentMessage.embeds[0].fields[1].value = board.player2Name;
                            await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                            break;
                        case '6️⃣':
                            if (!board.checkPlayerTurn(user)) return;
                            if (board.gameOver) return;
                            else board.dropPiece(5);
                            if (board.gameOver) {
                                sentMessage.embeds[0].fields[0].value = board.printedBoard;
                                if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                                else sentMessage.embeds[0].fields[1].value = board.player2Name;
                                sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                                await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                                return;
                            }
                            
                            sentMessage.embeds[0].fields[0].value = board.printedBoard;
                            if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                            else sentMessage.embeds[0].fields[1].value = board.player2Name;
                            await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                            break;
                        case '7️⃣':
                            if (!board.checkPlayerTurn(user)) return;
                            if (board.gameOver) return;
                            else board.dropPiece(6);
                            if (board.gameOver) {
                                sentMessage.embeds[0].fields[0].value = board.printedBoard;
                                if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                                else sentMessage.embeds[0].fields[1].value = board.player2Name;
                                sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                                await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                                return;
                            }
                            
                            sentMessage.embeds[0].fields[0].value = board.printedBoard;
                            if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                            else sentMessage.embeds[0].fields[1].value = board.player2Name;
                            await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                            break;
                    }
                });
                client.on('messageReactionRemove', async (reaction, user) => {
                    if (user.tag === "ZipZop#7061") return;
                    switch (reaction.emoji.name) {
                        case '1️⃣':
                            if (!board.checkPlayerTurn(user)) return;
                            if (board.gameOver) return;
                            else board.dropPiece(0);
                            if (board.gameOver) {
                                sentMessage.embeds[0].fields[0].value = board.printedBoard;
                                if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                                else sentMessage.embeds[0].fields[1].value = board.player2Name;
                                sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                                await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                                return;
                            }
                            
                            sentMessage.embeds[0].fields[0].value = board.printedBoard;
                            if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                                else sentMessage.embeds[0].fields[1].value = board.player2Name;
                            await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                            break;
                        case '2️⃣':
                            if (!board.checkPlayerTurn(user)) return;
                            if (board.gameOver) return;
                            else board.dropPiece(1);
                            if (board.gameOver) {
                                sentMessage.embeds[0].fields[0].value = board.printedBoard;
                                if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                                else sentMessage.embeds[0].fields[1].value = board.player2Name;
                                sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                                await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                                return;
                            }
                            
                            sentMessage.embeds[0].fields[0].value = board.printedBoard;
                            if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                            else sentMessage.embeds[0].fields[1].value = board.player2Name;
                            await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                            break;
                        case '3️⃣':
                            if (!board.checkPlayerTurn(user)) return;
                            if (board.gameOver) return;
                            else board.dropPiece(2);
                            if (board.gameOver) {
                                sentMessage.embeds[0].fields[0].value = board.printedBoard;
                                if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                                else sentMessage.embeds[0].fields[1].value = board.player2Name;
                                sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                                await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                                return;
                            }
                            
                            sentMessage.embeds[0].fields[0].value = board.printedBoard;
                            if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                            else sentMessage.embeds[0].fields[1].value = board.player2Name;
                            await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                            break;
                        case '4️⃣':
                            if (!board.checkPlayerTurn(user)) return;
                            if (board.gameOver) return;
                            else board.dropPiece(3);
                            if (board.gameOver) {
                                sentMessage.embeds[0].fields[0].value = board.printedBoard;
                                if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                                else sentMessage.embeds[0].fields[1].value = board.player2Name;
                                sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                                await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                                return;
                            }
                            
                            sentMessage.embeds[0].fields[0].value = board.printedBoard;
                            if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                                else sentMessage.embeds[0].fields[1].value = board.player2Name;
                            await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                            break;
                        case '5️⃣':
                            if (!board.checkPlayerTurn(user)) return;
                            if (board.gameOver) return;
                            else board.dropPiece(4);
                            if (board.gameOver) {
                                sentMessage.embeds[0].fields[0].value = board.printedBoard;
                                if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                                else sentMessage.embeds[0].fields[1].value = board.player2Name;
                                sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                                await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                                return;
                            }
                            
                            sentMessage.embeds[0].fields[0].value = board.printedBoard;
                            if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                            else sentMessage.embeds[0].fields[1].value = board.player2Name;
                            await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                            break;
                        case '6️⃣':
                            if (!board.checkPlayerTurn(user)) return;
                            if (board.gameOver) return;
                            else board.dropPiece(5);
                            if (board.gameOver) {
                                sentMessage.embeds[0].fields[0].value = board.printedBoard;
                                if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                                else sentMessage.embeds[0].fields[1].value = board.player2Name;
                                sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                                await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                                return;
                            }
                            
                            sentMessage.embeds[0].fields[0].value = board.printedBoard;
                            if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                                else sentMessage.embeds[0].fields[1].value = board.player2Name;
                            await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                            break;
                        case '7️⃣':
                            if (!board.checkPlayerTurn(user)) return;
                            if (board.gameOver) return;
                            else board.dropPiece(6);
                            if (board.gameOver) {
                                sentMessage.embeds[0].fields[0].value = board.printedBoard;
                                if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                                else sentMessage.embeds[0].fields[1].value = board.player2Name;
                                sentMessage.embeds[0].fields[2].value = `Game Over - ${user.globalName} Wins!`;
                                await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                                return;
                            }
                            
                            sentMessage.embeds[0].fields[0].value = board.printedBoard;
                            if (board.playersTurn === "Red's Turn") sentMessage.embeds[0].fields[1].value = board.player1Name;
                            else sentMessage.embeds[0].fields[1].value = board.player2Name;
                            await sentMessage.edit({embeds: [sentMessage.embeds[0]]});
                            break;
                    }
                });
            }

        }

    }
};
