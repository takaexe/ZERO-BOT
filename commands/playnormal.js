const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const db = require("../mongoDB");
module.exports = {
  name: "playsong",
  description: "Reproduzir uma musica.",
  permissions: "0x0000000000000800",
  options: [
    {
      name: "normal",
      description: "Abra músicas de outras plataformas.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "name",
          description: "Escreva o nome da sua música.",
          type: ApplicationCommandOptionType.String,
          required: true
        }
      ]
    },
    {
      name: "playlist",
      description: "Escreva o nome da sua plylist.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "name",
          description: "Escreva o nome da playlist que deseja criar.",
          type: ApplicationCommandOptionType.String,
          required: true
        }
      ]
    },
  ],
  voiceChannel: true,
  run: async (client, interaction) => {


   

    try {
      let stp = interaction.options.getSubcommand()

      if (stp === "playlist") {
        let playlistw = interaction.options.getString('name')
        let playlist = await db?.playlist?.find().catch(e => { })
        if (!playlist?.length > 0) return interaction.reply({ content: `Não há lista de reprodução. ❌`, ephemeral: true }).catch(e => { })

        let arr = 0
        for (let i = 0; i < playlist.length; i++) {
          if (playlist[i]?.playlist?.filter(p => p.name === playlistw)?.length > 0) {

            let playlist_owner_filter = playlist[i].playlist.filter(p => p.name === playlistw)[0].author
            let playlist_public_filter = playlist[i].playlist.filter(p => p.name === playlistw)[0].public

            if (playlist_owner_filter !== interaction.member.id) {
              if (playlist_public_filter === false) {
                return interaction.reply({ content: `Você não tem permissão para reproduzir esta playlist. ❌`, ephemeral: true }).catch(e => { })
              }
            }

            const music_filter = playlist[i]?.musics?.filter(m => m.playlist_name === playlistw)
            if (!music_filter?.length > 0) return interaction.reply({ content: `No music with Name`, ephemeral: true }).catch(e => { })
                const listembed = new EmbedBuilder()
                .setTitle('Carregando seu álbum')
                .setColor('#FF0000')
                .setDescription('**🎸 Prepare-se para uma jornada musical!**');
            interaction.reply({ content : '', embeds: [listembed] }).catch(e => { })

            let songs = []
            music_filter.map(m => songs.push(m.music_url))

            setTimeout(async () => {
              const playl = await client?.player?.createCustomPlaylist(songs, {
                member: interaction.member,
                properties: { name: playlistw, source: "custom" },
                parallel: true
              });
              const qembed = new EmbedBuilder()
        .setAuthor({
        name: 'Adicionadas músicas do álbum à fila',
        iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157218651179597884/1213-verified.gif', 
        url: 'https://discord.gg/'
    })
        .setColor('#14bdff')
        .setFooter({ text: 'Use /queue para mais informações' });
           
              await interaction.editReply({ content: '',embeds: [qembed] }).catch(e => {
                  console.error('Error  reply:', e);
                });

              try {
                await client.player.play(interaction.member.voice.channel, playl, {
                  member: interaction.member,
                  textChannel: interaction.channel,
                  interaction
                })
              } catch (e) {
                await interaction.editReply({ content: `❌ Nenhum resultado encontrado!!`, ephemeral: true }).catch(e => { })
              }

              playlist[i]?.playlist?.filter(p => p.name === playlistw).map(async p => {
                await db.playlist.updateOne({ userID: p.author }, {
                  $pull: {
                    playlist: {
                      name: playlistw
                    }
                  }
                }, { upsert: true }).catch(e => { })

                await db.playlist.updateOne({ userID: p.author }, {
                  $push: {
                    playlist: {
                      name: p.name,
                      author: p.author,
                      authorTag: p.authorTag,
                      public: p.public,
                      plays: Number(p.plays) + 1,
                      createdTime: p.createdTime
                    }
                  }
                }, { upsert: true }).catch(e => { })
              })
            }, 3000)
          } else {
            arr++
            if (arr === playlist.length) {
              return interaction.reply({ content: `Não há álbum. ❌`, ephemeral: true }).catch(e => { })
            }
          }
        }
      }

      if (stp === "normal") {
  const name = interaction.options.getString('name');
  if (!name) {
    return interaction.reply({ content: '▶️ Dê texto ou link', ephemeral: true }).catch(e => {});
  }

  const embed = new EmbedBuilder()
    .setColor('#FF0000')
    .setDescription('**🎸 Prepare-se para uma jornada musical!**');

  await interaction.reply({ embeds: [embed] }).catch(e => {});

  try {
    await client.player.play(interaction.member.voice.channel, name, {
      member: interaction.member,
      textChannel: interaction.channel,
      interaction
    });
  } catch (e) {
    const errorEmbed = new EmbedBuilder()
      .setColor('#FF0000')
      .setDescription('❌ Nenhum resultado encontrado!!');

    await interaction.editReply({ embeds: [errorEmbed], ephemeral: true }).catch(e => {});
  }
}

    }  catch (e) {
    console.error(e); 
  }
  },
};
