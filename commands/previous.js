const db = require("../mongoDB");
module.exports = {
  name: "previous",
  description: "Reproduz a musica anterior.",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {
      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ Nenhuma música tocando!!`, ephemeral: true }).catch(e => { })
      try {
        let song = await queue.previous()
        interaction.reply({ content: `**Aqui está a musica anterior!!**` }).catch(e => { })
      } catch (e) {
        return interaction.reply({ content: `❌ Nenhuma musica anterior!!`, ephemeral: true }).catch(e => { })
      }
    } catch (e) {
    console.error(e); 
  }
  },
};
