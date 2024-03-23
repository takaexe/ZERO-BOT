module.exports = async (client, textChannel, e) => {
if (textChannel){
   return textChannel?.send(`**Um erro encontrado:** ${e.toString().slice(0, 1974)}`)
}
}
