
const { ApplicationCommandOptionType } = require('discord.js');
const db = require("../mongoDB");

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { ButtonStyle } = require('discord.js');

module.exports = {
  name: "help",
  description: "Obtenha informações sobre bot e comandos.",
  permissions: "0x0000000000000800",
  options: [],

  run: async (client, interaction) => {
    try {
      const musicCommandsEmbed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setTitle('🎸 **Comandos de musicas**')
        .addFields(
          { name: '🎹 Play', value: 'Transmita uma música de um determinado link ou pesquisa' },
          { name: '⏹️ Stop', value: 'Faz o bot parar de tocar música e sair da chamada' },
          { name: '📊 Queue', value: 'Visualize e gerencie a fila de músicas deste servidor' },
          { name: '⏭️ Skip', value: 'Pule a música que está sendo reproduzida no momento' },
          { name: '⏸️ Pause', value: 'Pausar a música atualmente tocando' },
          { name: '▶️ Resume', value: 'Retomar a música atualmente pausada' },
          { name: '🔁 Loop', value: 'Alternar modo de loop para fila e música atual' },
          { name: '🔄 Autoplay', value: 'Ative ou desative a reprodução automática [reproduzir músicas aleatórias]' },
          { name: '⏩ Seek', value: 'Procure um tempo específico da música atual' },
          { name: '⏮️ Previous', value: 'Reproduzir a música anterior da fila' },
          { name: '🔀 Shuffle', value: 'Embaralhe as músicas na fila' },
          { name: '📃 playlist', value: 'Gerenciar as listas de reprodução' }
        )
        .setImage(`https://cdn.discordapp.com/attachments/1004341381784944703/1165201249331855380/RainbowLine.gif?ex=654f37ba&is=653cc2ba&hm=648a2e070fab36155f4171962e9c3bcef94857aca3987a181634837231500177&`); 

      const basicCommandsEmbed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setTitle('✨ **Comandos basicos**')
        .addFields(
          { name: '🏓 Ping', value: "Verifique a latência do bot" },
          { name: '🗑️ Clear', value: 'Limpe a fila de músicas deste servidor' },
          { name: '⏱️ Time', value: 'Exibir o tempo de reprodução da música atual' },
          { name: '🎧 Filter', value: 'Aplique filtros para aprimorar o som como você gosta' },
           { name: '🎵 Now Playing', value: 'Exibir as informações da música atualmente sendo reproduzida' },
          { name: '🔊 Volume', value: 'Ajuste o volume da música [ouvir em volumes altos é arriscado] '},
        ) 
       .setImage('https://cdn.discordapp.com/attachments/1150827819547504741/1168917372267151370/standard.gif')
      

      const button1 = new ButtonBuilder()
        .setLabel('Instagram')
        .setURL('https://Instagram.com/taka.exe')
        .setStyle(ButtonStyle.Link);

      const row = new ActionRowBuilder()
        .addComponents(button1, );

      interaction.reply({
        embeds: [musicCommandsEmbed, basicCommandsEmbed],
        components: [row]
      }).catch(e => {});
    } catch (e) {
      console.error(e);
    }
  },
};

