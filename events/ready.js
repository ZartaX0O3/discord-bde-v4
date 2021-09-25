const {MessageEmbed} = require("discord.js");
const channels = require("../channels.json");
const emojis = require("../emojis.json");

module.exports = (client) => {
    const embed = new MessageEmbed()
        .setColor("#7bb25b")
        .setTitle(`${emojis.emojis.green_circle}**Démarrage du BOT**`)

    let annonce = client.channels.cache.get(channels.sanctionLogsChannel);
    annonce.send(embed);
    console.log("Bot opérationnel");
    

}