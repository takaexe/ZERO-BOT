const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const maxVol = require("../config.js").opt.maxVol;
const db = require("../mongoDB");

module.exports = {
  name: "volume",
  description: "Permite ajustar o volume da música.",
  permissions: "0x0000000000000800",
  options: [{
    name: 'volume',
    description: 'Digite o número para ajustar o volume.',
    type: ApplicationCommandOptionType.Integer,
    required: true
  }],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {
      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) {
        return interaction.reply({ content: '⚠️ Nenhuma música tocando!!', ephemeral: true });
      }

      const vol = parseInt(interaction.options.getInteger('volume'));

      if (!vol) {
        return interaction.reply({
          content: `Volume atual: **${queue.volume}** 🔊\nPara alterar o volume, digite um número entre \`1\` and \`${maxVol}\`.`,
          ephemeral: true
        });
      }

      if (queue.volume === vol) {
        return interaction.reply({ content: 'O volume atual já está definido para **' + vol + '**!', ephemeral: true });
      }

      if (vol < 1 || vol > maxVol) {
        return interaction.reply({
          content: `Por favor digite um número entre \`1\` e \`${maxVol}\`.`,
          ephemeral: true
        });
      }

      const success = queue.setVolume(vol);

      if (success) {
        const embed = new EmbedBuilder()
          .setColor('#d291fe')
          .setAuthor({
        name: 'Sua música! Suas regras!',
        iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157528025739563088/5657-volume-icon.png?ex=6518ef7b&is=65179dfb&hm=1797c2830537a28b5c6a57564517cc509146d02383a69fb4239d7b5d55aceeed&', 
        url: 'https://discord.gg/FUEHs7RCqz'
    })
          .setDescription(`**Ajustando o volume: ** **${vol}/${maxVol}**`);

        return interaction.reply({ embeds: [embed] });
      } else {
        return interaction.reply({ content: '❌ Algo deu errado ao alterar o volume.', ephemeral: true });
      }
    } catch (e) {
      console.error(e);
    }
  },
};
