const { ApplicationCommandOptionType } = require('discord.js');
const db = require("../mongoDB");

module.exports = {
  name: "owner",
  description: "Obtenha informações sobre o proprietário do bot.",
  permissions: "0x0000000000000800",
  options: [],

  run: async (client, interaction) => {
    try {
      const youtubeLink = 'https://discord.gg/FUEHs7RCqz';
      const InstagramLink = 'https://www.instagram.com/Taka.exe';
      const { EmbedBuilder } = require('discord.js')
        const embed = new EmbedBuilder()
            .setColor('#da2a41')
            .setAuthor({
          name: 'Owner',
          iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157310253520662638/2443-iconperson.png?ex=651824aa&is=6516d32a&hm=0becc4a0fda01e5a02a63cf098db30c287e60a474f8d2da4ddeae7f47d98a5a3&',
          url: 'https://discord.gg/'
        })
            .setDescription(`__**About me**__:\n\n ▶️ Eu mesmo Zero. Eu sou um desenvolvedor de bot discord. Adoro jogar, assistir animes e construir diferentes aplicações de servidor web. Você obterá respostas mais rápidas no Instagram do que em outras mídias sociais. Sinta-se à vontade para entrar em contato comigo!\n Instagram: ❤️ (${youtubeLink})\n Instagram : 💙 [taka.exe](${InstagramLink})`)
            .setTimestamp();
      interaction.reply({ embeds: [embed] }).catch(e => {});

    } catch (e) {
    console.error(e); 
  }
  },
};
